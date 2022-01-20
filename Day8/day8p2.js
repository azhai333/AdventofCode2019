const fs = require('fs');
var Jimp = require('jimp');

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

finalImage = image[0]
finalImage = finalImage.map(n => n.map(m => m = 2))

for (let i = 0; i < image.length; i++) {
    for (let j = 0; j < image[i].length; j++) {
        for (k = 0; k < image[i][j].length; k++) {
            if (image[i][j][k] == 0 || image[i][j][k] == 1) {
                if (finalImage[j][k] == 2) {
                finalImage[j][k] = image[i][j][k]
                }
            }
        }
    }
}

new Jimp(width, height, (err, image) => {
    for (let i = 0; i < finalImage.length; i++) {
        for (let j = 0; j < finalImage[i].length; j++) {
            console.log(i)
            if (finalImage[i][j] == 1) {
                image.setPixelColor(Jimp.rgbaToInt(255, 255, 255, 255), j, i)
            }
        }
    }
    image.write("test.jpg")
  });