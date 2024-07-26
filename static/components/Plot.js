/* 
Plot.js
*/

import { plotContentId } from "./PointInfo.js";
import { checkLastValue } from "./CustomIcon.js";

export function Plot(data) {
    
    // Array to hold date objects
    const x_dates_conv = [];

    // Converts date strings from x_vals to JS date objects 
    for (let i = 0; i < data.x_vals.length; i++) {
        x_dates_conv[i] = new Date(data.x_vals[i]);
    };

    // Plots x,y coordinates for enlarged plot
    const chlorideTrace = {
        x: x_dates_conv,
        y: data.ci_vals,
        type: 'scatter', 
        mode: 'markers',
        name: 'Chloride Levels'
    };

    const productionTrace = {
        x: x_dates_conv,
        y: data.prod_vals,
        type: 'scatter', 
        mode: 'markers',
        name: 'Production Rate',
        yaxis:"y2"
    };

    let latestChlorideValue = checkLastValue(data.ci_vals);
    let latestProductionValue = checkLastValue(data.prod_vals);
    
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
    let layout = {
        autosize: false,
        height: 550,
        width: 800,
        margin: {
            "t": 50,
        },
        xaxis: {
            // rangeselector: selectorOptions,
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
        },
        legend: {
              "orientation": "h",
              x: .5,
              xanchor: 'right',
              y: -0.3
        },
        // annotations: [
        //     {
        //         x: x_dates_conv[latestChlorideValue[1]],
        //         y: latestChlorideValue[0],
        //         text: `<b>${latestChlorideValue[0]} [Cl-] mg/L</b>`,
        //         showarrow: true,
        //         visible: false
        //     },
        //     {
        //         x: x_dates_conv[latestProductionValue[1]],
        //         y: latestProductionValue[0], 
        //         text: `<b>${latestProductionValue[0]} gpm</b>`,
        //         showarrow: true,
        //         visible: false
        //     }
        // ]
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

    Plotly.newPlot(plotContentId, [chlorideTrace, productionTrace], layout, {scrollZoom: true, displaylogo: false, responsive: true, modeBarButtonsToRemove: ['lasso2d', 'select2d']}, config);

    var zoomed = false;

    const pointZoomBtn = document.getElementById('plot-zoom-latest-data');

    // TODO - fix annotation for latest production value 
    // ISSUE - retrieves 
    pointZoomBtn.addEventListener('click', () => {
        if (!zoomed) {
            // let update = {
            //     'xaxis.range': [x_dates_conv[latestChlorideValue[1] - 5], x_dates_conv[latestChlorideValue[1] + 5]],
            //     'yaxis.range': [latestChlorideValue[0] - 5, latestChlorideValue[0] + 5]
            // };

            // Plotly.relayout(plotContentId, update);
            Plotly.relayout(plotContentId, { annotations: 
                [
                    {
                        x: x_dates_conv[latestChlorideValue[1]],
                        y: latestChlorideValue[0],
                        xref: 'x',
                        yref: 'y',
                        text: `<span style=" color: rgb(31, 119, 180)"><b>${latestChlorideValue[0]} [Cl-] mg/L</b></span>`,
                        showarrow: true,
                        arrowhead: 7,
                        ax: 0,
                        ay: -30
                    },
                    {
                        x: x_dates_conv[latestProductionValue[1]],
                        y: latestProductionValue[0],
                        text: `<span style="color:rgb(251,136,33);"><b>${latestProductionValue[0]} gpm</b></span>`,
                        showarrow: true,
                        showarrow: true,
                        arrowhead: 7,
                        ax: 0,
                        ay: -30
                    },
                ]
            })

            // layout.annotations[0].visible = true;
            // layout.annotations[1].visible = true;

            console.log(layout.annotations);

            Plotly.relayout(plotContentId, { annotations: layout.annotations });

            pointZoomBtn.textContent = 'Reset zoom';
        } else {
            Plotly.relayout(plotContentId, 'xaxis.autorange', true);
            Plotly.relayout(plotContentId, 'yaxis.autorange', true);

            // layout.annotations[0].visible = false;
            // layout.annotations[1].visible = false;

            Plotly.relayout(plotContentId, { annotations: [] });

            pointZoomBtn.textContent = "Latest data";
        }

        zoomed = !zoomed;
    });
}