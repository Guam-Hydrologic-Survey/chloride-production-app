/*
TitleCard.js
*/

export function TitleCard(map) {

    // Update path to title card 
    const img_path = "./static/assets/WERI_MappFx_Chloride_And_Production_Title_Card_White_Bold.png";

    const mapTitle = L.control({position: 'topleft'});

    mapTitle.onAdd =  function(map) {
        this._div = L.DomUtil.create('div', 'mapTitle'); 
        this._div.innerHTML = `<img src="${img_path}" height="150">`;
        return this._div;
    };

    mapTitle.addTo(map);
}