/*
Form.js
*/

export function Form(element, inputType, id, layerGroup, inputValue) {

    let div = document.getElementById(element);

    div.innerHTML += /*html*/ 
    `
    <div class="form-check">
        ${Input(inputType, id, layerGroup, inputValue)}
        ${Label(id, value)}
    </div>
    `;
}

function Input(type, id, layerGroup, value) {

    const inputTypes = ["checkbox", "radio"];
    let inputBtn = inputTypes[0];

    if (type == inputTypes[0]) {
        inputBtn = inputTypes[0]; // set as checkbox
    } else {
        inputBtn = inputTypes[1]; // set as radio
    };

    let input = /*html*/
    `
    <input class="form-check-input" type="checkbox" name="${layerGroup}" value="${value}" id="toggle-${id}" checked>
    `;
    return input;
}

function Label(id, name) {
    let label = /*html*/ 
    `
    <label class="form-check-label" for="toggle-${id}">${name}</label>
    `;
    return label;
}
