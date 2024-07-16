/*
Chloride.js
*/

// TODO - next phase of improvements (for marker configuration on map)
const colors = [
    {
        name: "blue",
        hex: "#0070FF",
        range: "[0 - 30]"
    },
    {
        name: "green",
        hex: "#55FF00",
        range: "(30 - 70]"
    },
    {
        name: "yellow",
        hex: "#FFFF01",
        range: "(70 - 150]"
    },
    {
        name: "orange",
        hex: "#FFAA00",
        range: "(150 - 250]"
    },
    {
        name: "red",
        hex: "#FF0000",
        range: "(250 - 300]"
    },
    {
        name: "magenta",
        hex: "#A50080",
        range: "(300 - 400]"
    },
    {
        name: "purple",
        hex: "#73004C",
        range: "(400 - 450]"
    }
];

function checkChloride(chlorideValue) {
    let chlorideIcon = "";

    if (chloride == null) {
        chlorideIcon = colors[0].hex
    } else if (chloride <= 30) {
        chlorideIcon = colors[0].hex
    } else if (chloride <= 70) {
        chlorideIcon = colors[1].hex
    } else if (chloride <= 150) {
        chlorideIcon = colors[2].hex
    } else if (chloride <=250) {
        chlorideIcon = colors[3].hex
    } else if (chloride <= 300) {
        chlorideIcon = colors[4].hex
    } else if (chloride <= 400) {
        chlorideIcon = colors[5].hex
    } else if (chloride <= 450) {
        chlorideIcon = colors[6].hex
    }

    return chlorideIcon;
}

export { colors }