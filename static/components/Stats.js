/*
Stats.js
*/

import { statsContentId, modalHeaderTitleId } from "./PointInfo.js";

// Expects 'data' - an object containing statistical attributes 
export function Stats(data) {

    let ciSlope = data.ci_slope;
    let ciIntercept = data.ci_intercept;
    let prodSlope = data.prod_slope;
    let prodIntercept = data.prod_intercept;

    if (ciSlope != "---") {
        ciSlope = data.ci_slope.toFixed(3)
    } 
    if (ciIntercept != "---"){
        ciIntercept = data.ci_intercept.toFixed(3)
    }
    if (prodSlope != "---") {
        prodSlope = data.prod_slope.toFixed(3)
    } 
    if (prodIntercept != "---"){
        prodIntercept = data.prod_intercept.toFixed(3)
    }

    document.getElementById(modalHeaderTitleId).innerHTML = 
    `
    <h4>Well ${data.name} - Chloride & Production (Monthly)</h4>
    `;

    document.getElementById("modal-subheader").innerHTML = 
    `
    <p class="stats-location"> ${data.lat.toFixed(3)}, ${data.lon.toFixed(3)} | ${data.basin} Basin </p>
    `;
    
    document.getElementById(statsContentId).innerHTML = /* html */
    `
    <div class="stats-row">
        <div class="stats-col">
            <p class="stats-text">[CI-] Slope (mg/L/mo)</p>
            <p class="stats-text">[CI-] Intercept (mg/L)</p>
            <p class="stats-text">Production Slope (avg GPM/mo)</p>
            <p class="stats-text">Production Intercept <br>(avg GPM)</p>
            <br>
            <br>
        </div>
        <div class="stats-col">
            <p class="stats-num">${ciSlope}</p>
            <br>
            <p class="stats-num">${ciIntercept}</p>
            <br>
            <p class="stats-num">${prodSlope}</p>
            <br>
            <p class="stats-num">${prodIntercept}</p>
            <br>
        </div>
    </div>
    `;
}