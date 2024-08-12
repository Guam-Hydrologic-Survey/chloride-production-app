/* 
PointInfo.js
*/

const modalId = "point-info-modal";
const modalHeaderTitleId = "point-info-header";

const statsContentId = "stats-content";
const plotContentId = "plot-content";

const resetBtnId = "plot-zoom-latest-data";

export function PointInfo(element) {

    element.innerHTML = /*html*/ 
    `
    <div class="modal fade" id="${modalId}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                    <div id="${plotContentId}"></div> <!-- previously #large-plot -->
                    <div class="d-grid mx-auto col-6">
                        <button type="button" class="btn btn-primary" id="${resetBtnId}" title="View latest data values for chloride and production" style="margin: 2px;">Latest Data</button>
                    </div>
                </div>
            </div>
            </div>
        </div>
    </div>
    `;

    document.getElementById(modalId).addEventListener('hidden.bs.modal', () => {
        const resetBtn = document.getElementById(resetBtnId);
        resetBtn.textContent = "Latest Data";
        resetBtn.setAttribute("title", "View latest data values for chloride and production");
    });
}

export { statsContentId, plotContentId, resetBtnId, modalId, modalHeaderTitleId }