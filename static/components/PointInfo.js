/* 
PointInfo.js
*/

const modalId = "point-info-modal";
const modalHeaderTitleId = "point-info-header";
const statsContentId = "stats-content";
const plotContentId = "plot-content";

export function PointInfo(element) {

    element.innerHTML = /*html*/ 
    `
    <div class="modal fade" id="point-info-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl modal-dialog-centered">
            <div class="modal-content">
            <div class="modal-header">
                <!-- <h4 class="modal-title-plot" id="exampleModalLabel"></h4> -->
                <span id="${modalHeaderTitleId}"></span>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div id="modal-subheader">
            </div>
            <div class="modal-body">
                <div id="${statsContentId}"></div> <!-- previously #modal-body-content -->
                <div class="vl"></div>
                <div>
                    <button type="button" class="btn btn-primary" id="plot-zoom-latest-data">Latest Data</button>
                    <div id="${plotContentId}"></div> <!-- previously #large-plot -->
                </div>
            </div>
            </div>
        </div>
    </div>
    `;
}

export { statsContentId, plotContentId, modalId, modalHeaderTitleId }