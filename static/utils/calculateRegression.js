/*
calculateRegression.js
*/


export function calculateRegression(x, y) {
    // Filter out pairs where y is null or undefined
    const filteredData = x.map((xi, i) => ({ x: xi, y: y[i] }))
                           .filter(point => point.y !== null && point.y !== undefined);
    
    // Extract filtered x and y arrays
    const filteredX = filteredData.map(point => point.x);
    const filteredY = filteredData.map(point => point.y);
    
    const n = filteredX.length;
    if (n === 0) {
        throw new Error('Insufficient data for regression analysis');
    }
    
    const sumX = filteredX.reduce((a, b) => a + b, 0);
    const sumY = filteredY.reduce((a, b) => a + b, 0);
    const sumXY = filteredX.reduce((acc, xi, i) => acc + xi * filteredY[i], 0);
    const sumXX = filteredX.reduce((acc, xi) => acc + xi * xi, 0);

    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    return { slope, intercept };
}