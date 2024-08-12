/* 
MarkerPopup.js
Description: Creates the popup when clicking on a point on the map. This popup contains basin information about the well and the button to view the timeseries plot for chloride and production data. 
*/

import { modalId } from "./PointInfo.js";

// Expects 'well' and 'basin' (both are string values containing the name of the well and the basin it resides in)
// Returns 'pop' a string containing the HTML element for the marker popup 
export function MarkerPopup(well, basin) {
    let popup = /*html*/ `
    <div id="marker-content-container">
        <span id="marker-well-name">Well ${well}</span> 
        <br> 
        <span id="marker-basin-name">${basin} Basin</span>
    </div>
    <br>
    <div class="d-flex justify-content-center">
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#${modalId}" title="View statistics and time series plot">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff"><path d="m105-233-65-47 200-320 120 140 160-260 109 163q-23 1-43.5 5.5T545-539l-22-33-152 247-121-141-145 233ZM863-40 738-165q-20 14-44.5 21t-50.5 7q-75 0-127.5-52.5T463-317q0-75 52.5-127.5T643-497q75 0 127.5 52.5T823-317q0 26-7 50.5T795-221L920-97l-57 57ZM643-217q42 0 71-29t29-71q0-42-29-71t-71-29q-42 0-71 29t-29 71q0 42 29 71t71 29Zm89-320q-19-8-39.5-13t-42.5-6l205-324 65 47-188 296Z"/></svg>
            View Data
        </button>                
    </div>
    `;
    return popup;
}