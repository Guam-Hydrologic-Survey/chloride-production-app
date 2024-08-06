/* 
About.js
*/

export function About(element) {
    element.innerHTML = /*html*/ 
    `
    <!-- Bootstrap Modal for About  -->
    <!-- TODO Edit about text about chloride and production -->
    <!-- TODO Annotate on bottom questionable data removed due to possible human error -->
    <div class="modal fade" id="about" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-4" id="about-modal-title">About</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>Obtaining comprehensive data on water quality and production rates is crucial for effective water resource management. Chloride concentration data is an essential parameter for assessing the water quality, compliance with regulations, and pump rate management. The Northern Guam Lens Aquifer (NGLA), which serves as Guam's primary source of utility water, plays a critical role in sustaining the island's water supply. Within this aquifer lie numerous wells, their pump rates are regularly monitored with respect to chloride due to saltwater intrusion or updraw. Management of utility water production requires quick access to time-series graph of production and chloride for each of the 100 wells that produce about a total of 40 MGD. 
            <br><br> WERI's MAppFx platform offers an interactive map environment on a web page, enabling users to retrieve graphs of specific sites by clicking on map features such as points, polygons, or lines. MAppFx is a data visualization tool that incorporates a user-friendly interface, empowering users and stakeholders to make informed decisions regarding water resource management. The growing presence of online web applications with mapping and graphing features offers an opportunity to revolutionize hydrologic data analysis, enabling users to visualize complex datasets and derive valuable insights for decision-making. 
            <br><br>The use of this dataset to develop these responsive features expands the interagency web map products and is now available on the Guam Hydrologic Survey (GHS) website (guamhydrologicsurvey.uog.edu), Guam’s online repository of pertinent hydrologic information established by Guam’s public laws. With the established website and new online interactive interface technology available, the GHS Information Management Team are now inclined to pursue the expansion of hydrologic web products and field survey database. The ever-growing GHS website product is a true testament to interagency collaboration, a great means of hydrologic information, dissemination, and scientific information source for aquifer management. 
            </p>
          </div>
          <div class="modal-footer about-btns">
            <!-- Example single danger button -->
            <div class="btn-group">
              <button type="button" class="btn btn-success dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                Data
              </button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="./static/data/CPDB_2023_Questionable_Data_Removed.xlsx" target="_blank" rel="noreferrer noopener" title="Download Excel sheet">Questionable Data Removed</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="https://guamhydrologicsurvey.uog.edu/index.php/data/cpdb/" target="_blank" rel="noreferrer noopener" title="GHS Chloride & Production Database">Chloride & Production Database</a></li>
              </ul>
            </div>

            <!-- Dropdown for links to associated TRs -->
            <div class="btn-group">
              <button type="button" class="btn btn-primary" title="WERI TR ### (Authors, Year)">WERI Technical Report</button>
              <button type="button" class="btn btn-primary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false" title="View associated technical reports">
                <span class="visually-hidden">Toggle Dropdown</span>
              </button>
              <ul class="dropdown-menu">
                <li class="dropdown-item">Associated Technical Reports</li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="https://ghs-cdn.uog.edu/wp-content/databases/Library/PDFs/WERI%20TR%2098%20-%20McDonald%20&%20Jenson%202003.pdf" target="_blank" rel="noreferrer noopener" title="Chloride History and Trends of Water Production Wells in the Northern Guam Lens Aquifer">WERI TR 98 (McDonald & Jenson, 2003)</a></li>
                <li><a class="dropdown-item" href="https://ghs-cdn.uog.edu/wp-content/databases/CPDB/SimardEtAl2015-SalinityNorthernGuamLensAquifer,TR143,WERIUOG.pdf" target="_blank" rel="noreferrer noopener" title="Salinity in the Northern Guam Lens Aquifer">WERI TR 143 (Simard et al., 2015)</a></li>
                <li><a class="dropdown-item" href="https://ghs-cdn.uog.edu/wp-content/databases/Library/PDFs/TRs/WERI%20TR%20177%20-%20Ko%20et%20al%202022.pdf" target="_blank" rel="noreferrer noopener" title="Geospatial and Temporal Analysis of Patterns and Trends in Salinity in Finegayan Basin">WERI TR 177 (Ko et al., 2022)</a></li>
                <li><a class="dropdown-item" href="https://ghs-cdn.uog.edu/wp-content/databases/Library/PDFs/TRs/WERI%20TR%20178%20-%20Ko%20et%20al%202023.pdf" target="_blank" rel="noreferrer noopener" title="Geospatial and Temporal Analysis of Patterns and Trends in Salinity in Yigo-Tumon Basin">WERI TR 178 (Ko et al., 2023)</a></li>
              </ul>
            </div>
            <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Map Series
              </button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="https://guamhydrologicsurvey.uog.edu/index.php/mappfx/" title="GHS MAppFx Library">MAppFx Library</a></li>
                <li><a class="dropdown-item" href="https://guamhydrologicsurvey.uog.edu/index.php/interagency-maps/" title="GHS Interagency Maps">Interagency Maps</a></li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </div>
    `;
}