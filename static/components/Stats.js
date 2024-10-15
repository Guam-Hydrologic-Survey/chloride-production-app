/*
Stats.js
*/

import { statsContentId, modalHeaderTitleId } from "./PointInfo.js";

// Expects 'data' - an object containing statistical attributes 
export function Stats(data) {

    let ciSlope = data.ci_slope;
    let ciRSquared = data.ci_rsquared;
    let prodSlope = data.prod_slope;
    let prodRsquared = data.prod_rsquared;

    if (ciSlope != "---") {
        ciSlope = data.ci_slope.toFixed(3)
    } 
    if (ciRSquared != "---"){
        ciRSquared = data.ci_rsquared.toFixed(3)
    }
    if (prodSlope != "---") {
        prodSlope = data.prod_slope.toFixed(3)
    } 
    if (prodRsquared != "---"){
        prodRsquared = data.prod_rsquared.toFixed(3)
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
            <p class="stats-text">+[CI-] Slope (mg/L/mo)</p>
            <p class="stats-text">[CI-] R<sup>2</sup></p>
            <p class="stats-text">+Production Slope (GPM/mo)</p>
            <p class="stats-text">Production R<sup>2</sup></p>
            <br>
            <br>
        </div>
        <div class="stats-col">
            <br>
            <p class="stats-num">${ciSlope}</p>
            <p class="stats-num">${ciRSquared}</p>
            <br>
            <p class="stats-num">${prodSlope}</p>
            <p class="stats-num">${prodRsquared}</p>
        
        </div>
    </div>
    `;
}