/*
Basins.js
*/

// Array of objects, each object containing basin name, full file path, and color on map 
const basins = [
	{
		"name": "Machanao",
		"data":	"./static/data/MachanaoBasin062024RSQUARED.json",
		"color": "#7A8EF5",
	},
	{
		"name": "Upi",
		"data":	"./static/data/UpiBasin062024RSQUARED.json",
		"color": "blue",
	},
	{
		"name": "Mangilao",
		"data":	"./static/data/MangilaoBasin062024RSQUARED.json",
		"color": "red",
	},
	{
		"name": "Finegayan",
		"data": "./static/data/FinegayanBasin062024RSQUARED.json",
		"color": "green",
	},
	{
		"name": "Hagatna",
		"data": "./static/data/HagåtñaBasin062024RSQUARED.json",
        "color": "#FFAA00",
	},
	{
		"name": "Yigo-Tumon",
		"data":	"./static/data/Yigo-TumonBasin062024RSQUARED.json",
        "color": "#73DFFF",
	},
];

export { basins }