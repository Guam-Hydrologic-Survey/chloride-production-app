/*
Basins.js
*/

// Array of objects, each object containing basin name, full file path, and color on map 
const basins = [
	{
		"name": "Machanao",
		"data":	"./static/data/MachanaoBasin092026.json",
		"color": "#7A8EF5",
	},
	{
		"name": "Upi",
		"data":	"./static/data/UpiBasin092026.json",
		"color": "blue",
	},
	{
		"name": "Mangilao",
		"data":	"./static/data/MangilaoBasin092026.json",
		"color": "red",
	},
	{
		"name": "Finegayan",
		"data": "./static/data/Finagua'yokBasin092026.json",
		"color": "green",
	},
	{
		"name": "Hagåtña",
		"data": "./static/data/HagåtñaBasin092026.json",
        "color": "#FFAA00",
	},
	{
		"name": "Yigo-Tumon",
		"data":	"./static/data/TomhomBasin092026.json",
        "color": "#73DFFF",
	},
];

export { basins }