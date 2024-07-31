/* 
LMap.js
*/

// components 
import { BaseLayers } from "./BaseLayers.js";
import { basins } from "./Basins.js";
import { getIcon, checkLastValue } from "./CustomIcon.js";
import { MarkerPopup } from "./MarkerPopup.js";
// import { CustomOverlay } from "./CustomOverlay.js";
import { Stats } from "./Stats.js";
import { Plot } from "./Plot.js";
import { chlorideToggleBtns, productionToggleBtns } from "./Legend_v2.js";

export function LMap(element) {
    // Center of Guam
    const center = [13.5435056,144.7478083];

    // Creates Leaflet map 
    const map = L.map(element, {
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

    function checkLayerExistence(layer) {
        if (!map.hasLayer(layer)) {
            layer.addTo(map);
        } else {
            map.removeLayer(layer);
        }
    }

    function checkCheckBox(choice, layer) {
        if (choice) {
            layer.addTo(map)
        } else {
            map.removeLayer(layer)
        }
    }

    document.addEventListener('DOMContentLoaded', (e) => {
        setTimeout(() => {

            // TODO - simplify adding layers back to map
            // Resets layers on map (adds everything back)
            document.getElementById("legend-layers-reset").addEventListener('click', () => {
                chlorideRange30.addTo(map);
                chlorideRange70.addTo(map);
                chlorideRange150.addTo(map);
                chlorideRange250.addTo(map);
                chlorideRange300.addTo(map);
                chlorideRange400.addTo(map);
                chlorideRange450.addTo(map);

                productionRangeInactive.addTo(map);
                productionRange0.addTo(map);
                productionRange100.addTo(map);
                productionRange200.addTo(map);
                productionRange300.addTo(map);
                productionRange400.addTo(map);
                productionRange500.addTo(map);
                productionRange600.addTo(map);
                productionRange700.addTo(map);
                productionRange700Plus.addTo(map);
            });

            // TODO - change to for loop, add each chlorideRange layer into an array list (same goes for productionRange layers)
            // Event listeners for chloride range layers 
            document.getElementById(chlorideToggleBtns[0]).addEventListener('click', () => {
                checkLayerExistence(chlorideRange30)
            });

            document.getElementById(chlorideToggleBtns[1]).addEventListener('click', () => {
                checkLayerExistence(chlorideRange70)
            });
            
            document.getElementById(chlorideToggleBtns[2]).addEventListener('click', () => {
                checkLayerExistence(chlorideRange150)
            }); 

            document.getElementById(chlorideToggleBtns[3]).addEventListener('click', () => {
                checkLayerExistence(chlorideRange250)
            });

            document.getElementById(chlorideToggleBtns[4]).addEventListener('click', () => {
                checkLayerExistence(chlorideRange300)
            });
            
            document.getElementById(chlorideToggleBtns[5]).addEventListener('click', () => {
                checkLayerExistence(chlorideRange400)
            });

            document.getElementById(chlorideToggleBtns[6]).addEventListener('click', () => {
                checkLayerExistence(chlorideRange450)
            });

            // Event listeners for production range layers 
            document.getElementById(productionToggleBtns[0]).addEventListener('change', (e) => {
                checkCheckBox(e.target.checked, productionRangeInactive)
            });

            document.getElementById(productionToggleBtns[0]).addEventListener('change', (e) => {
                checkCheckBox(e.target.checked, productionRange0)
            });

            document.getElementById(productionToggleBtns[1]).addEventListener('change', (e) => {
                checkCheckBox(e.target.checked, productionRange100)
            });

            document.getElementById(productionToggleBtns[2]).addEventListener('change', (e) => {
                checkCheckBox(e.target.checked, productionRange200)
            });

            document.getElementById(productionToggleBtns[3]).addEventListener('change', (e) => {
                checkCheckBox(e.target.checked, productionRange300)
            });

            document.getElementById(productionToggleBtns[4]).addEventListener('change', (e) => {
                checkCheckBox(e.target.checked, productionRange400)
            });

            document.getElementById(productionToggleBtns[5]).addEventListener('change', (e) => {
                checkCheckBox(e.target.checked, productionRange500)
            });

            document.getElementById(productionToggleBtns[6]).addEventListener('change', (e) => {
                checkCheckBox(e.target.checked, productionRange600)
            });

            document.getElementById(productionToggleBtns[7]).addEventListener('change', (e) => {
                checkCheckBox(e.target.checked, productionRange700)
            });

            document.getElementById(productionToggleBtns[8]).addEventListener('change', (e) => {
                checkCheckBox(e.target.checked, productionRange700Plus)
            });

        }, 1000);
    });
    
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

    // Initialize search 
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
                        layer.bindPopup(MarkerPopup(feature.properties.name, feature.properties.basin));

                        // On click event on the points
                        // Sends data for clicked item to global variable plotData 
                        layer.on('click', point => {
                            Stats(point.target.feature.properties);
                            Plot(point.target.feature.properties);
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

                            // Adds point to chloride range layer based on value 
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
                    basin.addTo(searchLayerGroup);

                    layerControl.addOverlay(basin, `${basins[i].name} Basin`, basinLayers);
                }); // End of fetch 
        } // End of for-loop

        // Use the layer group as the layer for the search control
        searchControl.setLayer(searchLayerGroup);
    } // End of getBasins function 
}