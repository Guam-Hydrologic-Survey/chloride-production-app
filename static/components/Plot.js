/* 
Plot.js
*/

import { plotContentId } from "./PointInfo.js";

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

    Plotly.newPlot(plotContentId, [chlorideTrace, productionTrace], layout, {scrollZoom: true, displaylogo: false, responsive: true, modeBarButtonsToRemove: ['lasso2d', 'select2d']}, config);
}