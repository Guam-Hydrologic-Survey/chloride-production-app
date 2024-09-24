/*
main.js - original code (for reference)
*/

// Center of Guam
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

const baseLayersZoom = 16;

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
	maxZoom: baseLayersZoom
});

const baseLayers = {
    'Open Street Map': osm,
    'ESRI World Imagery': ewi,
    'ESRI World Topo Map': ewtm,
    'ESRI World Street Map': ewsp,
    'ESRI World Gray Canvas': ewgc,
}

let groupedLayersOptions = {
    exclusiveGroups: ["Base Maps"],
    groupCheckboxes: true, 
    position: 'bottomright'
};

const layerControl = L.control.groupedLayers(baseLayers, null, groupedLayersOptions);
layerControl.addTo(map);

// Configuration for custom map image overlay 
// 120KCP PNG 
const overlay_120kcp_url = "./static/assets/overlays/120KCP.png"
const overlay_120kcp_tl = [13.676549220976273, 144.679002534165647]
const overlay_120kcp_br = [13.4088743, 145.0248265]
const overlay_120kcp_bounds = L.latLngBounds([overlay_120kcp_tl, overlay_120kcp_br]); 

const overlayOptions = {
    opacity: 1, 
    interactive: false,
}

let overlay_120kcp = L.imageOverlay(overlay_120kcp_url, overlay_120kcp_bounds, overlayOptions)

overlay_120kcp.addTo(map);

layerControl.addOverlay(overlay_120kcp, "120K");

// 60KNCP PNG 
const overlay_60kncp_url = "./static/assets/overlays/60KNCP.png"
const overlay_60kncp_tl = [13.676121397466535, 144.790949685872050]
const overlay_60kncp_br = [13.5293066, 144.9788355]
const overlay_60kncp_bounds = L.latLngBounds([overlay_60kncp_tl, overlay_60kncp_br]);

let overlay_60kncp = L.imageOverlay(overlay_60kncp_url, overlay_60kncp_bounds, overlayOptions)

// layerControl.addOverlay(overlay_60kncp, "60KN");

// 60KSCP PNG 
const overlay_60kscp_url = "./static/assets/overlays/60KSCP.png"
const overlay_60kscp_tl = [13.530946619838641, 144.724280522275109]
const overlay_60kscp_br = [13.4089456, 144.9468201]
const overlay_60kscp_bounds = L.latLngBounds([overlay_60kscp_tl, overlay_60kscp_br]);

let overlay_60kscp = L.imageOverlay(overlay_60kscp_url, overlay_60kscp_bounds, overlayOptions)

// layerControl.addOverlay(overlay_60kscp, "60KS");

let overlays_60k_combined = L.layerGroup([overlay_60kncp, overlay_60kscp])
layerControl.addOverlay(overlays_60k_combined, "60K")

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
    console.log(z);
    if (z >= 13) {
        map.removeLayer(overlay_120kcp)
        console.log("map has unchecked overlay 120k")
        map.addLayer(overlays_60k_combined)
        console.log("map has checked overlay 60k")
    }  else {      
        map.addLayer(overlay_120kcp)
        console.log("map has checked overlay 120k")
        map.removeLayer(overlays_60k_combined)
        console.log("map has unchecked overlay 60k")
    }
}

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
        searchCoords = latlng;
        searchMarker = L.circle(searchCoords, {
            color: "red",
            fillColor: "",
            fillOpacity: 0.5,
            weight: 3,
            radius: 80,
            className: "search-pulse",
        });
        searchMarker.addTo(map);
        map.flyTo(latlng, 16); 
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

// Array of objects, each object containing basin name, full file path, and color on map 
const basins = [
	{
		"name": "Machanao",
		"data":	"./static/data/MachanaoBasin062024RSQUARED.json",
		"color": "#7A8EF5",
	},
	{
		"name": "Upi",
		"data":	"./static/data/UpiBasin062024RSQUARED.json",
		"color": "blue",
	},
	{
		"name": "Mangilao",
		"data":	"./static/data/MangilaoBasin062024RSQUARED.json",
		"color": "red",
	},
	{
		"name": "Finegayan",
		"data": "./static/data/FinegayanBasin062024RSQUARED.json",
		"color": "green",
	},
	{
		"name": "Hagatna",
		"data": "./static/data/HagåtñaBasin062024RSQUARED.json",
        "color": "#FFAA00",
	},
	{
		"name": "Yigo-Tumon",
		"data":	"./static/data/Yigo-TumonBasin062024RSQUARED.json",
        "color": "#73DFFF",
	},
];

// Contains each layer from fetch in layer control
let basinLayers = "Toggle All Basins"; 

getBasins()

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
                
                // Adds GeoJSON layer to map 
                let basin = L.geoJSON(geojson, {
                    pointToLayer: function(feature, latlng) { // Designates custom marker for each well 
                        let svg = getIcon(feature.properties) 
                        // console.log(svg)
                        return L.marker(latlng, {
                            icon: L.divIcon({
                                className: "custom-icon",
                                html: `${svg}`,
                                iconSize: [30, 30],
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

// Function to create icon for point 
function getIcon(point) { // Expected argument: feature.properties 
    // Variables store lastest data values found 
    latestProductionValue = checkLastValue(point.prod_vals) 
    latestChlorideValue = checkLastValue(point.ci_vals)

    // Calls function and passes element at index 0 from array lists 
    let icon = checkProduction(latestChlorideValue[0], latestProductionValue[0]) 
    return icon // Returns SVG string 
}

// Function checks last numerical value from array list 
function checkLastValue(data) {
    let latestData = 0; index = 0 // Initialize variables 

    for (let i = data.length - 1; i >= 0; i--) {
        index = i
        if (data[i] == null) {
            continue;
        } else {
            latestData = data[i];
            break;
        }
    }
    return [latestData, index]; // Returns array list with 2 values: Latest data found and array index of value 
}

// Helper function 
function isNumber(value) {
    return typeof value ==='number';
}

// Function to compare chloride value against a range to determine inner circle color 
// Expects a numerical value as an argument 
// Returns Hex code for color 
function checkChloride(chloride) {

    let chlorideIcon = "";

    const colors = [
        {
            name: "gray",
            hex: "#555555",
            range: "No Data"
        },
        {
            name: "blue",
            hex: "#0070FF",
            range: "(0 - 30]"
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
    } else if (chloride < 1) {
        chlorideIcon = colors[0].hex
    }else if (chloride <= 30) {
        chlorideIcon = colors[1].hex
    } else if (chloride <= 70) {
        chlorideIcon = colors[2].hex
    } else if (chloride <= 150) {
        chlorideIcon = colors[3].hex
    } else if (chloride <=250) {
        chlorideIcon = colors[4].hex
    } else if (chloride <= 300) {
        chlorideIcon = colors[5].hex
    } else if (chloride <= 400) {
        chlorideIcon = colors[6].hex
    } else if (chloride <= 450) {
        chlorideIcon = colors[7].hex
    }

    return chlorideIcon;
}

// Function to assign SVG for icon based on production value 
// Expects 2 numerical values passed through its parameters 
// Returns string containing SVG HTML code 
function checkProduction(chloride, production) {

    let productionIcon = "";

    const outerShapeColors = [
        {
            name: "black",
            hex: "#000000"
        }, 
        {
            name: "light orange",
            hex: "#FFD37F"
        },
        {
            name: "light green",
            hex: "#D3FFBE"
        },
        {
            name: "blue", // default 
            hex: "#0070FF"
        },
        {
            name: "white",
            hex: "#ffffff"
        }
    ]

    // These are the outer shapes 
    // The fill color for the inner circle is assigned by calling the checkChloride() function 
    const shapes = [
        {
            name: "black circle", // Status is inactive 
            svg: `
            <svg width="100%" height="100%" viewBox="0 0 100 98" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g>
                    <path class="outer-shape" d="M94.5596 47.8414C94.5596 72.0543 74.7348 91.6827 50.2798 91.6827C25.8247 91.6827 6 72.0543 6 47.8414C6 23.6284 25.8247 3.99999 50.2798 3.99999C74.7348 3.99999 94.5596 23.6284 94.5596 47.8414Z" fill="${outerShapeColors[0].hex}"/>
                    <path class="outer-shape-outline" d="M94.0596 47.8414C94.0596 71.7735 74.4634 91.1827 50.2798 91.1827C26.0962 91.1827 6.5 71.7735 6.5 47.8414C6.5 23.9093 26.0962 4.49999 50.2798 4.49999C74.4634 4.49999 94.0596 23.9093 94.0596 47.8414Z" stroke="black"/>
                </g>
                <path class="inner-shape" d="M76.9619 47.6222C76.9619 62.4791 64.9179 74.523 50.061 74.523C35.2041 74.523 23.1602 62.4791 23.1602 47.6222C23.1602 32.7652 35.2041 20.7213 50.061 20.7213C64.9179 20.7213 76.9619 32.7652 76.9619 47.6222Z" fill="${checkChloride(chloride)}" stroke="black"/>
            </svg>
            `,
            range: "0"
        },
        {
            name: "orange circle", // Fill color: #FFD37F (outerShapeColors[1].hex)
            svg: `
            <svg width="100%" height="100%" viewBox="0 0 100 98" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g>
                    <path class="outer-shape" d="M94.5596 47.8414C94.5596 72.0543 74.7348 91.6827 50.2798 91.6827C25.8247 91.6827 6 72.0543 6 47.8414C6 23.6284 25.8247 3.99999 50.2798 3.99999C74.7348 3.99999 94.5596 23.6284 94.5596 47.8414Z" fill="${outerShapeColors[1].hex}"/>
                    <path class="outer-shape-outline" d="M94.0596 47.8414C94.0596 71.7735 74.4634 91.1827 50.2798 91.1827C26.0962 91.1827 6.5 71.7735 6.5 47.8414C6.5 23.9093 26.0962 4.49999 50.2798 4.49999C74.4634 4.49999 94.0596 23.9093 94.0596 47.8414Z" stroke="black"/>
                </g>
                <path class="inner-shape" d="M76.9619 47.6222C76.9619 62.4791 64.9179 74.523 50.061 74.523C35.2041 74.523 23.1602 62.4791 23.1602 47.6222C23.1602 32.7652 35.2041 20.7213 50.061 20.7213C64.9179 20.7213 76.9619 32.7652 76.9619 47.6222Z" fill="${checkChloride(chloride)}" stroke="black"/>
            </svg>
            `, 
            range: "(0 - 100]"
        },
        {
            name: "green circle", // Fill color: #D3FFBE (outerShapeColors[2].hex})
            svg: `
            <svg width="100%" height="100%" viewBox="0 0 100 98" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g>
                    <path class="outer-shape" d="M94.5596 47.8414C94.5596 72.0543 74.7348 91.6827 50.2798 91.6827C25.8247 91.6827 6 72.0543 6 47.8414C6 23.6284 25.8247 3.99999 50.2798 3.99999C74.7348 3.99999 94.5596 23.6284 94.5596 47.8414Z" fill="${outerShapeColors[2].hex}"/>
                    <path class="outer-shape-outline" d="M94.0596 47.8414C94.0596 71.7735 74.4634 91.1827 50.2798 91.1827C26.0962 91.1827 6.5 71.7735 6.5 47.8414C6.5 23.9093 26.0962 4.49999 50.2798 4.49999C74.4634 4.49999 94.0596 23.9093 94.0596 47.8414Z" stroke="black"/>
                </g>
                <path class="inner-shape" d="M76.9619 47.6222C76.9619 62.4791 64.9179 74.523 50.061 74.523C35.2041 74.523 23.1602 62.4791 23.1602 47.6222C23.1602 32.7652 35.2041 20.7213 50.061 20.7213C64.9179 20.7213 76.9619 32.7652 76.9619 47.6222Z" fill="${checkChloride(chloride)}" stroke="black"/>
            </svg>
            `, 
            range: "(100 - 200]"
        },
        {
            name: "blue circle", // Fill color: #0070FF (same goes for all polygons) Alt: #3E68FF (outerShapeColors[3].hex)
            svg: `
            <svg width="100%" height="100%" viewBox="0 0 100 98" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g>
                    <path class="outer-shape" d="M94.5596 47.8414C94.5596 72.0543 74.7348 91.6827 50.2798 91.6827C25.8247 91.6827 6 72.0543 6 47.8414C6 23.6284 25.8247 3.99999 50.2798 3.99999C74.7348 3.99999 94.5596 23.6284 94.5596 47.8414Z" fill="${outerShapeColors[3].hex}"/>
                    <path class="outer-shape-outline" d="M94.0596 47.8414C94.0596 71.7735 74.4634 91.1827 50.2798 91.1827C26.0962 91.1827 6.5 71.7735 6.5 47.8414C6.5 23.9093 26.0962 4.49999 50.2798 4.49999C74.4634 4.49999 94.0596 23.9093 94.0596 47.8414Z" stroke="black"/>
                </g>
                <path class="inner-shape" d="M76.9619 47.6222C76.9619 62.4791 64.9179 74.523 50.061 74.523C35.2041 74.523 23.1602 62.4791 23.1602 47.6222C23.1602 32.7652 35.2041 20.7213 50.061 20.7213C64.9179 20.7213 76.9619 32.7652 76.9619 47.6222Z" fill="${checkChloride(chloride)}" stroke="black"/>
            </svg>
            `, 
            range: "(200 - 300]"
        },
        {
            name: "triangle",
            svg: `
            <svg width="100%" height="100%" viewBox="0 0 100 96" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_8_62)">
                <path class="outer-shape" d="M50 4L96.7654 85H3.23463L50 4Z" fill="${outerShapeColors[3].hex}"/>
                <path class="outer-shape-outline" d="M4.10065 84.5L50 5L95.8993 84.5H4.10065Z" stroke="black"/>
            </g>
            <circle class="inner-shape" cx="50.0001" cy="58.0001" r="21.6642" fill="${checkChloride(chloride)}" stroke="black"/>
            </svg>
            `,
            range: "(300 - 400]"
        },
        {
            name: "square",
            svg: `
            <svg width="100%" height="100%" viewBox="0 0 100 96" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_8_54)">
                <path class="outer-shape" d="M92 4L92 88H8V4H92Z" fill="${outerShapeColors[3].hex}"/>
                <path class="outer-shape-outline" d="M91.5 4.5L91.5 87.5H8.5V4.5H91.5Z" stroke="black"/>
            </g>
            <path class="inner-shape" d="M75.54 45.79C75.54 60.0114 64.0114 71.54 49.79 71.54C35.5687 71.54 24.04 60.0114 24.04 45.79C24.04 31.5687 35.5687 20.04 49.79 20.04C64.0114 20.04 75.54 31.5687 75.54 45.79Z" fill="${checkChloride(chloride)}" stroke="black"/>
            </svg>
            `,
            range: "(400 - 500]"
        },
        {
            name: "pentagon",
            svg: `
            <svg width="100%" height="100%" viewBox="0 0 100 97" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_8_58)">
                <path class="outer-shape" d="M49.5 4L93.7241 36.1307L76.832 88.1193H22.168L5.27587 36.1307L49.5 4Z" fill="${outerShapeColors[3].hex}"/>
                <path class="outer-shape-outline" d="M5.86366 36.3217L49.5 4.61803L93.1363 36.3217L76.4688 87.6193H22.5313L5.86366 36.3217Z" stroke="black"/>
            </g>
            <circle class="inner-shape" cx="49.4998" cy="50.5" r="25.1057" fill="${checkChloride(chloride)}" stroke="black"/>
            </svg>
            `,
            range: "(500 - 600]"
        },
        {
            name: "hexagon",
            svg: `
            <svg width="100%" height="100%" viewBox="0 0 100 98" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_8_66)">
                <path class="outer-shape" d="M2 47.7251L25.8626 6.3939L73.5877 6.3939L97.4503 47.7251L73.5877 89.0562L25.8626 89.0562L2 47.7251Z" fill="${outerShapeColors[3].hex}"/>
                <path class="outer-shape-outline" d="M26.1512 88.5562L2.57735 47.7251L26.1512 6.8939L73.299 6.8939L96.8729 47.7251L73.299 88.5562L26.1512 88.5562Z" stroke="black"/>
            </g>
            <circle class="inner-shape" cx="49.5181" cy="47.9326" r="25.4376" fill="${checkChloride(chloride)}" stroke="black"/>
            </svg>
            `,
            range: "(600 - 700]"
        },
        {
            name: "white circle", // high production value - TODO: confirm this 
            svg: `
            <svg width="100%" height="100%" viewBox="0 0 100 98" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g>
                    <path class="outer-shape" d="M94.5596 47.8414C94.5596 72.0543 74.7348 91.6827 50.2798 91.6827C25.8247 91.6827 6 72.0543 6 47.8414C6 23.6284 25.8247 3.99999 50.2798 3.99999C74.7348 3.99999 94.5596 23.6284 94.5596 47.8414Z" fill="${outerShapeColors[4].hex}"/>
                    <path class="outer-shape-outline" d="M94.0596 47.8414C94.0596 71.7735 74.4634 91.1827 50.2798 91.1827C26.0962 91.1827 6.5 71.7735 6.5 47.8414C6.5 23.9093 26.0962 4.49999 50.2798 4.49999C74.4634 4.49999 94.0596 23.9093 94.0596 47.8414Z" stroke="black"/>
                </g>
                <path class="inner-shape" d="M76.9619 47.6222C76.9619 62.4791 64.9179 74.523 50.061 74.523C35.2041 74.523 23.1602 62.4791 23.1602 47.6222C23.1602 32.7652 35.2041 20.7213 50.061 20.7213C64.9179 20.7213 76.9619 32.7652 76.9619 47.6222Z" fill="${checkChloride(chloride)}" stroke="black"/>
            </svg>
            `,
            range: "(700+]"
        },
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
    } else {
        productionIcon = shapes[8].svg
    }

    return productionIcon;
}
