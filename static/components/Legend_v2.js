/*
Legend.js
*/

// TODO - cleanup and use constants for marker color and shapes (from Chloride and Production components)
export function Legend(element) {

    let chlorideId = "chloride-range";
    let productionId = "production-range";
  
    element.innerHTML = /*html*/ 
    `
    <!-- Bootstrap Offcanvas for Legend -->
    <div class="offcanvas offcanvas-start offcanvas-size-sm rounded shadow bg-body" data-bs-scroll="true" tabindex="-1" id="legend" aria-labelledby="offcanvasWithBothOptionsLabel" data-bs-backdrop="false">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel"></h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <h3>Legend</h3>
        <hr>
        <div id="${chlorideId}"></div>
        <div id="${productionId}"></div>
      </div>
    </div>
    `;
  
    legend(chlorideId, productionId);
  }
  
  function legend(chlorideId, productionId) {
    let chl = document.getElementById(chlorideId) 
    chl.innerHTML = /*html*/
    `
    <h5>Salinity</h5>
    <p>[Cl-] mg/L</p>
    `;
  
    let prod = document.getElementById(productionId)
    prod.innerHTML = /*html*/
    `
    <br>
    <h5>Production</h5>
    <p>gpm</p>
    <hr>
    `;
  
    const chloridePath = "./static/data/chlorideRange.json"
    const productionPath = "./static/data/productionRange.json"
    const shapesPath = "./static/data/shapes.json"
  
    fetch(chloridePath)
        .then(response => response.json())
        .then(json =>  {
            let data = json.chlorideRange
            for (let i = 0; i < data.length; i++) {
                // chl.innerHTML += `${JSON.stringify(data[i])}<br>`
                chl.innerHTML += /*html*/ `
                <div class="chloride-range-item">
                  <button type="button" class="btn"  data-bs-toggle="button">
                      <?xml version="1.0" encoding="UTF-8"?>
                      <svg id="circle-icon-svg" width="20px" height="24px" stroke-width="2" viewBox="0 0 24 20" fill="${data[i].hex}" xmlns="http://www.w3.org/2000/svg" color="#ffffff">
                          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#000" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"></path>
                      </svg>
                      ${data[i].range}
                  </button>
                  <!--
                  <?xml version="1.0" encoding="UTF-8"?>
                  <svg id="circle-icon-svg" width="32px" height="32px" stroke-width="2" viewBox="0 0 24 24" fill="${data[i].hex}" xmlns="http://www.w3.org/2000/svg" color="#ffffff">
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#000" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"></path>
                  </svg>
                  ${data[i].range}
                  -->
                </div>
                <br>
                `;
            }
        });
  
        const height = 34
        const width = 34
        const viewboxHeight = 100
        const viewboxWidth = 100
    
        const shapes = [
            {
                name: "black circle", // Status is inactive 
                svg: `
                <svg width="${width}px" height="${height}px" viewBox="0 0 ${viewboxWidth} ${viewboxHeight}" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g>
                        <path class="outer-shape" d="M94.5596 47.8414C94.5596 72.0543 74.7348 91.6827 50.2798 91.6827C25.8247 91.6827 6 72.0543 6 47.8414C6 23.6284 25.8247 3.99999 50.2798 3.99999C74.7348 3.99999 94.5596 23.6284 94.5596 47.8414Z" fill="#000000"/>
                        <path class="outer-shape-outline" d="M94.0596 47.8414C94.0596 71.7735 74.4634 91.1827 50.2798 91.1827C26.0962 91.1827 6.5 71.7735 6.5 47.8414C6.5 23.9093 26.0962 4.49999 50.2798 4.49999C74.4634 4.49999 94.0596 23.9093 94.0596 47.8414Z" stroke="black"/>
                    </g>
                    <path class="inner-shape" d="M76.9619 47.6222C76.9619 62.4791 64.9179 74.523 50.061 74.523C35.2041 74.523 23.1602 62.4791 23.1602 47.6222C23.1602 32.7652 35.2041 20.7213 50.061 20.7213C64.9179 20.7213 76.9619 32.7652 76.9619 47.6222Z" fill="#D9D9D9" stroke="black"/>
                </svg>
                `,
                range: "0"
            },
            {
                name: "orange circle", // Fill color: #FFD37F (outerShapeColors[1].hex)
                svg: `
                <svg width="${width}px" height="${height}px" viewBox="0 0 ${viewboxWidth} ${viewboxHeight}" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g>
                        <path class="outer-shape" d="M94.5596 47.8414C94.5596 72.0543 74.7348 91.6827 50.2798 91.6827C25.8247 91.6827 6 72.0543 6 47.8414C6 23.6284 25.8247 3.99999 50.2798 3.99999C74.7348 3.99999 94.5596 23.6284 94.5596 47.8414Z" fill="#FFD37F"/>
                        <path class="outer-shape-outline" d="M94.0596 47.8414C94.0596 71.7735 74.4634 91.1827 50.2798 91.1827C26.0962 91.1827 6.5 71.7735 6.5 47.8414C6.5 23.9093 26.0962 4.49999 50.2798 4.49999C74.4634 4.49999 94.0596 23.9093 94.0596 47.8414Z" stroke="black"/>
                    </g>
                    <path class="inner-shape" d="M76.9619 47.6222C76.9619 62.4791 64.9179 74.523 50.061 74.523C35.2041 74.523 23.1602 62.4791 23.1602 47.6222C23.1602 32.7652 35.2041 20.7213 50.061 20.7213C64.9179 20.7213 76.9619 32.7652 76.9619 47.6222Z" fill="#D9D9D9" stroke="black"/>
                </svg>
                `, 
                range: "(0 - 100]"
            },
            {
                name: "green circle", // Fill color: #D3FFBE (outerShapeColors[2].hex})
                svg: `
                <svg width="${width}px" height="${height}px" viewBox="0 0 ${viewboxWidth} ${viewboxHeight}" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g>
                        <path class="outer-shape" d="M94.5596 47.8414C94.5596 72.0543 74.7348 91.6827 50.2798 91.6827C25.8247 91.6827 6 72.0543 6 47.8414C6 23.6284 25.8247 3.99999 50.2798 3.99999C74.7348 3.99999 94.5596 23.6284 94.5596 47.8414Z" fill="#D3FFBE"/>
                        <path class="outer-shape-outline" d="M94.0596 47.8414C94.0596 71.7735 74.4634 91.1827 50.2798 91.1827C26.0962 91.1827 6.5 71.7735 6.5 47.8414C6.5 23.9093 26.0962 4.49999 50.2798 4.49999C74.4634 4.49999 94.0596 23.9093 94.0596 47.8414Z" stroke="black"/>
                    </g>
                    <path class="inner-shape" d="M76.9619 47.6222C76.9619 62.4791 64.9179 74.523 50.061 74.523C35.2041 74.523 23.1602 62.4791 23.1602 47.6222C23.1602 32.7652 35.2041 20.7213 50.061 20.7213C64.9179 20.7213 76.9619 32.7652 76.9619 47.6222Z" fill="#D9D9D9" stroke="black"/>
                </svg>
                `, 
                range: "(100 - 200]"
            },
            {
                name: "blue circle", // Fill color: #0070FF (same goes for all polygons) Alt: #3E68FF (outerShapeColors[3].hex)
                svg: `
                <svg width="${width}px" height="${height}px" viewBox="0 0 ${viewboxWidth} ${viewboxHeight}" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g>
                        <path class="outer-shape" d="M94.5596 47.8414C94.5596 72.0543 74.7348 91.6827 50.2798 91.6827C25.8247 91.6827 6 72.0543 6 47.8414C6 23.6284 25.8247 3.99999 50.2798 3.99999C74.7348 3.99999 94.5596 23.6284 94.5596 47.8414Z" fill="#0070FF"/>
                        <path class="outer-shape-outline" d="M94.0596 47.8414C94.0596 71.7735 74.4634 91.1827 50.2798 91.1827C26.0962 91.1827 6.5 71.7735 6.5 47.8414C6.5 23.9093 26.0962 4.49999 50.2798 4.49999C74.4634 4.49999 94.0596 23.9093 94.0596 47.8414Z" stroke="black"/>
                    </g>
                    <path class="inner-shape" d="M76.9619 47.6222C76.9619 62.4791 64.9179 74.523 50.061 74.523C35.2041 74.523 23.1602 62.4791 23.1602 47.6222C23.1602 32.7652 35.2041 20.7213 50.061 20.7213C64.9179 20.7213 76.9619 32.7652 76.9619 47.6222Z" fill="#D9D9D9" stroke="black"/>
                </svg>
                `, 
                range: "(200 - 300]"
            },
            {
                name: "triangle",
                svg: `
                <svg width="${width}px" height="${height}px" viewBox="0 0 ${viewboxWidth} ${viewboxHeight}" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_d_8_62)">
                    <path class="outer-shape" d="M50 4L96.7654 85H3.23463L50 4Z" fill="#0070FF"/>
                    <path class="outer-shape-outline" d="M4.10065 84.5L50 5L95.8993 84.5H4.10065Z" stroke="black"/>
                </g>
                <circle class="inner-shape" cx="50.0001" cy="58.0001" r="21.6642" fill="#D9D9D9" stroke="black"/>
                </svg>
                `,
                range: "(300 - 400]"
            },
            {
                name: "square",
                svg: `
                <svg width="${width}px" height="${height}px" viewBox="0 0 ${viewboxWidth} ${viewboxHeight}" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_d_8_54)">
                    <path class="outer-shape" d="M92 4L92 88H8V4H92Z" fill="#0070FF"/>
                    <path class="outer-shape-outline" d="M91.5 4.5L91.5 87.5H8.5V4.5H91.5Z" stroke="black"/>
                </g>
                <path class="inner-shape" d="M75.54 45.79C75.54 60.0114 64.0114 71.54 49.79 71.54C35.5687 71.54 24.04 60.0114 24.04 45.79C24.04 31.5687 35.5687 20.04 49.79 20.04C64.0114 20.04 75.54 31.5687 75.54 45.79Z" fill="#D9D9D9" stroke="black"/>
                </svg>
                `,
                range: "(400 - 500]"
            },
            {
                name: "pentagon",
                svg: `
                <svg width="${width}px" height="${height}px" viewBox="0 0 ${viewboxWidth} ${viewboxHeight}" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_d_8_58)">
                    <path class="outer-shape" d="M49.5 4L93.7241 36.1307L76.832 88.1193H22.168L5.27587 36.1307L49.5 4Z" fill="#0070FF"/>
                    <path class="outer-shape-outline" d="M5.86366 36.3217L49.5 4.61803L93.1363 36.3217L76.4688 87.6193H22.5313L5.86366 36.3217Z" stroke="black"/>
                </g>
                <circle class="inner-shape" cx="49.4998" cy="50.5" r="25.1057" fill="#D9D9D9" stroke="black"/>
                </svg>
                `,
                range: "(500 - 600]"
            },
            {
                name: "hexagon",
                svg: `
                <svg width="${width}px" height="${height}px" viewBox="0 0 ${viewboxWidth} ${viewboxHeight}" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_d_8_66)">
                    <path class="outer-shape" d="M2 47.7251L25.8626 6.3939L73.5877 6.3939L97.4503 47.7251L73.5877 89.0562L25.8626 89.0562L2 47.7251Z" fill="#0070FF"/>
                    <path class="outer-shape-outline" d="M26.1512 88.5562L2.57735 47.7251L26.1512 6.8939L73.299 6.8939L96.8729 47.7251L73.299 88.5562L26.1512 88.5562Z" stroke="black"/>
                </g>
                <circle class="inner-shape" cx="49.5181" cy="47.9326" r="25.4376" fill="#D9D9D9" stroke="black"/>
                </svg>
                `,
                range: "(600 - 700]"
            },
            {
                name: "white circle", // high production value - TODO: confirm this 
                svg: `
                <svg width="${width}px" height="${height}px" viewBox="0 0 ${viewboxWidth} ${viewboxHeight}" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g>
                        <path class="outer-shape" d="M94.5596 47.8414C94.5596 72.0543 74.7348 91.6827 50.2798 91.6827C25.8247 91.6827 6 72.0543 6 47.8414C6 23.6284 25.8247 3.99999 50.2798 3.99999C74.7348 3.99999 94.5596 23.6284 94.5596 47.8414Z" fill="#FFFFFF"/>
                        <path class="outer-shape-outline" d="M94.0596 47.8414C94.0596 71.7735 74.4634 91.1827 50.2798 91.1827C26.0962 91.1827 6.5 71.7735 6.5 47.8414C6.5 23.9093 26.0962 4.49999 50.2798 4.49999C74.4634 4.49999 94.0596 23.9093 94.0596 47.8414Z" stroke="black"/>
                    </g>
                    <path class="inner-shape" d="M76.9619 47.6222C76.9619 62.4791 64.9179 74.523 50.061 74.523C35.2041 74.523 23.1602 62.4791 23.1602 47.6222C23.1602 32.7652 35.2041 20.7213 50.061 20.7213C64.9179 20.7213 76.9619 32.7652 76.9619 47.6222Z" fill="#D9D9D9" stroke="black"/>
                </svg>
                `,
                range: "700+"
            },
        ];
  
    // Adds svg and ranges to HTML container 
    for (let i = 0; i < shapes.length; i++) {
        if (shapes[i].range == 0) {
            prod.innerHTML += /*html*/
            `
            <div class="production-range-item">
                ${shapes[i].svg}
                ${shapes[i].range} (inactive)
                <br>
            </div>
            `;
            continue
        } 
        prod.innerHTML += /*html*/
        `
        <div class="production-range-item">
            ${shapes[i].svg}
            ${shapes[i].range}
            <br>
        </div>
        `;
    }
  } 