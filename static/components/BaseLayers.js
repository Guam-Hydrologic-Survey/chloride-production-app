/*
BaseLayers.js 
Description: Contains the constants of Leaflet map tiles to be used in the layer control for the base maps. 
Parameters: 'map' - the object for the Leaflet map 
Returns: 'baseLayers' - an object containing Leaflet tile layers
*/

export function BaseLayers(map) {

    // WERI-GHS attribution 
    const devs = "MWZapata, DKValerio, JACaasi, MCSnaer & NCHabana"
    const year = 2024;
    const weriLogo = `<img src="./static/assets/WERI-Logo.ico" style="height:20px; width:18px; display:inline-block; margin-right:2px; margin-bottom: 2px;/>`;
    const attr = ` | <a href="https://weri.uog.edu/">WERI</a>-<a href="https://guamhydrologicsurvey.uog.edu/">GHS</a>: ${devs} (${year})`;

    // map.addEventListener("click", function (event) {
    //     console.log(map.getCenter());
    //     return false;
    // });

    const baseLayersZoom = 16;

    // Open Street Map layer
    const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: baseLayersZoom, 
        attribution: '© OpenStreetMap' + attr,
    }).addTo(map)

    // ESRI World Street Map 
    const ewsp = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: baseLayersZoom,
        attribution: 'Tiles &copy; Esri' + attr,
    })

    // ESRI World Topo Map 
    const ewtm = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: baseLayersZoom, 
        attribution: 'Tiles &copy; Esri' + attr,
    });

    // ESRI World Imagery 
    const ewi = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: baseLayersZoom,
        attribution: 'Tiles &copy; Esri' + attr,
    }); 

    // ESRI World Gray Canvas 
    const ewgc = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri' + attr,
        maxZoom: baseLayersZoom
    });

    const baseLayers = {
        'Open Street Map': osm,
        'ESRI World Imagery': ewi,
        'ESRI World Topo Map': ewtm,
        'ESRI World Street Map': ewsp,
        'ESRI World Gray Canvas': ewgc,
    }
    
    return baseLayers;
}