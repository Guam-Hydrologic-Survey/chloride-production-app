//center of guam
const center = [13.5435056,144.7478083];


// Creates Leaflet map 
const map = L.map('map', {
    center: center,
    zoom: 12,
    zoomControl: false,
    // fullscreenControl: true, 
    // fullscreenControlOptions: {
    //     position: 'topleft'
    // }
})

const devs = ` | <a href="https://weri.uog.edu/">WERI</a>-<a href="https://guamhydrologicsurvey.uog.edu/">GHS</a>: MWZapata, DKValerio, NCHabana 2024`;

    map.addEventListener("click", function (event) {
        console.log(map.getCenter());

        return false;
    });

const baseLayersZoom = 19;

// Open Street Map layer
const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: baseLayersZoom, 
    attribution: '© OpenStreetMap' + devs,
}).addTo(map)

// ESRI World Street Map 
const ewsp = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: baseLayersZoom,
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012' + devs,
})

// ESRI World Topo Map 
const ewtm = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: baseLayersZoom, 
	attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community' + devs,
});

// ESRI World Imagery 
const ewi = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: baseLayersZoom,
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community' + devs,
}); 

// ESRI World Gray Canvas 
var ewgc = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ' + devs,
	maxZoom: 16
});

const baseLayers = {
    'Open Street Map': osm,
    'ESRI World Imagery': ewi,
    'ESRI World Topo Map': ewtm,
    'ESRI World Street Map': ewsp,
    'ESRI World Gray Canvas': ewgc,
}
var groupedLayersOptions = {
    exclusiveGroups: ["Base Maps"],
    groupCheckboxes: true, 
    position: 'bottomright'
};

const layerControl = L.control.groupedLayers(baseLayers, null, groupedLayersOptions);
layerControl.addTo(map);

const mapTitle = L.control({position: 'topleft'});

mapTitle.onAdd =  function(map) {
    this._div = L.DomUtil.create('div', 'mapTitle'); 
    //TODO: change img src
    this._div.innerHTML = '<img src="./static/assets/WERI MAppFx Well Nitrates Title Card-White_Bold.png" height="150">';
    return this._div;
};

//TODO: Add Chloride and Production MAppFx Title
// mapTitle.addTo(map);

// var sidebar = L.control.sidebar('sidebar').addTo(map); //was always commented out

L.control.fullscreen({
    position: 'bottomright',
    title: 'Toggle fullscreen mode',
    titleCancel: 'Exit fullscreen mode',
    forceSeparateButton: false,
}).addTo(map);

L.control.zoom({
    // options: topleft, topright, bottomleft, bottomright
    position: 'bottomright'
}).addTo(map);

// Control: Reset map view (goes to initial map zoom on page load)
var resetZoomBtn = L.easyButton('<i class="bi bi-map"></i>', function() {
    map.setView(center, 12);
}, "Reset map view");

const controlBar = L.easyBar([
    resetZoomBtn,
], { position: 'bottomright'})

controlBar.addTo(map);

// Hides tooltip based on zoom level 
map.on('zoomend', function(z) {
    var zoomLevel = map.getZoom();
    if (zoomLevel >= 15 ){
        [].forEach.call(document.querySelectorAll('.leaflet-tooltip'), function (t) {
            t.style.visibility = 'visible';
        });
    } else {
        [].forEach.call(document.querySelectorAll('.leaflet-tooltip'), function (t) {
            t.style.visibility = 'hidden';
        });
    }
});

// Draw control bar
var drawnFeatures = new L.FeatureGroup();
map.addLayer(drawnFeatures);

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

map.on(L.Draw.Event.CREATED, function(event) {
    var layer = event.layer;
    drawnFeatures.addLayer(layer);
});

if (map.hasLayer(drawnFeatures)) {
    layerControl.addOverlay(drawnFeatures, "Drawings");
}

// Plots data points from selected well to chart 
let plotData 
const plotWNL = () => {

    var ciSlope = getStats.ci_slope;
    var ciIntercept = getStats.ci_intercept;
    var prodSlope = getStats.prod_slope;
    var prodIntercept = getStats.prod_intercept;
    if (ciSlope != "---") {
        ciSlope = getStats.ci_slope.toFixed(3)
    } 
    if (ciIntercept != "---"){
        ciIntercept = getStats.ci_intercept.toFixed(3)
    }
    if (prodSlope != "---") {
        prodSlope = getStats.prod_slope.toFixed(3)
    } 
    if (prodIntercept != "---"){
        prodIntercept = getStats.prod_intercept.toFixed(3)
    }
    document.getElementById("exampleModalLabel").innerHTML = 
        `
        <b>Well ${plotData.name} : Chloride & Production Levels (Monthly)</b>
        `

    document.getElementById("modal-subheader").innerHTML = 
        `
        <p class="stats-location"> ${getStats.lat.toFixed(3)}, ${getStats.lon.toFixed(3)} | ${getStats.basin}</p>
        `
    document.getElementById("modal-body-content").innerHTML =
        `
            <div class="stats-row">
                <div class="stats-col">
                    <p class="stats-text">[CI-] Slope (mg/L)</p>
                    <p class="stats-text">[CI-] Intercept (mg/L)</p>
                    <p class="stats-text">Production Slope (avg GPM)</p>
                    <p class="stats-text">Production Intercept <br>(avg GPM)</p>
                    <br>
                    <br>
                </div>
                <div class="stats-col">
                    <p class="stats-num">${ciSlope}</p>
                    <p class="stats-num">${ciIntercept}</p>
                    <br>
                    <p class="stats-num">${prodSlope}</p>
                    <br>
                    <p class="stats-num">${prodIntercept}</p>
                    <br>
                </div>
            </div>
            
        `

    // Array to hold date objects
    const x_dates_conv = [];

    // Converted date strings from x_vals to JS date objects 
    for (let i = 0; i < plotData.x_vals.length; i++) {
        x_dates_conv[i] = new Date(plotData.x_vals[i]);
    };

    // Plots x,y coordinates for enlarged plot
    const wnlTrace = {
        x: x_dates_conv,
        y: plotData.ci_vals,
        type: 'scatter', 
        mode: 'markers',
        name: 'Chloride Levels'
    };

    const wnlTrace2 = {
        x: x_dates_conv,
        y: plotData.prod_vals,
        type: 'scatter', 
        mode: 'markers',
        name: 'Production Levels',
        yaxis:"y2"
    };
    
    var selectorOptions = {
            buttons: [{
                step: 'year',
                stepmode: 'backward',
                count: 1,
                label: '1y'
            }, {
                step: 'year',
                stepmode: 'backward',
                count: 5,
                label: '5y'
            }, {
                step: 'year',
                stepmode: 'todate',
                count: 10,
                label: '10y'
            }, {
                step: 'year',
                stepmode: 'backward',
                count: 20,
                label: '20y'
            }, 
            {
                step: 'year',
                stepmode: 'backward',
                count: 30,
                label: '30y'
            }, 
            {
                step: 'year',
                stepmode: 'backward',
                count: 40,
                label: '40y'
            },
            {
                step: 'year',
                stepmode: 'backward',
                count: 50,
                label: '50y'
            },
            {
                step: 'all',
            }],
        };
    // Plot features and layout
    const layout = {
        autosize: false,
        height: 550,
        width: 800,
        margin: {
            "t": 50,
        },
        xaxis: {
            rangeselector: selectorOptions,
            rangeslider: {}
        },
        yaxis: {
            title: '[CI-] (mg/L)',
            range: [0, 'auto'],
            titlefont: { color: 'rgb(31, 119, 180)' },
            tickfont: { color: 'rgb(31, 119, 180)' },
            
        },
        yaxis2: {
            title: 'Production (avg GPM)',
            titlefont: {color: 'rgb(251,136,33)'},
            tickfont: {color: 'rgb(251,136,33)'},
            overlaying: 'y',
            side: 'right',
            range: [0, 'auto']
          }
          ,
          legend: {
              "orientation": "h",
              x: .5,
              xanchor: 'right',
              y: -0.3
          }
    };

    var config = {
        toImageButtonOptions: {
            format: 'png', // png, svg, jpeg, webp
            filename: 'well_plot',
            height: 500,
            width: 900,
            scale: 1 
          }
    };

    Plotly.newPlot('large-plot', [wnlTrace, wnlTrace2], layout, {scrollZoom: true, displaylogo: false, responsive: true}, config);
}


// Filepath for map (lat, lon coords) json and data (stats, x-y vals) json 
const yigoTumonBasin = './static/data/yigoTumonBasin.json';
const hagatnaBasin = './static/data/hagatnaBasin.json';
const finegayanBasin = './static/data/finegayanBasin.json';
const mangilaoBasin = './static/data/mangilaoBasin.json';
const upiBasin = './static/data/upiBasin.json';
const machanaoBasin = './static/data/machanaoBasin.json';

function getColor(sig) {
    const colors = [
        {
            name: "orange",
            hex: "#FFAA00",
            range: "<= 5"
        },
        {
            name: "black",
            hex: "#000000",
            range: "<= 4"
        },
        {
            name: "blue",
            hex: "#7A8EF5",
            range: "<= 3"
        },
        {
            name: "light-blue",
            hex: "#73DFFF", 
            range: "<= 2"
        },
        {
            name: "red",
            hex: "F50000", 
            range: "> 5"
        }
    ]
    var c;
    if (sig > 5) {
        c = colors[4].hex;
    } else {
        if (sig == 5) {
            c = colors[0].hex;
        } else if (sig == 4) {
            c = colors[1].hex;
        } else if (sig == 3) {
            c = colors[2].hex;
        } else {
            c = colors[3].hex;
        }
    }
    return c; 
}
// Function to create a GeoJSON layer
function createGeoJSONLayer(geojson, color) {
    const getWellInfo = (feature, layer) => {
        // Label for well name
        layer.bindTooltip(feature.properties.name, {permanent: true, direction: 'bottom', offset: [0,10]})

        // Popups with basic well info and buttons for stats and plot
        layer.bindPopup(
            `
            <strong>Well</strong>: ${feature.properties.name} 
            <br><strong>Lat:</strong> ${feature.properties.lat.toFixed(3)} 
            <br><strong>Lon:</strong> ${feature.properties.lon.toFixed(3)}
            <br><strong>Basin Name:</strong> ${feature.properties.basin}
            <br><br>
            <div class="d-flex justify-content-center">
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" onclick="plotWNL()" data-bs-target="#exampleModal">
                More Info
                </button>            
            </div>
            `
        );

        // On click event on the points
        // Sends data for clicked item to global variable plotData 
        layer.on('click', pt => {
            plotData = pt.target.feature.properties;
            getStats = pt.target.feature.properties;
        })
        
        
        
    }
    
    return L.geoJSON(geojson, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, {
                radius: 8,
                fillColor: getColor(color),
                weight: 1,
                fillOpacity: 1,
                color: "black",
                opacity: 1.0,
            });
        },
        onEachFeature: getWellInfo,
    });
}

// Gets the data from the JSON file and adds well to the map
//TODO: make fetch more clean and efficient if possible
const groupName = "Toggle All Basins"
//TODO: FINEGAYAN
fetch(finegayanBasin)
    .then(response => response.json())  // Requests for a json file as a response
    .then(geojson => { 

        const getWellInfo = (feature, layer) => {
            // Label for well name
            layer.bindTooltip(feature.properties.name, {permanent: true, direction: 'bottom', offset: [0,10]})

            // Popups with basic well info and buttons for stats and plot
            layer.bindPopup(
                `
                <strong>Well</strong>: ${feature.properties.name} 
                <br><strong>Lat:</strong> ${feature.properties.lat.toFixed(3)} 
                <br><strong>Lon:</strong> ${feature.properties.lon.toFixed(3)}
                <br><strong>Basin Name:</strong> ${feature.properties.basin}
                <br><br>
                <div class="d-flex justify-content-center">
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" onclick="plotWNL()" data-bs-target="#exampleModal">
                        More Info
                    </button>                
                </div>
                `
            );

            // On click event on the points
            // Sends data for clicked item to global variable plotData 
            layer.on('click', pt => {
                plotData = pt.target.feature.properties;
                getStats = pt.target.feature.properties;
            })
            
        }

        // Finegayan Basin Layer of Well
        const finegayanBasinLayer = L.geoJSON(geojson, {
            pointToLayer: function(feature, latlng) {
                return L.circleMarker(latlng, {
                    radius: 8, 
                    fillColor: "green",
                    weight: 1,
                    fillOpacity: 1,
                    color: "black",
                    opacity: 1.0,
                })
            }, 
            onEachFeature: getWellInfo}).addTo(map);
        layerControl.addOverlay(finegayanBasinLayer, "Finegayan Basin", groupName);
        const mapJson = L.layerGroup([finegayanBasinLayer]).addTo(map);

        // Control search  
        const searchControl = new L.Control.Search({ 
            layer: mapJson, 
            propertyName: 'name', 
            casesensitive: false, 
            textPlaceholder: 'Well Name...', 
            textErr: 'Sorry, could not find well.', 
            autoResize: true, 
            moveToLocation: function(latlng, title, map) { 
                map.flyTo(latlng, 16); 
            }, 
            marker: { 
                icon: false, 
                animate: false, 
                circle: { 
                    weight: 6, 
                    radius: 30, 
                    color: 'red', 
                } 
            },
            hideMarkerOnCollapse: true,
            autoCollapseTime: 1200,
        }); 

        searchControl.on("search:locationfound", function(e) { 
            e.layer.openPopup(); 
            plotData = e.layer.feature.properties;
            getStats = e.layer.feature.properties;
        }); 
        map.addControl(searchControl);

        // Load hagatnaBasin GeoJSON data
        fetch(hagatnaBasin)
            .then(response => response.json())
            .then(geojson => {
                // Hagatna Basin Layer of Well
                const hagatnaBasinLayer = L.geoJSON(geojson, {
                    pointToLayer: function(feature, latlng) {
                        return L.circleMarker(latlng, {
                            radius: 8, 
                            fillColor: getColor(5),
                            weight: 1,
                            fillOpacity: 1,
                            color: "black",
                            opacity: 1.0,
                        })
                    }, 
                    onEachFeature: getWellInfo}).addTo(map);
                layerControl.addOverlay(hagatnaBasinLayer, "Hagåtña Basin", groupName);
                mapJson.addLayer(hagatnaBasinLayer); // Add to the existing layer group
            
                // Load machanaoBasin GeoJSON data
                fetch(machanaoBasin)
                    .then(response => response.json())
                    .then(geojson => {
                        // Machanao Basin Layer of Well
                        const machanaoBasinLayer = L.geoJSON(geojson, {
                            pointToLayer: function(feature, latlng) {
                                return L.circleMarker(latlng, {
                                    radius: 8, 
                                    fillColor: getColor(3),
                                    weight: 1,
                                    fillOpacity: 1,
                                    color: "black",
                                    opacity: 1.0,
                                })
                            }, 
                            onEachFeature: getWellInfo}).addTo(map);
                        layerControl.addOverlay(machanaoBasinLayer, "Machanao Basin", groupName);
                        mapJson.addLayer(machanaoBasinLayer); // Add to the existing layer group
                        

                        // Load mangilaoBasin GeoJSON data
                        fetch(mangilaoBasin)
                            .then(response => response.json())
                            .then(geojson => {
                                // Mangilao Basin Layer of Well
                                const mangilaoBasinLayer = L.geoJSON(geojson, {
                                    pointToLayer: function(feature, latlng) {
                                        return L.circleMarker(latlng, {
                                            radius: 8, 
                                            fillColor: "red",
                                            weight: 1,
                                            fillOpacity: 1,
                                            color: "black",
                                            opacity: 1.0,
                                        })
                                    }, 
                                    onEachFeature: getWellInfo}).addTo(map);
                                layerControl.addOverlay(mangilaoBasinLayer, "Mangilao Basin", groupName);
                                mapJson.addLayer(mangilaoBasinLayer); // Add to the existing layer group
                                
                                // Load upiBasin GeoJSON data
                                fetch(upiBasin)
                                    .then(response => response.json())
                                    .then(geojson => {
                                        // Upi Basin Layer of Well
                                        const upiBasinLayer = L.geoJSON(geojson, {
                                            pointToLayer: function(feature, latlng) {
                                                return L.circleMarker(latlng, {
                                                    radius: 8, 
                                                    fillColor: "blue",
                                                    weight: 1,
                                                    fillOpacity: 1,
                                                    color: "black",
                                                    opacity: 1.0,
                                                })
                                            }, 
                                            onEachFeature: getWellInfo}).addTo(map);
                                        layerControl.addOverlay(upiBasinLayer, "Upi Basin", groupName);
                                        mapJson.addLayer(upiBasinLayer); // Add to the existing layer group
                                        
                                        // Load yigoTumonBasin GeoJSON data
                                        fetch(yigoTumonBasin)
                                            .then(response => response.json())
                                            .then(geojson => {
                                                // Yigo-Tumon Basin Layer of Well
                                                const yigoTumonBasinLayer = L.geoJSON(geojson, {
                                                    pointToLayer: function(feature, latlng) {
                                                        return L.circleMarker(latlng, {
                                                            radius: 8, 
                                                            fillColor: getColor(1),
                                                            weight: 1,
                                                            fillOpacity: 1,
                                                            color: "black",
                                                            opacity: 1.0,
                                                        })
                                                    }, 
                                                    onEachFeature: getWellInfo}).addTo(map);
                                                layerControl.addOverlay(yigoTumonBasinLayer, "Yigo-Tumon Basin", groupName);
                                                mapJson.addLayer(yigoTumonBasinLayer); // Add to the existing layer group
                                            })
                                            .catch(console.error);
                                    })
                                    .catch(console.error);
                            })
                            .catch(console.error);
                    })
                    .catch(console.error);
            })
            .catch(console.error);
    })
    .catch(console.error);
    