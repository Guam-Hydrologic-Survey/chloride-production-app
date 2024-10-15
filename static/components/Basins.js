/*
Basins.js
*/

// Array of objects, each object containing basin name, full file path, and color on map 
const basins = [
	{
		"name": "Machanao",
		"data":	"./static/data/MachanaoBasin10162024RSQUARED.json",
		"color": "#7A8EF5",
	},
	{
		"name": "Upi",
		"data":	"./static/data/UpiBasin10162024RSQUARED.json",
		"color": "blue",
	},
	{
		"name": "Mangilao",
		"data":	"./static/data/MangilaoBasin10162024RSQUARED.json",
		"color": "red",
	},
	{
		"name": "Finegayan",
		"data": "./static/data/FinegayanBasin10162024RSQUARED.json",
		"color": "green",
	},
	{
		"name": "Hagåtña",
		"data": "./static/data/HagåtñaBasin10162024RSQUARED.json",
        "color": "#FFAA00",
	},
	{
		"name": "Yigo-Tumon",
		"data":	"./static/data/Yigo-TumonBasin10162024RSQUARED.json",
        "color": "#73DFFF",
	},
];

export { basins }