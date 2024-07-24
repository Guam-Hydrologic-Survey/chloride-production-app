/*
Summary.js
*/

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
        ${createTable()}
        <br>
        <h5 class="summary-offcanvas-subtitle">History</h5>
        <hr>
        ${createTable()}
      </div>

    </div>
    `;
}

// dummy data 
let basins = [
    {
      basin: "b1",
      status: {
        active: 1,
        inactive: 0
      },
      current_prod_avg: {
        p: 1,
        pwac: 1
      },
      history: {
        years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023],
        pwac: [1, 2, 3, 4, 5, 6, 7, 8, 9]
      }
    },
    {
      basin: "b2",
      status: {
        active: 1,
        inactive: 0
      },
      current_prod_avg: {
        p: 2,
        pwac: 2
      },
      history: {
        years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023],
        pwac: [1, 2, 3, 4, 5, 6, 7, 8, 9]
      }
    },
    {
      basin: "b3",
      status: {
        active: 1,
        inactive: 0
      },
      current_prod_avg: {
        p: 3,
        pwac: 3
      },
      history: {
        years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023],
        pwac: [1, 2, 3, 4, 5, 6, 7, 8, 9]
      }
    },
    {
      basin: "b4",
      status: {
        active: 1,
        inactive: 0
      },
      current_prod_avg: {
        p: 4,
        pwac: 4
      },
      history: {
        years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023],
        pwac: [1, 2, 3, 4, 5, 6, 7, 8, 9]
      }
    },
  ]
  
// constants 
let tot_prod = 0
let tot_pwac = 0

// table headers 
let h = ["Basin", "Total Production", "Production Weighted Average Chloride"]

let headers2 = [];

  
// creates BS table, calls table functions, returns table html
function createTable() {
    let table = `
    <table class="table table-hover">
    <thead><tr>${tableHeaders(h)}</tr></thead>
    <tbody class="table-group-divider">${tableBody()}</tbody>
    <tfoot class="table-group-divider">${tableFooter()}</tfoot>
    </table>`;
    return table
}

// creates header for table, uses h constant (TODO - h needs to be defined --> change to function)
function tableHeaders(theaders) {
    let tr = ""
    for (let i = 0; i < theaders.length; i++) {
        tr += `<th scope="col">${theaders[i]}</th>`
    }
    return tr
}

// creates table's body: each row containing basin's name, current total prod value, and production weighted avg chloride
function tableBody() {
    let tb = ""
    for (let i = 0; i < basins.length; i++) {
        let tr = `
        <tr>
        <th scope="row">${basins[i].basin}</th>
        <td>${basins[i].current_prod_avg.p}</td>
        <td>${basins[i].current_prod_avg.pwac}</td>
        </tr>
        `
        tb += tr
    }
    return tb
}

// creates the last row of the table, containing the totals 
function tableFooter() {
    let tf = ""
    let sums = getSum()
    for (let i = 0; i < h.length; i++) {
        if (i == 0) { tf += `<th scope="row">Totals</th>`; }
        else { tf += `<td>${sums[i - 1]}</td>` }
    } 
    return tf
}

// utility/helper function, computes sum of a given array
function getSum() {
    let sums = [0 , 0]
    for (let i = 0; i < basins.length; i++) {
        sums[0] += basins[i].current_prod_avg.p
        sums[1] += basins[i].current_prod_avg.pwac
    }
    return sums
} 