/*
Summary.js
*/

import { roundDec } from "../utils/roundDec.js";
 
// TODO - testing stage only, to be configured when data is ready
export function Summary(element) {

    element.innerHTML = /*html*/
    `
    <div class="offcanvas offcanvas-start rounded shadow bg-body" data-bs-scroll="true" tabindex="-1" id="summary" aria-labelledby="offcanvasWithBothOptionsLabel" data-bs-backdrop="false">
      <div class="offcanvas-header">
        <h3 class="offcanvas-title" id="summary-offcanvas-title">Summary</h3>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>

      <div class="offcanvas-body">
        <h5 class="summary-offcanvas-subtitle">2024 Overview</h5>
        <hr>
        ${createTable(1, basins)}
        <br>
        <h5 class="summary-offcanvas-subtitle">History</h5>
        <hr>
        ${createAccordion(basins)}
      </div>

    </div>
    `;
}

function createAccordion(basins) {
    const accordId = "accordionExample";
    let accordItems = "";
    
    basins.forEach((basin, index) => {
      accordItems += accordionItem(basin, index)
    })
  
    let accord = `
    <div class="accordion" id="${accordId}">
      ${accordItems}
    <div>
    `;
  
    return accord;
}

function accordionItem(basin, index) {
  let ai = /*html*/ `
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-basin-${index}" aria-expanded="true" aria-controls="collapse-basin-${index}">
      ${basin.basin} Basin
      </button>
    </h2>
    <div id="collapse-basin-${index}" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div class="accordion-body">
      ${createTable(2, basin.history)}
      </div>
    </div>
  </div>
  `;

  return ai
}

// headers for summary for current year 
const headers1 = ["Basin", "Total Production", "Production Weighted Average Chloride"];

// headers for production history
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

// // retrieve data 
// function getSummary(headers) {
//   let basins = []
//   fetch("./static/data/summaryHistory.json")
//     .then(response => response.json()) 
//     .then(summaryHistory => {
//       for (let i = 0; i < summaryHistory.basins.length; i++) {
//         basins.push(summaryHistory.basins[i]);
//       }
//       createTable(basins, headers);
//     })
// };
  
// creates BS table, calls table functions, returns table html
function createTable(displayType, basins) {
  // console.log(theaders.length)
  let table = ``;
  if (displayType == 1) { // 1 means summary for current year
    table += `
    <table class="table table-hover">
    <thead><tr>${tableHeaders(headers1)}</tr></thead>
    <tbody class="table-group-divider">${tableBodySummary(basins)}</tbody>
    <tfoot class="table-group-divider">${tableFooter(basins, headers1)}</tfoot>
    </table>`;
  } else { // create table for history 
    table += `
    <table class="table table-hover">
    <thead><tr>${tableHeaders(headers2)}</tr></thead>
    <tbody class="table-group-divider">${tableBodyHistory(basins)}</tbody>
    </table>`;
  }
  return table
}

// creates header for table, uses h constant (TODO - h needs to be defined --> change to function)
function tableHeaders(theaders) {
  // console.log(theaders)
    let tr = ""
    for (let i = 0; i < theaders.length; i++) {
        tr += `<th scope="col">${theaders[i]}</th>`
    }
    return tr
}

// creates table's body: each row containing basin's name, current total prod value, and production weighted avg chloride
function tableBodySummary(basins) {
    let tb = ""
    for (let i = 0; i < basins.length; i++) {
        let tr = `
        <tr>
        <th scope="row">${basins[i].basin}</th>
        <td>${roundDec(basins[i].current_prod_avg.p)}</td>
        <td>${roundDec(basins[i].current_prod_avg.pwac)}</td>
        </tr>
        `
        tb += tr
    }
    return tb
}

function tableBodyHistory(basinsHistory) {
  let tb = ""
  for (let i = 0; i < basinsHistory.years.length; i++) {
    let tr = `
    <tr>
    <th scope="row">${basinsHistory.years[i]}</th>
    <td>${roundDec(basinsHistory.prod[i])}</td>
    </tr>
    `;
    tb += tr
}
return tb
}

// creates the last row of the table, containing the totals 
function tableFooter(basins, theaders) {
    let tf = ""
    let sums = getSum(basins)
    for (let i = 0; i < theaders.length; i++) {
        if (i == 0) { tf += `<th scope="row">Totals</th>`; }
        else { tf += `<td>${roundDec(sums[i - 1])}</td>` }
    } 
    return tf
}

// utility/helper function, computes sum of a given array
function getSum(basins) {
    let sums = [0 , 0]
    for (let i = 0; i < basins.length; i++) {
        sums[0] += basins[i].current_prod_avg.p
        sums[1] += basins[i].current_prod_avg.pwac
    }
    return sums
} 