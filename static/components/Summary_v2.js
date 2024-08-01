/*
Summary_v2.js
Description: An updated version of the summary table, which include a table summarizing the production rate of the current year. Each row of the table can be expanded to view the selected basin's production history. 
*/


// utils 
import { roundDec } from "../utils/roundDec.js";
 
// TODO - testing stage only, to be configured when data is ready
// TODO - add units for production values in cells 
export function Summary(element) {

    element.innerHTML = /*html*/
    `
    <div class="offcanvas offcanvas-start rounded shadow bg-body" data-bs-scroll="true" tabindex="-1" id="summary" aria-labelledby="offcanvasWithBothOptionsLabel" data-bs-backdrop="false">
      <div class="offcanvas-header">
        <h3 class="offcanvas-title" id="summary-offcanvas-title">Summary</h3>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>

      <div class="offcanvas-body">
        ${createTable(basins)}
      </div>

    </div>
    `;
}

// Headers for summary for current year
const headers1 = ["Basin", "Total Production", "Production Weighted Average Chloride"];

// Headers for production history
const headers2 = ["Years", "Total Production"];

const basins = [
  {
      "basin": "Machanao",
      "status": {
          "inactive": 0,
          "active": 2
      }, 
      "current_prod_avg": {
          "p": 0.3666576,
          "pwac": 73.0607956851297
      }, 
      "history": {
          "years": [
              2014,
              2015,
              2016,
              2017,
              2018,
              2019,
              2020,
              2021,
              2022,
              2023,
              2024
              ], 
          "prod": [
              0.919336020225294,
              0.805734318996416,
              0.840411897787665,
              0.682881835637481,
              1.13546626386777,
              1.15359105236934,
              1.15701389556196,
              1.11910355177931,
              1.01868,
              0.9521304,
              0.3666576
              ]
      }
  },
  {
      "basin": "Upi",
      "status": {
          "inactive": 0,
          "active": 2
      }, 
      "current_prod_avg": {
          "p": 0.4773492,
          "pwac": 67.5830146986734
      }, 
      "history": {
          "years": [
              2014,
              2015,
              2016,
              2017,
              2018,
              2019,
              2020,
              2021,
              2022,
              2023,
              2024
              ], 
          "prod": [
              1.09329297491039,
              1.47126128752304,
              1.58307866001894,
              1.03251442117127,
              1.74351301732634,
              1.64957649906234,
              1.41054154186751,
              1.61608845327701,
              1.68852,
              1.3178328,
              0.4773492
              ]
      }
  },
  {
      "basin": "Mangilao",
      "status": {
          "inactive": 1,
          "active": 6
      }, 
      "current_prod_avg": {
          "p": 0.6909564,
          "pwac": 78.0590208007336
      }, 
      "history": {
          "years": [
              2014,
              2015,
              2016,
              2017,
              2018,
              2019,
              2020,
              2021,
              2022,
              2023,
              2024
              ], 
          "prod": [
              1.85117012800819,
              1.69263362694636,
              1.62149308012315,
              1.0498791858679,
              1.74296173009473,
              2.06281670191004,
              1.95514216637622,
              2.04522113147081,
              1.99872,
              1.584042,
              0.6909564
              ]
      }
  },
  {
      "basin": "Finegayan",
      "status": {
          "inactive": 0,
          "active": 16
      }, 
      "current_prod_avg": {
          "p": 2.1831216,
          "pwac": 96.4616323708217
      }, 
      "history": {
          "years": [
              2014,
              2015,
              2016,
              2017,
              2018,
              2019,
              2020,
              2021,
              2022,
              2023,
              2024
              ], 
          "prod": [
              4.23590650793651,
              4.27865348950269,
              3.88577909113219,
              2.76846062832821,
              4.40820446162314,
              4.61681570565842,
              3.85130124249166,
              3.89625851690348,
              4.13592,
              4.0863996,
              2.1831216
              ]
      }
  },
  {
      "basin": "Hagåtña",
      "status": {
          "inactive": 7,
          "active": 24
      }, 
      "current_prod_avg": {
          "p": 3.5400672,
          "pwac": 115.732658818236
      }, 
      "history": {
          "years": [
              2014,
              2015,
              2016,
              2017,
              2018,
              2019,
              2020,
              2021,
              2022,
              2023,
              2024
              ], 
          "prod": [
              7.47973691756272,
              7.74530259381464,
              7.74881521106777,
              4.97084752587813,
              7.55898303570533,
              7.94391448859151,
              7.44514093848288,
              8.47667498465822,
              8.6958,
              7.9559892,
              3.5400672
              ]
      }
  },
  {
      "basin": "Yigo-Tumon",
      "status": {
          "inactive": 11,
          "active": 55
      }, 
      "current_prod_avg": {
          "p": 8.1136068,
          "pwac": 84.8549396946164
      }, 
      "history": {
          "years": [
              2014,
              2015,
              2016,
              2017,
              2018,
              2019,
              2020,
              2021,
              2022,
              2023,
              2024
              ], 
          "prod": [
              20.0811731285202,
              18.9653865628335,
              18.9297285128564,
              12.7688379345302,
              19.3499004736932,
              19.6940547411233,
              19.172834471963,
              19.3046071693019,
              19.27488,
              17.9056956,
              8.1136068
              ]
      }
  }
];

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