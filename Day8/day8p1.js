const fs = require('fs');

let input = fs.readFileSync('./inputday8.txt', {encoding: 'utf8'}).split('').map(n => parseInt(n));

image = []
var n = 0
var width = 25
var height = 6
for (let i = 0; i < input.length/(width*height); i++) {
    image.push([])
    for (let j = 0; j < height; j++) {
        image[i].push([])
        for (k = n; k < n + width; k++) {
            image[i][j].push(input[k])
        }
        n = k
    }
}

fewest = image.length
layerStats = []

for (let i = 0; i < image.length; i++) {
    zeroCount = 0
    oneCount = 0
    twoCount = 0
    for (let j = 0; j < image[i].length; j++) {
        for (k = 0; k < image[i][j].length; k++) {
            if (image[i][j][k] == 0) {
                zeroCount++
            }
            if (image[i][j][k] == 1) {
                oneCount++
            }
            if (image[i][j][k] == 2) {
                twoCount++
            }
        }
    }
    if (zeroCount < fewest) {
        output = oneCount * twoCount
        fewest = zeroCount
    }
}

console.log(output)