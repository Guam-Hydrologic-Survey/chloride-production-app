/*
Production.js
*/

// TODO - next phase of improvements (for marker configuration on map)

// Function to assign SVG for icon based on production value 
// Expects 2 numerical values passed through its parameters 
// Returns string containing SVG HTML code 
function checkProduction(chloride, production) {

    let productionIcon = "";

    const outerShapeColors = [
        {
            name: "black",
            hex: "#000000"
        }, 
        {
            name: "light orange",
            hex: "#FFD37F"
        },
        {
            name: "light green",
            hex: "#D3FFBE"
        },
        {
            name: "blue", // default 
            hex: "#0070FF"
        },
        {
            name: "white",
            hex: "#ffffff"
        }
    ]

    // These are the outer shapes 
    // The fill color for the inner circle is assigned by calling the checkChloride() function 
    const shapes = [
        {
            name: "black circle", // Status is inactive 
            svg: `
            <svg width="100%" height="100%" viewBox="0 0 100 98" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g>
                    <path class="outer-shape" d="M94.5596 47.8414C94.5596 72.0543 74.7348 91.6827 50.2798 91.6827C25.8247 91.6827 6 72.0543 6 47.8414C6 23.6284 25.8247 3.99999 50.2798 3.99999C74.7348 3.99999 94.5596 23.6284 94.5596 47.8414Z" fill="${outerShapeColors[0].hex}"/>
                    <path class="outer-shape-outline" d="M94.0596 47.8414C94.0596 71.7735 74.4634 91.1827 50.2798 91.1827C26.0962 91.1827 6.5 71.7735 6.5 47.8414C6.5 23.9093 26.0962 4.49999 50.2798 4.49999C74.4634 4.49999 94.0596 23.9093 94.0596 47.8414Z" stroke="black"/>
                </g>
                <path class="inner-shape" d="M76.9619 47.6222C76.9619 62.4791 64.9179 74.523 50.061 74.523C35.2041 74.523 23.1602 62.4791 23.1602 47.6222C23.1602 32.7652 35.2041 20.7213 50.061 20.7213C64.9179 20.7213 76.9619 32.7652 76.9619 47.6222Z" fill="${checkChloride(chloride)}" stroke="black"/>
            </svg>
            `,
            range: "0"
        },
        {
            name: "orange circle", // Fill color: #FFD37F (outerShapeColors[1].hex)
            svg: `
            <svg width="100%" height="100%" viewBox="0 0 100 98" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g>
                    <path class="outer-shape" d="M94.5596 47.8414C94.5596 72.0543 74.7348 91.6827 50.2798 91.6827C25.8247 91.6827 6 72.0543 6 47.8414C6 23.6284 25.8247 3.99999 50.2798 3.99999C74.7348 3.99999 94.5596 23.6284 94.5596 47.8414Z" fill="${outerShapeColors[1].hex}"/>
                    <path class="outer-shape-outline" d="M94.0596 47.8414C94.0596 71.7735 74.4634 91.1827 50.2798 91.1827C26.0962 91.1827 6.5 71.7735 6.5 47.8414C6.5 23.9093 26.0962 4.49999 50.2798 4.49999C74.4634 4.49999 94.0596 23.9093 94.0596 47.8414Z" stroke="black"/>
                </g>
                <path class="inner-shape" d="M76.9619 47.6222C76.9619 62.4791 64.9179 74.523 50.061 74.523C35.2041 74.523 23.1602 62.4791 23.1602 47.6222C23.1602 32.7652 35.2041 20.7213 50.061 20.7213C64.9179 20.7213 76.9619 32.7652 76.9619 47.6222Z" fill="${checkChloride(chloride)}" stroke="black"/>
            </svg>
            `, 
            range: "(0 - 100]"
        },
        {
            name: "green circle", // Fill color: #D3FFBE (outerShapeColors[2].hex})
            svg: `
            <svg width="100%" height="100%" viewBox="0 0 100 98" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g>
                    <path class="outer-shape" d="M94.5596 47.8414C94.5596 72.0543 74.7348 91.6827 50.2798 91.6827C25.8247 91.6827 6 72.0543 6 47.8414C6 23.6284 25.8247 3.99999 50.2798 3.99999C74.7348 3.99999 94.5596 23.6284 94.5596 47.8414Z" fill="${outerShapeColors[2].hex}"/>
                    <path class="outer-shape-outline" d="M94.0596 47.8414C94.0596 71.7735 74.4634 91.1827 50.2798 91.1827C26.0962 91.1827 6.5 71.7735 6.5 47.8414C6.5 23.9093 26.0962 4.49999 50.2798 4.49999C74.4634 4.49999 94.0596 23.9093 94.0596 47.8414Z" stroke="black"/>
                </g>
                <path class="inner-shape" d="M76.9619 47.6222C76.9619 62.4791 64.9179 74.523 50.061 74.523C35.2041 74.523 23.1602 62.4791 23.1602 47.6222C23.1602 32.7652 35.2041 20.7213 50.061 20.7213C64.9179 20.7213 76.9619 32.7652 76.9619 47.6222Z" fill="${checkChloride(chloride)}" stroke="black"/>
            </svg>
            `, 
            range: "(100 - 200]"
        },
        {
            name: "blue circle", // Fill color: #0070FF (same goes for all polygons) Alt: #3E68FF (outerShapeColors[3].hex)
            svg: `
            <svg width="100%" height="100%" viewBox="0 0 100 98" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g>
                    <path class="outer-shape" d="M94.5596 47.8414C94.5596 72.0543 74.7348 91.6827 50.2798 91.6827C25.8247 91.6827 6 72.0543 6 47.8414C6 23.6284 25.8247 3.99999 50.2798 3.99999C74.7348 3.99999 94.5596 23.6284 94.5596 47.8414Z" fill="${outerShapeColors[3].hex}"/>
                    <path class="outer-shape-outline" d="M94.0596 47.8414C94.0596 71.7735 74.4634 91.1827 50.2798 91.1827C26.0962 91.1827 6.5 71.7735 6.5 47.8414C6.5 23.9093 26.0962 4.49999 50.2798 4.49999C74.4634 4.49999 94.0596 23.9093 94.0596 47.8414Z" stroke="black"/>
                </g>
                <path class="inner-shape" d="M76.9619 47.6222C76.9619 62.4791 64.9179 74.523 50.061 74.523C35.2041 74.523 23.1602 62.4791 23.1602 47.6222C23.1602 32.7652 35.2041 20.7213 50.061 20.7213C64.9179 20.7213 76.9619 32.7652 76.9619 47.6222Z" fill="${checkChloride(chloride)}" stroke="black"/>
            </svg>
            `, 
            range: "(200 - 300]"
        },
        {
            name: "triangle",
            svg: `
            <svg width="100%" height="100%" viewBox="0 0 100 96" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_8_62)">
                <path class="outer-shape" d="M50 4L96.7654 85H3.23463L50 4Z" fill="${outerShapeColors[3].hex}"/>
                <path class="outer-shape-outline" d="M4.10065 84.5L50 5L95.8993 84.5H4.10065Z" stroke="black"/>
            </g>
            <circle class="inner-shape" cx="50.0001" cy="58.0001" r="21.6642" fill="${checkChloride(chloride)}" stroke="black"/>
            </svg>
            `,
            range: "(300 - 400]"
        },
        {
            name: "square",
            svg: `
            <svg width="100%" height="100%" viewBox="0 0 100 96" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_8_54)">
                <path class="outer-shape" d="M92 4L92 88H8V4H92Z" fill="${outerShapeColors[3].hex}"/>
                <path class="outer-shape-outline" d="M91.5 4.5L91.5 87.5H8.5V4.5H91.5Z" stroke="black"/>
            </g>
            <path class="inner-shape" d="M75.54 45.79C75.54 60.0114 64.0114 71.54 49.79 71.54C35.5687 71.54 24.04 60.0114 24.04 45.79C24.04 31.5687 35.5687 20.04 49.79 20.04C64.0114 20.04 75.54 31.5687 75.54 45.79Z" fill="${checkChloride(chloride)}" stroke="black"/>
            </svg>
            `,
            range: "(400 - 500]"
        },
        {
            name: "pentagon",
            svg: `
            <svg width="100%" height="100%" viewBox="0 0 100 97" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_8_58)">
                <path class="outer-shape" d="M49.5 4L93.7241 36.1307L76.832 88.1193H22.168L5.27587 36.1307L49.5 4Z" fill="${outerShapeColors[3].hex}"/>
                <path class="outer-shape-outline" d="M5.86366 36.3217L49.5 4.61803L93.1363 36.3217L76.4688 87.6193H22.5313L5.86366 36.3217Z" stroke="black"/>
            </g>
            <circle class="inner-shape" cx="49.4998" cy="50.5" r="25.1057" fill="${checkChloride(chloride)}" stroke="black"/>
            </svg>
            `,
            range: "(500 - 600]"
        },
        {
            name: "hexagon",
            svg: `
            <svg width="100%" height="100%" viewBox="0 0 100 98" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_8_66)">
                <path class="outer-shape" d="M2 47.7251L25.8626 6.3939L73.5877 6.3939L97.4503 47.7251L73.5877 89.0562L25.8626 89.0562L2 47.7251Z" fill="${outerShapeColors[3].hex}"/>
                <path class="outer-shape-outline" d="M26.1512 88.5562L2.57735 47.7251L26.1512 6.8939L73.299 6.8939L96.8729 47.7251L73.299 88.5562L26.1512 88.5562Z" stroke="black"/>
            </g>
            <circle class="inner-shape" cx="49.5181" cy="47.9326" r="25.4376" fill="${checkChloride(chloride)}" stroke="black"/>
            </svg>
            `,
            range: "(600 - 700]"
        },
        {
            name: "white circle", // high production value - TODO: confirm this 
            svg: `
            <svg width="100%" height="100%" viewBox="0 0 100 98" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g>
                    <path class="outer-shape" d="M94.5596 47.8414C94.5596 72.0543 74.7348 91.6827 50.2798 91.6827C25.8247 91.6827 6 72.0543 6 47.8414C6 23.6284 25.8247 3.99999 50.2798 3.99999C74.7348 3.99999 94.5596 23.6284 94.5596 47.8414Z" fill="${outerShapeColors[4].hex}"/>
                    <path class="outer-shape-outline" d="M94.0596 47.8414C94.0596 71.7735 74.4634 91.1827 50.2798 91.1827C26.0962 91.1827 6.5 71.7735 6.5 47.8414C6.5 23.9093 26.0962 4.49999 50.2798 4.49999C74.4634 4.49999 94.0596 23.9093 94.0596 47.8414Z" stroke="black"/>
                </g>
                <path class="inner-shape" d="M76.9619 47.6222C76.9619 62.4791 64.9179 74.523 50.061 74.523C35.2041 74.523 23.1602 62.4791 23.1602 47.6222C23.1602 32.7652 35.2041 20.7213 50.061 20.7213C64.9179 20.7213 76.9619 32.7652 76.9619 47.6222Z" fill="${checkChloride(chloride)}" stroke="black"/>
            </svg>
            `,
            range: "(700+]"
        },
    ];

    if (production == null) {
        productionIcon = shapes[0].svg
    } else if (production < 1) {
        productionIcon = shapes[0].svg
    } else if (production <= 100) {
        productionIcon = shapes[1].svg
    } else if (production <= 200) {
        productionIcon = shapes[2].svg
    } else if (production <= 300) {
        productionIcon = shapes[3].svg
    } else if (production <= 400) {
        productionIcon = shapes[4].svg
    } else if (production <= 500) {
        productionIcon = shapes[5].svg
    } else if (production <= 600) {
        productionIcon = shapes[6].svg
    } else if (production <= 700) {
        productionIcon = shapes[7].svg
    } else {
        productionIcon = shapes[8].svg
    }

    return productionIcon;
}