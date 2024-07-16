/*
Overlay.js
*/

// TODO - might need to export overlays for zoom event: layer change between overlays 
export function CustomOverlay(map, layerControl) {
    // Configuration for custom map image overlay 
    // 120KCP PNG 
    const overlay_120kcp_url = "./static/assets/overlays/120KCP.png"
    const overlay_120kcp_tl = [13.676549220976273, 144.679002534165647]
    const overlay_120kcp_br = [13.4088743, 145.0248265]
    const overlay_120kcp_bounds = L.latLngBounds([overlay_120kcp_tl, overlay_120kcp_br]); 

    const overlayOptions = {
        opacity: 1, 
        interactive: false,
    }

    let overlay_120kcp = L.imageOverlay(overlay_120kcp_url, overlay_120kcp_bounds, overlayOptions)

    overlay_120kcp.addTo(map);

    layerControl.addOverlay(overlay_120kcp, "120K");

    // TODO - combine these two on a zoom level
    // 60KNCP PNG 
    const overlay_60kncp_url = "./static/assets/overlays/60KNCP.png"
    const overlay_60kncp_tl = [13.676121397466535, 144.790949685872050]
    const overlay_60kncp_br = [13.5293066, 144.9788355]
    const overlay_60kncp_bounds = L.latLngBounds([overlay_60kncp_tl, overlay_60kncp_br]);

    let overlay_60kncp = L.imageOverlay(overlay_60kncp_url, overlay_60kncp_bounds, overlayOptions)

    // layerControl.addOverlay(overlay_60kncp, "60KN");

    // 60KSCP PNG 
    const overlay_60kscp_url = "./static/assets/overlays/60KSCP.png"
    const overlay_60kscp_tl = [13.530946619838641, 144.724280522275109]
    const overlay_60kscp_br = [13.4089456, 144.9468201]
    const overlay_60kscp_bounds = L.latLngBounds([overlay_60kscp_tl, overlay_60kscp_br]);

    let overlay_60kscp = L.imageOverlay(overlay_60kscp_url, overlay_60kscp_bounds, overlayOptions)

    // layerControl.addOverlay(overlay_60kscp, "60KS");

    let overlays_60k_combined = L.layerGroup([overlay_60kncp, overlay_60kscp])
    layerControl.addOverlay(overlays_60k_combined, "60K")
}