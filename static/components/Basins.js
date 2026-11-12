/*
Basins.js
*/

const update_date = "2026.11.12";

// Array of objects, each object containing basin name, full file path, and color on map 
const basins = [
	{
		"name": "Machanao",
		"data":	`./static/data/cp_Machanao_${update_date}.json`,
		"color": "#7A8EF5",
	},
	{
		"name": "Upi",
		"data":	`./static/data/cp_Upi_${update_date}.json`,
		"color": "blue",
	},
	{
		"name": "Mangilao",
		"data":	`./static/data/cp_Mangilao_${update_date}.json`,
		"color": "red",
	},
	{
		"name": "Finegayan",
		"data": `./static/data/cp_Finagua'yok_${update_date}.json`,
		"color": "green",
	},
	{
		"name": "Hagåtña",
		"data": `./static/data/cp_Hagåtña_${update_date}.json`,
        "color": "#FFAA00",
	},
	{
		"name": "Yigo-Tumon",
		"data":	`./static/data/cp_Tomhom_${update_date}.json`,
        "color": "#73DFFF",
	},
];

export { basins }