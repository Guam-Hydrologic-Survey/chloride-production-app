/* 
LMap.js
*/

// components 
import { BaseLayers } from "./BaseLayers.js";
import { basins } from "./Basins.js";
import { getIcon, checkLastValue } from "./CustomIcon.js";
// import { CustomOverlay } from "./CustomOverlay.js";
import { Stats } from "./Stats.js";
import { Plot } from "./Plot.js";

export function LMap(element) {
    // Center of Guam
    const center = [13.5435056,144.7478083];

    // Creates Leaflet map 
    const map = L.map('map', {
        center: center,
        zoom: 12,
        zoomControl: false,
    });

    const baseLayers = BaseLayers(map);

    let groupedLayersOptions = {
        exclusiveGroups: ["Base Maps"],
        groupCheckboxes: true, 
        position: 'bottomright'
    };

    const layerControl = L.control.groupedLayers(baseLayers, null, groupedLayersOptions);
    layerControl.addTo(map);

    // CustomOverlay(map, layerControl);

    // Configuration for custom map image overlay 
    // 120KCP PNG 
    const overlay_120kcp_url = "./static/assets/overlays/120KCP.png";
    const overlay_120kcp_tl = [13.676549220976273, 144.679002534165647];
    const overlay_120kcp_br = [13.4088743, 145.0248265];
    const overlay_120kcp_bounds = L.latLngBounds([overlay_120kcp_tl, overlay_120kcp_br]); 

    const overlayOptions = {
        opacity: 1, 
        interactive: false,
    };

    let overlay_120kcp = L.imageOverlay(overlay_120kcp_url, overlay_120kcp_bounds, overlayOptions);

    overlay_120kcp.addTo(map);

    layerControl.addOverlay(overlay_120kcp, "120K");

    // 60KNCP PNG 
    const overlay_60kncp_url = "./static/assets/overlays/60KNCP.png";
    const overlay_60kncp_tl = [13.676121397466535, 144.790949685872050];
    const overlay_60kncp_br = [13.5293066, 144.9788355];
    const overlay_60kncp_bounds = L.latLngBounds([overlay_60kncp_tl, overlay_60kncp_br]);

    let overlay_60kncp = L.imageOverlay(overlay_60kncp_url, overlay_60kncp_bounds, overlayOptions);

    // layerControl.addOverlay(overlay_60kncp, "60KN");

    // 60KSCP PNG 
    const overlay_60kscp_url = "./static/assets/overlays/60KSCP.png";
    const overlay_60kscp_tl = [13.530946619838641, 144.724280522275109];
    const overlay_60kscp_br = [13.4089456, 144.9468201];
    const overlay_60kscp_bounds = L.latLngBounds([overlay_60kscp_tl, overlay_60kscp_br]);

    let overlay_60kscp = L.imageOverlay(overlay_60kscp_url, overlay_60kscp_bounds, overlayOptions);

    let overlays_60k_combined = L.layerGroup([overlay_60kncp, overlay_60kscp]);
    layerControl.addOverlay(overlays_60k_combined, "60K");

    // Configure map title 
    const mapTitle = L.control({position: 'topleft'});

    mapTitle.onAdd =  function(map) {
        this._div = L.DomUtil.create('div', 'mapTitle'); 
        this._div.innerHTML = '<img src="./static/assets/WERI_MappFx_Chloride_And_Production_Title_Card_White_Bold.png" height="150">';
        return this._div;
    };

    mapTitle.addTo(map);

    L.control.zoom({
        // options: topleft, topright, bottomleft, bottomright
        position: 'bottomright'
    }).addTo(map);

    // L.control.scale().addTo(map);

    // Control to reset map view (goes to initial map zoom on page load)
    var resetZoomBtn = L.easyButton('<i class="bi bi-map"></i>', function() {
        map.setView(center, 12);
    }, "Reset map view");

    const controlBar = L.easyBar([
        resetZoomBtn,
    ], { position: 'bottomright'})

    controlBar.addTo(map);

    // Run actions based on map zoom 
    map.on('zoomend', function(z) {
        let zoomLevel = map.getZoom();
        toggleTooltips(zoomLevel)
        toggleCustomMap(zoomLevel)
    });

    // Hides tooltip based on zoom level 
    function toggleTooltips(z) {
        if (z >= 15 ){
            [].forEach.call(document.querySelectorAll('.leaflet-tooltip'), function (t) {
                t.style.visibility = 'visible';
            });
        } else {
            [].forEach.call(document.querySelectorAll('.leaflet-tooltip'), function (t) {
                t.style.visibility = 'hidden';
            });
        }
    }

    // Hides custom map (image overlay) based on zoom level 
    function toggleCustomMap(z) {
        if (z >= 13) {
            map.removeLayer(overlay_120kcp)
            map.addLayer(overlays_60k_combined)
        }  else {      
            map.addLayer(overlay_120kcp)
            map.removeLayer(overlays_60k_combined)
        }
    }

    // Draw control bar
    var drawnFeatures = new L.FeatureGroup();
    map.addLayer(drawnFeatures);

    // Configurations for draw controls 
    var drawControl = new L.Control.Draw({
        position: "bottomright",
        draw: {
            polyline: {
                allowIntersection: true,
                shapeOptions: {
                    color: "orange"
                }
            },
            polygon: {
                allowIntersection: false,
                showArea: true,
                showLength: true,
                shapeOptions: {
                    color: "purple",
                    clickable: true
                }
            },
            circle: {
                shapeOptions: {
                    shapeOptions: {
                        color: "blue",
                        clickable: true
                    }
                }
            },
            circlemarker: false,
            rectangle: {
                showArea: true,
                showLength: true,
                shapeOptions: {
                    color: "green",
                    clickable: true
                }
            },
            marker: false
        },
        edit: {
            featureGroup: drawnFeatures,
            remove: true,
        }
    });

    map.addControl(drawControl);

    // Handles draw events 
    map.on(L.Draw.Event.CREATED, function(event) {
        var layer = event.layer;
        drawnFeatures.addLayer(layer);
    });

    if (map.hasLayer(drawnFeatures)) {
        layerControl.addOverlay(drawnFeatures, "Drawings");
    }

    // TODO - refine layers for chloride and production ranges
    // Layer groups for chloride ranges 
    let chlorideLayers = "Toggle All Salinity Levels"; 

    const chlorideRange30 = L.layerGroup();
    const chlorideRange70 = L.layerGroup();
    const chlorideRange150 = L.layerGroup();
    const chlorideRange250 = L.layerGroup();
    const chlorideRange300 = L.layerGroup();
    const chlorideRange400 = L.layerGroup();
    const chlorideRange450 = L.layerGroup();

    // add layers to the layer control 
    layerControl.addOverlay(chlorideRange30, "[0 - 30] [CL-] mg/L", chlorideLayers);
    layerControl.addOverlay(chlorideRange70, "(30 - 70] [CL-] mg/L", chlorideLayers);
    layerControl.addOverlay(chlorideRange150, "(70 - 150] [CL-] mg/L", chlorideLayers);
    layerControl.addOverlay(chlorideRange250, "(150 - 250] [CL-] mg/L", chlorideLayers);
    layerControl.addOverlay(chlorideRange300, "(250 - 300] [CL-] mg/L", chlorideLayers);
    layerControl.addOverlay(chlorideRange400, "(300 - 400] [CL-] mg/L", chlorideLayers);
    layerControl.addOverlay(chlorideRange400, "(400 - 450] [CL-] mg/L", chlorideLayers);

    // Layer groups for production ranges 
    let productionLayers = "Toggle All Production Rates";
    
    const productionRangeInactive = L.layerGroup();
    const productionRange0 = L.layerGroup();
    const productionRange100 = L.layerGroup();
    const productionRange200 = L.layerGroup();
    const productionRange300 = L.layerGroup();
    const productionRange400 = L.layerGroup();
    const productionRange500 = L.layerGroup();
    const productionRange600 = L.layerGroup();
    const productionRange700 = L.layerGroup();
    const productionRange700Plus = L.layerGroup();

    // add layers to the layer control 
    layerControl.addOverlay(productionRangeInactive, "Inactive", productionLayers);
    layerControl.addOverlay(productionRange0, "0", productionLayers);
    layerControl.addOverlay(productionRange100, "(0 - 100] gpm", productionLayers);
    layerControl.addOverlay(productionRange200, "(100 - 200] gpm", productionLayers);
    layerControl.addOverlay(productionRange300, "(200 - 300] gpm", productionLayers);
    layerControl.addOverlay(productionRange400, "(300 - 400] gpm", productionLayers);
    layerControl.addOverlay(productionRange500, "(400 - 500] gpm", productionLayers);
    layerControl.addOverlay(productionRange600, "(500 - 600] gpm", productionLayers);
    layerControl.addOverlay(productionRange700, "(600 - 700] gpm", productionLayers);
    layerControl.addOverlay(productionRange700Plus, "700+ gpm", productionLayers);

    // Creates a layer group to hold all GeoJSON layers for searching
    const searchLayerGroup = L.layerGroup();

    // Search control 
    const searchControl = new L.Control.Search({ 
        container: "search-box",
        layer: searchLayerGroup, 
        initial: false,
        collapsed: false,
        propertyName: 'name', 
        casesensitive: false, 
        textPlaceholder: 'Search well...', 
        textErr: 'Sorry, could locate well. Please try again.', 
        autoResize: true, 
        moveToLocation: function(latlng, title, map) { 
            let searchCoords = latlng;
            let searchMarker = L.circle(searchCoords, {
                color: "red",
                fillColor: "",
                fillOpacity: 0.5,
                weight: 3,
                radius: 100,
                className: "search-pulse",
            });
            searchMarker.addTo(map);
            map.flyTo(latlng, 15.5); 
            setTimeout(() => {
                searchMarker.remove();
            }, 8000);
        }, 
        marker: false,
    }); 

    searchControl.on("search:locationfound", function(point) { 
        document.getElementById("searchtext15").value = "";
    }); 

    // initialize search 
    map.addControl(searchControl);

    // Contains each layer from fetch in layer control
    let basinLayers = "Toggle All Basins"; 

    getBasins(); 

    // Function retrieves all basins 
    function getBasins() {
        // For loop traverses through basins array list and fetches file from the given data property 
        for (let i = 0; i < basins.length; i++) {
            fetch(basins[i].data)
                .then(response => response.json())
                .then(geojson => {
                    const getWellInfo = (feature, layer) => {
                        // Label for well name
                        layer.bindTooltip(feature.properties.name, { permanent: true, direction: 'bottom', offset: [0,10], className: 'basin-tooltip' })
                
                        // Popups with basic well info and buttons for stats and plot
                        layer.bindPopup(
                            `
                            <div id="marker-content-container">
                                <span id="marker-well-name">Well ${feature.properties.name}</span> 
                                <br> 
                                <span id="marker-basin-name">${feature.properties.basin} Basin</span>
                            </div>
                            <br>
                            <div class="d-flex justify-content-center">
                                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff"><path d="m105-233-65-47 200-320 120 140 160-260 109 163q-23 1-43.5 5.5T545-539l-22-33-152 247-121-141-145 233ZM863-40 738-165q-20 14-44.5 21t-50.5 7q-75 0-127.5-52.5T463-317q0-75 52.5-127.5T643-497q75 0 127.5 52.5T823-317q0 26-7 50.5T795-221L920-97l-57 57ZM643-217q42 0 71-29t29-71q0-42-29-71t-71-29q-42 0-71 29t-29 71q0 42 29 71t71 29Zm89-320q-19-8-39.5-13t-42.5-6l205-324 65 47-188 296Z"/></svg>
                                    View Data
                                </button>                
                            </div>
                            `
                        );

                        // On click event on the points
                        // Sends data for clicked item to global variable plotData 
                        layer.on('click', pt => {
                            Stats(pt.target.feature.properties);
                            Plot(pt.target.feature.properties);
                        });
                    } // End of getWellInfo function
                    
                    // Adds GeoJSON layer to map 
                    let basin = L.geoJSON(geojson, {
                        pointToLayer: function(feature, latlng) { // Designates custom marker for each well 
                            let svg = getIcon(feature.properties); 

                            let point = L.marker(latlng, {
                                icon: L.divIcon({
                                    className: "custom-icon",
                                    html: `${svg}`,
                                    iconSize: [30, 30],
                                }),
                            });

                            // TODO - Add point to chloride range layer group
                            const latestChloride = checkLastValue(feature.properties.ci_vals)[0]
                            const latestProduction = checkLastValue(feature.properties.prod_vals)[0]

                            // adds point to chloride range layer based on value 
                            if (latestChloride == null) {
                                point.addTo(chlorideRange30);
                            } else if (latestChloride <= 30) {
                                point.addTo(chlorideRange30);
                            } else if (latestChloride <= 70) {
                                point.addTo(chlorideRange70);
                            } else if (latestChloride <= 150) {
                                point.addTo(chlorideRange150);
                            } else if (latestChloride <=250) {
                                point.addTo(chlorideRange250);
                            } else if (latestChloride <= 300) {
                                point.addTo(chlorideRange300);
                            } else if (latestChloride <= 400) {
                                point.addTo(chlorideRange400);
                            } else if (latestChloride <= 450) {
                                point.addTo(chlorideRange450);
                            }

                            // adds point to production range layer based on value
                            if (latestProduction == null) {
                                point.addTo(productionRangeInactive);
                            } else if (latestProduction < 1) {
                                point.addTo(productionRange0);
                            } else if (latestProduction <= 100) {
                                point.addTo(productionRange100);
                            } else if (latestProduction <= 200) {
                                point.addTo(productionRange200);
                            } else if (latestProduction <= 300) {
                                point.addTo(productionRange300);
                            } else if (latestProduction <= 400) {
                                point.addTo(productionRange400);
                            } else if (latestProduction <= 500) {
                                point.addTo(productionRange500);
                            } else if (latestProduction <= 600) {
                                point.addTo(productionRange600);
                            } else if (latestProduction <= 700) {
                                point.addTo(productionRange700);
                            } else {
                                point.addTo(productionRange700Plus);
                            }

                            return point;
                        }, 
                        onEachFeature: getWellInfo,
                    });

                    basin.addTo(map);
                    basin.addTo(searchLayerGroup)

                    layerControl.addOverlay(basin, `${basins[i].name} Basin`, basinLayers);
                }); // End of fetch 
        } // End of for-loop

        // Use the layer group as the layer for the search control
        searchControl.setLayer(searchLayerGroup);
    } // End of getBasins function 
}