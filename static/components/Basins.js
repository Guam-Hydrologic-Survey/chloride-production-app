/*
Basins.js
*/

// Array of objects, each object containing basin name, full file path, and color on map 
const basins = [
	{
		"name": "Finegayan",
		"data": "./static/data/finegayanBasinV2.json",
        "color": "green",
	},
	{
		"name": "Hagatna",
		"data": "./static/data/hagatnaBasinV2.json",
        "color": "#FFAA00",
	},
	{
		"name": "Machanao",
		"data":	"./static/data/machanaoBasinV2.json",
        "color": "#7A8EF5",
	},
	{
		"name": "Mangilao",
		"data":	"./static/data/mangilaoBasinV2.json",
        "color": "red",
	},
	{
		"name": "Upi",
		"data":	"./static/data/upiBasinV2.json",
        "color": "blue",
	},
	{
		"name": "Yigo-Tumon",
		"data":	"./static/data/yigoTumonBasinV2.json",
        "color": "#73DFFF",
	},
];

export { basins }