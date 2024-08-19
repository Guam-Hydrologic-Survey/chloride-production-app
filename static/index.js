/* 
index.js 
Description: Point of entry for JS files. Calls on each component to append elements (map, modals, offcanvas) to the page. 
*/

// components 
import { NavBar } from "./components/NavBar.js";
import { About } from "./components/About.js";
import { LMap } from "./components/LMap.js";
import { Summary } from "./components/Summary_v5.js";
import { Legend } from "./components/Legend_v3.js";
import { PointInfo } from "./components/PointInfo.js";

document.getElementById("app").innerHTML = /*html*/
`
<div id="nav-bar"></div>
<div id="about-modal"></div>
<div id="legend-offcanvas"></div>
<div id="summary-offcanvas"></div>
<div id="map"></div>
<div id="point-info"></div>
`;

NavBar(document.getElementById("nav-bar"));
About(document.getElementById("about-modal"));
Legend(document.getElementById("legend-offcanvas"));
Summary(document.getElementById("summary-offcanvas"));
PointInfo(document.getElementById("point-info"));
LMap(document.getElementById("map"));