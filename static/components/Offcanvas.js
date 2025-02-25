/* 
Offcanvas.js
*/


// TODO - create general offcanvas, where certain elements can be altered/appended to, such as the offcanvas id, header, and body 
export function Offcanvas(id, body) {

    let offcanvas = /*html*/ 
    `
    <div class="offcanvas offcanvas-start offcanvas-size-sm rounded shadow bg-body" data-bs-scroll="true" tabindex="-1" id="${id}" aria-labelledby="offcanvasWithBothOptionsLabel" data-bs-backdrop="false">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel"></h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <h3>Legend</h3>
        <hr>
        ${body}
      </div>
    </div>
    `;

    return offcanvas;
}