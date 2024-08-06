/*
Summary_v3.js
Description: An updated version of the summary table, which fetches the JSON for the summary-history data and creates a table summarizing the production rate of the current year. Each row of the table can be expanded to view the selected basin's production history. 
*/

// utils 
import { roundDec } from "../utils/roundDec.js";
 
// TODO - testing stage only, to be configured when data is ready (pending confirmation of numbers)
// TODO - add units for production values in cells 
export function Summary(element) {
    getSummaryHistoryData()
        .then(table => {
            element.innerHTML = /*html*/
            `
            <div class="offcanvas offcanvas-start rounded shadow bg-body" data-bs-scroll="true" tabindex="-1" id="summary" aria-labelledby="offcanvasWithBothOptionsLabel" data-bs-backdrop="false">
            <div class="offcanvas-header">
                <h3 class="offcanvas-title" id="summary-offcanvas-title">Summary</h3>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>

            <div class="offcanvas-body">
                ${table}
                <br>
                <p style="font-style: italic;">History of Chloride Concentrations from January 1973 to December 2022</p>
                <iframe 
                    width="365" 
                    height="221" 
                    src="https://www.youtube-nocookie.com/embed/4SoeZWt8Sp8?si=flWfWL_S2ujPFs87" 
                    title="YouTube video player" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerpolicy="strict-origin-when-cross-origin" 
                    allowfullscreen>
                </iframe>
            </div>

            </div>
            `;
        });
}

// Headers for summary for current year
const headers1 = ["Basin", "Production (GPM)", "Weighted Average Chloride (mg/L)"];

// Headers for history
const headers2 = ["Years", "Production (GPM)", "Weighted Average Chloride (mg/L)"];

// Retrieves JSON for summary-history data and calls upon createTable() function 
// Returns response with call to createTable() function 
function getSummaryHistoryData() {
    return fetch("./static/data/summaryHistory.json")
        .then(response => response.json())
        .then(data => {
            return createTable(data.basins)
        });
}

// Creates BootStrap table, calls table functions 
// Expects "basins" - an array list containing basin objects 
// Returns "table" - a string containing the HTML element for a table 
function createTable(basins) {
    let table = /*html*/ `
    <table class="table">
        <caption>
            <i>
                <i class="bi bi-info-circle-fill"></i> Click on a <strong>basin</strong> to view its average total production rate history.
            </i>
        </caption>
        <thead><tr>${tableHeaders(headers1)}</tr></thead>
        <tbody class="table-group-divider">${tableBodySummary(basins)}</tbody>
        <tfoot class="table-group-divider">${tableFooter(basins, headers1)}</tfoot>
    </table>
    `;
    return table;
}

// Creates header for table 
// Expects "theaders" - an array list containing strings (must be in order of appearance for table columns) 
// Returns "th" - a string containing the HTML element for the table headers 
function tableHeaders(theaders) {
    let th =``;
    theaders.forEach((theader) => {
        th += `<th scope="col">${theader}</th>`;
    });
    return th;
}

// Creates table's body: 
// - Two parts: "tr_sum" (a row containing basin's name, current total prod value, and production weighted avg chloride) and "tr_hist" (a row containing the production history of a basin)
// - "tr_sum" is what displayed for the user and toggles the view for "tr_hist"
// Expects "basins" - an array list containing objects of basins 
// Returns "tb" - a string containing HTML elements for the table body 
function tableBodySummary(basins) {
    let tb = ``;
    basins.forEach((basin, index) => {
        let targetId = `row-basin-${index}`;
        let tr_sum = /*html*/ `
        <tr data-bs-toggle="collapse" data-bs-target="#${targetId}" class="collapse-row" aria-controls="${targetId}">
            <th scope="row" class="toggle-basin-history" title="${basin.basin} Basin">${basin.basin}</th>
            <td>${roundDec(basin.current_prod_avg.p)}</td>
            <td>${roundDec(basin.current_prod_avg.pwac)}</td>
        </tr>
        `;

        let tr_hist = /*html*/ `
        <tr id="${targetId}" class="collapse animate__animated animate__fadeInLeft">
            <td colspan="4">
                <div class="card card-body">
                    <p><i>Production History</i></p>
                    <table class="table table-hover table-sm table-striped">
                        <thead><tr>${tableHeaders(headers2)}</tr></thead>
                        <tbody class="table-group-divider">${tableBodyHistory(basin.history)}</tbody>
                    </table>
                </div>
            </td>
        </tr>
        `;

        tb += tr_sum + tr_hist;
    });
    return tb;
}

// Creates the table body for the basin's total production history 
// Expects "basinsHistory" - object from the basins array list 
// Returns "tb" - a string containing the HTML elements for the table body 
function tableBodyHistory(basinsHistory) {
    let tb = ``;
    for (let i = 0; i < basinsHistory.years.length; i++) {
        let tr = /*html*/ `
        <tr>
            <th scope="row">${basinsHistory.years[i]}</th>
            <td>${roundDec(basinsHistory.prod[i])}</td>
        </tr>
        `;
        tb += tr;
    }
    return tb;
}

// Creates the last row of the table, which contains the sums 
// Expects "basins" (an array list of basin objects) and "theaders" (an array list containing strings, must be ordered in appearance for table columns) 
// Returns "tr" - a string containing the HTML for the table footer 
function tableFooter(basins, theaders) {
    let tf = ""
    let sums = getSum(basins)
    for (let i = 0; i < theaders.length; i++) {
        if (i == 0) { tf += `<th scope="row">Totals</th>`; }
        else { tf += `<td>${roundDec(sums[i - 1])}</td>` }
    } 
    return tf;
}

// Utility/helper function that computes sum of a given array 
// Expects "basins" - an array list of basin objects 
// Returns "sums" - an array containing two numerical values, the totals for the production average and production weighted average chloride 
function getSum(basins) {
    // Sum index values = [total for production average, total for production weighted average chloride]
    let sums = [0 , 0]
    basins.forEach((basin) => {
        sums[0] += basin.current_prod_avg.p;
        sums[1] += basin.current_prod_avg.pwac;
    });
    return sums;
} 