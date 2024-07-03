//center of guam
const center = [13.5435056,144.7478083];

// Creates Leaflet map 
const map = L.map('map', {
    center: center,
    zoom: 12,
    zoomControl: false,
})

// WERI-GHS attribution 
const devs = "MW Zapata, DK Valerio, NC Habana"
const year = 2024;
const attr = ` | <a href="https://weri.uog.edu/">WERI</a>-<a href="https://guamhydrologicsurvey.uog.edu/">GHS</a>: ${devs} (${year})`;

map.addEventListener("click", function (event) {
    console.log(map.getCenter());
    return false;
});

const baseLayersZoom = 19;

// Open Street Map layer
const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: baseLayersZoom, 
    attribution: '© OpenStreetMap' + attr,
}).addTo(map)

// ESRI World Street Map 
const ewsp = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: baseLayersZoom,
	attribution: 'Tiles &copy; Esri' + attr,
})

// ESRI World Topo Map 
const ewtm = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: baseLayersZoom, 
	attribution: 'Tiles &copy; Esri' + attr,
});

// ESRI World Imagery 
const ewi = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: baseLayersZoom,
	attribution: 'Tiles &copy; Esri' + attr,
}); 

// ESRI World Gray Canvas 
const ewgc = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri' + attr,
	maxZoom: 16
});

// TODO: configure custom map 
// custom tile layer from Dr Habana 
const custom = L.tileLayer("https://ghs-cdn.uog.edu/wp-content/databases/MAppFx/chloride-production-app/Background/MAppFX2.png", {
    attribution: `Tiles &copy <a href="https://weri.uog.edu/">WERI</a> - NC Habana (2024) ${attr}`,
    maxZoom: 16,
    tileSize: 512
})

const baseLayers = {
    'Open Street Map': osm,
    'ESRI World Imagery': ewi,
    'ESRI World Topo Map': ewtm,
    'ESRI World Street Map': ewsp,
    'ESRI World Gray Canvas': ewgc,
    'Custom Map Layer': custom,
}

var groupedLayersOptions = {
    exclusiveGroups: ["Base Maps"],
    groupCheckboxes: true, 
    position: 'bottomright'
};

const layerControl = L.control.groupedLayers(baseLayers, null, groupedLayersOptions);
layerControl.addTo(map);

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

// Control to reset map view (goes to initial map zoom on page load)
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
        // TODO: configure marker size based on zoom level (gets bigger when zooming in) and resets to orig size when default zoom 
        // let customIcons = document.getElementsByClassName("custom-icon")
        // for (let i = 0; i < customIcons.length; i++) {
        //     customIcons[i].style.width = 50
        //     customIcons[i].style.width = 50
        // }
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

// Handling draw events 
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
        <b>Well ${plotData.name} : Chloride & Production (Monthly)</b>
        `

    document.getElementById("modal-subheader").innerHTML = 
        `
        <p class="stats-location"> ${getStats.lat.toFixed(3)}, ${getStats.lon.toFixed(3)} | ${getStats.basin}</p>
        `
    document.getElementById("modal-body-content").innerHTML = /* html */
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

    // Converts date strings from x_vals to JS date objects 
    for (let i = 0; i < plotData.x_vals.length; i++) {
        x_dates_conv[i] = new Date(plotData.x_vals[i]);
    };

    // Plots x,y coordinates for enlarged plot
    const chlorideTrace = {
        x: x_dates_conv,
        y: plotData.ci_vals,
        type: 'scatter', 
        mode: 'markers',
        name: 'Chloride Levels'
    };

    const productionTrace = {
        x: x_dates_conv,
        y: plotData.prod_vals,
        type: 'scatter', 
        mode: 'markers',
        name: 'Production Rate',
        yaxis:"y2"
    };
    
    // Configuration for selecting data time frame  
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

    Plotly.newPlot('large-plot', [chlorideTrace, productionTrace], layout, {scrollZoom: true, displaylogo: false, responsive: true}, config);
}
// Creates a layer group to hold all GeoJSON layers for searching
const searchLayerGroup = L.layerGroup();

// Search control
const searchControl = new L.Control.Search({ 
    layer: searchLayerGroup, 
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

// Array of objects, each object containing basin name, full file path, and color on map 
const basins = [
	{
		"name": "Finegayan",
		"data": "./static/data/finegayanBasinV2.json",
        "color": "green",
	},
	{
		"name": "Hagatna",
		"data": "./static/data/hagatnaBasinV2.json",
        "color": "#FFAA00",
	},
	{
		"name": "Machanao",
		"data":	"./static/data/machanaoBasinV2.json",
        "color": "#7A8EF5",
	},
	{
		"name": "Mangilao",
		"data":	"./static/data/mangilaoBasinV2.json",
        "color": "red",
	},
	{
		"name": "Upi",
		"data":	"./static/data/upiBasinV2.json",
        "color": "blue",
	},
	{
		"name": "Yigo-Tumon",
		"data":	"./static/data/yigoTumonBasinV2.json",
        "color": "#73DFFF",
	},
];

// Contains each layer from fetch in layer control
let basinLayers = "Toggle All Basins"; 

// getOneBasin()
getBasins()

// --------------------------------------------------------------------------------------------- 

// THIS FUNCTION IS FOR DEBUGGING PURPOSES ONLY 
function getOneBasin() {
    fetch(basins[0].data)
            .then(response => response.json())
            .then(geojson => {
                const getWellInfo = (feature, layer) => {
                    // Label for well name
                    layer.bindTooltip(feature.properties.name, { permanent: true, direction: 'bottom', offset: [0,10] })
            
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
                    });
                } // end of getWellInfo function
                
                let basin = L.geoJSON(geojson, {
                    pointToLayer: function(feature, latlng) {
                        let svg = getIcon(feature.properties) 
                        console.log(svg)
                        return L.marker(latlng, {
                            icon: L.divIcon({
                                className: "custom-icon",
                                html: `${svg}`,
                                iconSize: [30, 30],
                                // iconAnchor: [50, 60]
                                // iconAnchor: [50, 30]
                            }),
                        })
                    }, 
                    onEachFeature: getWellInfo,
                });

                basin.addTo(map);
                basin.addTo(searchLayerGroup)

                layerControl.addOverlay(basin, `${basins[0].name} Basin`, basinLayers);
            }); // end of fetch 
}

// Function retrieves all basins 
function getBasins() {
    // For loop to traverse through basins array list and fetch file from the given data property 
    for (let i = 0; i < basins.length; i++) {
        fetch(basins[i].data)
            .then(response => response.json())
            .then(geojson => {
                const getWellInfo = (feature, layer) => {
                    // Label for well name
                    layer.bindTooltip(feature.properties.name, { permanent: true, direction: 'bottom', offset: [0,10] })
            
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
                    });
                } // End of getWellInfo function
                
                let basin = L.geoJSON(geojson, {
                    // pointToLayer: function(feature, latlng) {
                    //     getIcon(feature.properties) 
                    //     return L.circleMarker(latlng, {
                    //         // configure options 
                    //         radius: 8,
                    //         fillColor: basins[i].color, // color is based on object property in basins array 
                    //         weight: 1,
                    //         fillOpacity: 1,
                    //         color: "black", // marker outline 
                    //         opacity: 1.0,
                    //     });
                    // }, 
                    pointToLayer: function(feature, latlng) {
                        let svg = getIcon(feature.properties) 
                        console.log(svg)
                        return L.marker(latlng, {
                            icon: L.divIcon({
                                className: "custom-icon",
                                html: `${svg}`,
                                iconSize: [40, 40],
                                // iconAnchor: [50, 60]
                                // iconAnchor: [50, 30]
                            }),
                        })
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

function getIcon(point) { // Expected argument: feature.properties 
    console.log("from getIcon")
    // gets the last element of each list 
    // latestDate = point.x_vals[point.x_vals.length - 1];
    // chloride = point.ci_vals[point.ci_vals.length - 1];
    // production = point.prod_vals[point.prod_vals.length - 1]; 

    console.log(point.name)
    latestProductionValue = checkLastValue(point.prod_vals)
    console.log(`Production value: ${latestProductionValue[0]} at position ${latestProductionValue[1]}`)
    latestChlorideValue = checkLastValue(point.ci_vals)
    console.log(`Chloride value: ${latestChlorideValue[0]} at position ${latestChlorideValue[1]}`)
    console.log("------")

    // console.log(checkProduction(latestChlorideValue[0], latestProductionValue[0]))

    let icon = checkProduction(latestChlorideValue[0], latestProductionValue[0]) 
    return icon
}

function checkLastValue(data) {
    // console.log("from checkLastValue")
    // console.log(typeof data)
    let latestData = 0 // initialize variable 
    let pos = 0;
    for (let i = data.length - 1; i >= 0; i--) {
        pos = i
        if (data[i] == null) {
            continue;
        } else {
            latestData = data[i];
            // console.log(latestData);
            break;
        }
    }
    return [latestData, pos];
}

function isNumber(value) {
    return typeof value ==='number';
}

function createIcon() {
    // get the lastest date 
    // check chloride and production values 
    // ensure they are the same length: dates array list and each variable (chloride & production) 
    // check production value and set shape 
    // check chloride value (compare with legend) and set a color 
}

function checkChloride(chloride) {

    // console.log("from checkChloride")

    let chlorideIcon = "";

    const colors = [
        {
            name: "blue",
            hex: "#0070FF",
            range: "[0 - 30]"
        },
        {
            name: "green",
            hex: "#55FF00",
            range: "(30 - 70]"
        },
        {
            name: "yellow",
            hex: "#FFFF01",
            range: "(70 - 150]"
        },
        {
            name: "orange",
            hex: "#FFAA00",
            range: "(150 - 250]"
        },
        {
            name: "red",
            hex: "#FF0000",
            range: "(250 - 300]"
        },
        {
            name: "magenta",
            hex: "#A50080",
            range: "(300 - 400]"
        },
        {
            name: "purple",
            hex: "#73004C",
            range: "(400 - 450]"
        }
    ]

    if (chloride == null) {
        chlorideIcon = colors[0].hex
    } else if (chloride <= 30) {
        chlorideIcon = colors[0].hex
    } else if (chloride <= 70) {
        chlorideIcon = colors[1].hex
    } else if (chloride <= 150) {
        chlorideIcon = colors[2].hex
    } else if (chloride <=250) {
        chlorideIcon = colors[3].hex
    } else if (chloride <= 300) {
        chlorideIcon = colors[4].hex
    } else if (chloride <= 400) {
        chlorideIcon = colors[5].hex
    } else if (chloride <= 450) {
        chlorideIcon = colors[6].hex
    }
    // console.log(chlorideIcon)
    return chlorideIcon;
}

function checkProduction(chloride, production) {

    // console.log("from checkProduction")

    let productionIcon = "";

    // const height = "100%"
    // const width = "100%"

    const shapes = [
        {
            name: "black circle",
            svg: `
            <svg width="100%" height="100%" viewBox="0 0 100 98" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g>
                    <path d="M94.5596 47.8414C94.5596 72.0543 74.7348 91.6827 50.2798 91.6827C25.8247 91.6827 6 72.0543 6 47.8414C6 23.6284 25.8247 3.99999 50.2798 3.99999C74.7348 3.99999 94.5596 23.6284 94.5596 47.8414Z" fill="#000"/>
                    <path d="M94.0596 47.8414C94.0596 71.7735 74.4634 91.1827 50.2798 91.1827C26.0962 91.1827 6.5 71.7735 6.5 47.8414C6.5 23.9093 26.0962 4.49999 50.2798 4.49999C74.4634 4.49999 94.0596 23.9093 94.0596 47.8414Z" stroke="black"/>
                </g>
                <path d="M76.9619 47.6222C76.9619 62.4791 64.9179 74.523 50.061 74.523C35.2041 74.523 23.1602 62.4791 23.1602 47.6222C23.1602 32.7652 35.2041 20.7213 50.061 20.7213C64.9179 20.7213 76.9619 32.7652 76.9619 47.6222Z" fill="${checkChloride(chloride)}" stroke="black"/>
            </svg>
            `,
            // status: "inactive",
            range: "0"
        },
        {
            name: "orange circle", // fill color: #FFD37F
            svg: `
            <svg width="100%" height="100%" viewBox="0 0 100 98" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g>
                    <path d="M94.5596 47.8414C94.5596 72.0543 74.7348 91.6827 50.2798 91.6827C25.8247 91.6827 6 72.0543 6 47.8414C6 23.6284 25.8247 3.99999 50.2798 3.99999C74.7348 3.99999 94.5596 23.6284 94.5596 47.8414Z" fill="#FFD37F"/>
                    <path d="M94.0596 47.8414C94.0596 71.7735 74.4634 91.1827 50.2798 91.1827C26.0962 91.1827 6.5 71.7735 6.5 47.8414C6.5 23.9093 26.0962 4.49999 50.2798 4.49999C74.4634 4.49999 94.0596 23.9093 94.0596 47.8414Z" stroke="black"/>
                </g>
                <path d="M76.9619 47.6222C76.9619 62.4791 64.9179 74.523 50.061 74.523C35.2041 74.523 23.1602 62.4791 23.1602 47.6222C23.1602 32.7652 35.2041 20.7213 50.061 20.7213C64.9179 20.7213 76.9619 32.7652 76.9619 47.6222Z" fill="${checkChloride(chloride)}" stroke="black"/>
            </svg>
            `, 
            range: "(0 - 100]"
        },
        {
            name: "green circle", // fill color: #D3FFBE
            svg: `
            <svg width="100%" height="100%" viewBox="0 0 100 98" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g>
                    <path d="M94.5596 47.8414C94.5596 72.0543 74.7348 91.6827 50.2798 91.6827C25.8247 91.6827 6 72.0543 6 47.8414C6 23.6284 25.8247 3.99999 50.2798 3.99999C74.7348 3.99999 94.5596 23.6284 94.5596 47.8414Z" fill="#D3FFBE"/>
                    <path d="M94.0596 47.8414C94.0596 71.7735 74.4634 91.1827 50.2798 91.1827C26.0962 91.1827 6.5 71.7735 6.5 47.8414C6.5 23.9093 26.0962 4.49999 50.2798 4.49999C74.4634 4.49999 94.0596 23.9093 94.0596 47.8414Z" stroke="black"/>
                </g>
                <path d="M76.9619 47.6222C76.9619 62.4791 64.9179 74.523 50.061 74.523C35.2041 74.523 23.1602 62.4791 23.1602 47.6222C23.1602 32.7652 35.2041 20.7213 50.061 20.7213C64.9179 20.7213 76.9619 32.7652 76.9619 47.6222Z" fill="${checkChloride(chloride)}" stroke="black"/>
            </svg>
            `, 
            range: "(100 - 200]"
        },
        {
            name: "blue circle", // fill color: #0070FF (same goes for all polygons)
            svg: `
            <svg width="100%" height="100%" viewBox="0 0 100 98" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g>
                    <path d="M94.5596 47.8414C94.5596 72.0543 74.7348 91.6827 50.2798 91.6827C25.8247 91.6827 6 72.0543 6 47.8414C6 23.6284 25.8247 3.99999 50.2798 3.99999C74.7348 3.99999 94.5596 23.6284 94.5596 47.8414Z" fill="#3E68FF"/>
                    <path d="M94.0596 47.8414C94.0596 71.7735 74.4634 91.1827 50.2798 91.1827C26.0962 91.1827 6.5 71.7735 6.5 47.8414C6.5 23.9093 26.0962 4.49999 50.2798 4.49999C74.4634 4.49999 94.0596 23.9093 94.0596 47.8414Z" stroke="black"/>
                </g>
                <path d="M76.9619 47.6222C76.9619 62.4791 64.9179 74.523 50.061 74.523C35.2041 74.523 23.1602 62.4791 23.1602 47.6222C23.1602 32.7652 35.2041 20.7213 50.061 20.7213C64.9179 20.7213 76.9619 32.7652 76.9619 47.6222Z" fill="${checkChloride(chloride)}" stroke="black"/>
            </svg>
            `, 
            range: "(200 - 300]"
        },
        {
            name: "triangle",
            svg: `
            <svg width="100%" height="100%" viewBox="0 0 100 96" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_8_62)">
                <path d="M50 4L96.7654 85H3.23463L50 4Z" fill="#3E68FF"/>
                <path d="M4.10065 84.5L50 5L95.8993 84.5H4.10065Z" stroke="black"/>
            </g>
            <circle cx="50.0001" cy="58.0001" r="21.6642" fill="${checkChloride(chloride)}" stroke="black"/>
            </svg>
            `,
            range: "(300 - 400]"
        },
        {
            name: "square",
            svg: `
            <svg width="100%" height="100%" viewBox="0 0 100 96" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_8_54)">
                <path d="M92 4L92 88H8V4H92Z" fill="#3E68FF"/>
                <path d="M91.5 4.5L91.5 87.5H8.5V4.5H91.5Z" stroke="black"/>
            </g>
            <path d="M75.54 45.79C75.54 60.0114 64.0114 71.54 49.79 71.54C35.5687 71.54 24.04 60.0114 24.04 45.79C24.04 31.5687 35.5687 20.04 49.79 20.04C64.0114 20.04 75.54 31.5687 75.54 45.79Z" fill="${checkChloride(chloride)}" stroke="black"/>
            </svg>
            `,
            range: "(400 - 500]"
        },
        {
            name: "pentagon",
            svg: `
            <svg width="100%" height="100%" viewBox="0 0 100 97" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_8_58)">
                <path d="M49.5 4L93.7241 36.1307L76.832 88.1193H22.168L5.27587 36.1307L49.5 4Z" fill="#3E68FF"/>
                <path d="M5.86366 36.3217L49.5 4.61803L93.1363 36.3217L76.4688 87.6193H22.5313L5.86366 36.3217Z" stroke="black"/>
            </g>
            <circle cx="49.4998" cy="50.5" r="25.1057" fill="${checkChloride(chloride)}" stroke="black"/>
            </svg>
            `,
            range: "(500 - 600]"
        },
        {
            name: "hexagon",
            svg: `
            <svg width="100%" height="100%" viewBox="0 0 100 98" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_8_66)">
                <path d="M2 47.7251L25.8626 6.3939L73.5877 6.3939L97.4503 47.7251L73.5877 89.0562L25.8626 89.0562L2 47.7251Z" fill="#3E68FF"/>
                <path d="M26.1512 88.5562L2.57735 47.7251L26.1512 6.8939L73.299 6.8939L96.8729 47.7251L73.299 88.5562L26.1512 88.5562Z" stroke="black"/>
            </g>
            <circle cx="49.5181" cy="47.9326" r="25.4376" fill="${checkChloride(chloride)}" stroke="black"/>
            </svg>
            `,
            range: "(600 - 700]"
        }
    ];

    if (production == null) {
        productionIcon = shapes[0].svg
    } else if (production < 1) {
        productionIcon = shapes[0].svg
    } else if (production <= 100) {
        productionIcon = shapes[1].svg
    } else if (production <= 200) {
        productionIcon = shapes[2].svg
    } else if (production <= 300) {
        productionIcon = shapes[3].svg
    } else if (production <= 400) {
        productionIcon = shapes[4].svg
    } else if (production <= 500) {
        productionIcon = shapes[5].svg
    } else if (production <= 600) {
        productionIcon = shapes[6].svg
    } else if (production <= 700) {
        productionIcon = shapes[7].svg
    }

    // console.log(productionIcon)
    return productionIcon;
}