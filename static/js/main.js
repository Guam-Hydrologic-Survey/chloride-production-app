//center of guam
const center = [13.5435056,144.7478083];

// Creates Leaflet map 
const map = L.map('map', {
    center: center,
    zoom: 12,
    zoomControl: false,
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
	attribution: 'Tiles &copy; Esri' + devs,
})

// ESRI World Topo Map 
const ewtm = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: baseLayersZoom, 
	attribution: 'Tiles &copy; Esri' + devs,
});

// ESRI World Imagery 
const ewi = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: baseLayersZoom,
	attribution: 'Tiles &copy; Esri' + devs,
}); 

// ESRI World Gray Canvas 
var ewgc = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri' + devs,
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
        name: 'Production Rate',
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

// array of objects, each object containing basin name, full file path, and color on map 
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

//contain each layer from fetch in layer control
let basinLayers = "Toggle All Basins"; 

// for loop to traverse through basins array list and fetch file from the given data property 
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
            } // end of getWellInfo function
            
            let basin = L.geoJSON(geojson, {
                pointToLayer: function(feature, latlng) {
                    return L.circleMarker(latlng, {
                        // configure options 
                        radius: 8,
                        fillColor: basins[i].color, // color is based on object property in basins array 
                        weight: 1,
                        fillOpacity: 1,
                        color: "black", // marker outline 
                        opacity: 1.0,
                    });
                }, 
                onEachFeature: getWellInfo,
            });

            basin.addTo(map);

            // TODO - add toggle for each layer in layer control 

            layerControl.addOverlay(basin, `${basins[i].name} Basin`, basinLayers);
        }); // end of fetch 
} // end of for-loop
