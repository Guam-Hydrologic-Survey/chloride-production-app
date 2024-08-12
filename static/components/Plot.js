/* 
Plot.js
*/

import { plotContentId, resetBtnId } from "./PointInfo.js";
import { checkLastValue } from "./CustomIcon.js";
import { roundDec } from "../utils/roundDec.js";
import { calculateRegression } from "../utils/calculateRegression.js";

export function Plot(data) {
    
    // Array to hold date objects
    const x_dates_conv = [];
    const x_numeric = [];

    // Converts date strings from x_vals to JS date objects 
    for (let i = 0; i < data.x_vals.length; i++) {
        x_dates_conv[i] = new Date(data.x_vals[i]);
        x_numeric[i] = (x_dates_conv[i] - x_dates_conv[0]) / (1000 * 60 * 60 * 24); // days since the first date convert to values
    };

    const y_chloride = data.ci_vals;
    const y_production = data.prod_vals;

    // Calculate the regression line for chloride levels
    const chlorideRegression = calculateRegression(x_numeric, y_chloride);
    const productionRegression = calculateRegression(x_numeric, y_production);

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
        yaxis:"y2",
        marker: {
            color: 'rgb(251,136,33)'
        }
    };

    // Calculate the regression line for chloride levels
    const ciRegLine = {
        x: x_dates_conv,
        y: x_numeric.map(num => chlorideRegression.slope * num + chlorideRegression.intercept),
        type: 'scatter',
        type: 'scatter',
        mode: 'lines',
        name: 'Chloride Regression Line',
        line: {
            color: 'rgb(18, 68, 105)',
            dash: 'dash'
        }
    };

    // Calculate the regression line for production rates
    const prodRegLine = {
        x: x_dates_conv,
        y: x_numeric.map(num => productionRegression.slope * num + productionRegression.intercept),
        type: 'scatter',
        mode: 'lines',
        name: 'Production Regression Line',
        yaxis: "y2",
        line: {
            color: 'rgb(140, 67, 3)',
            dash: 'dash'
        }
    };

    let latestChlorideValue = checkLastValue(data.ci_vals);
    let latestProductionValue = checkLastValue(data.prod_vals);
    
    // TODO - fix date step (ISSUE - moves forward in time instead of backwards)
    // Configuration for selecting data time frame  
    // var selectorOptions = {
    //     buttons: [{
    //         step: 'month',
    //         stepmode: 'backward',
    //         count: 1,
    //         label: '1m'
    //     }, {
    //         step: 'month',
    //         stepmode: 'backward',
    //         count: 6,
    //         label: '6m'
    //     }, {
    //         step: 'year',
    //         stepmode: 'todate',
    //         count: 1,
    //         label: 'YTD'
    //     }, {
    //         step: 'year',
    //         stepmode: 'backward',
    //         count: 1,
    //         label: '1y'
    //     }, {
    //         step: 'all',
    //     }],
    // };

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
            // rangeslider: {},
            type: 'date',
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
        showlegend: true,
        legend: {
            "orientation": "h",
            x: .5,
            xanchor: 'right',
            y: -0.3
        },
        hovermode: "closest",
    };

    var config = {
        scrollZoom: true, 
        displaylogo: false, 
        responsive: true, 
        modeBarButtonsToAdd: ['v1hovermode', 'hovercompare', 'togglespikelines'],
        modeBarButtonsToRemove: ['lasso2d', 'select2d'],
        toImageButtonOptions: {
            format: 'png', // png, svg, jpeg, webp
            filename: `well_${data.name}-chloride_production_plot`,
            height: 500,
            width: 900,
            scale: 5 
        }
    };

    Plotly.newPlot(plotContentId, [chlorideTrace, ciRegLine, productionTrace,prodRegLine], layout, config);

    var annotated = false;

    const viewLatestDataBtn = document.getElementById(resetBtnId);

    // TODO - fix annotation for latest production value 
    // ISSUE - retrieves 
    viewLatestDataBtn .addEventListener('click', () => {
        if (!annotated) {
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
                        text: `<span style="color:rgb(251,136,33);"><b>${roundDec(latestProductionValue[0])} gpm</b></span>`,
                        showarrow: true,
                        showarrow: true,
                        arrowhead: 7,
                        ax: 0,
                        ay: -30
                    },
                ]
            });

            Plotly.relayout(plotContentId, { annotations: layout.annotations });
            viewLatestDataBtn.textContent = 'Reset';
            viewLatestDataBtn.setAttribute("title", "Remove annotations from plot");
        } else {
            Plotly.relayout(plotContentId, { annotations: [] });
            viewLatestDataBtn.textContent = 'Latest Data';
            viewLatestDataBtn.setAttribute("title", "View latest data values for chloride and production");
        }

        annotated = !annotated;
    });
}