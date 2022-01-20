const fs = require('fs');
var _ = require('lodash');

let input = fs.readFileSync('./input.txt', {encoding: 'utf8'}).trim().split('\n');

for (i=0; i<input.length; i++) {
    input[i] = input[i].split(',')

    let xCord = 0
    let yCord = 0
    for (j=0; j<input[i].length; j++) {
        n = Number(input[i][j].substr(1, input[i][j].length - 1))
        if (input[i][j][0] == "R") {
            xCord += n
            input[i][j] = [xCord, yCord]
        }
        if (input[i][j][0] == "L") {
            xCord -= n
            input[i][j] = [xCord, yCord]
        }
        if (input[i][j][0] == "U") {
            yCord += n
            input[i][j] = [xCord, yCord]
        }
        if (input[i][j][0] == "D") {
            yCord -= n
            input[i][j] = [xCord, yCord]
        }
    }
}

var intersection = []
var dist = []

console.log(input)

for (i=0; i<input[0].length; i++) {
    for (j=0; j<input[1].length; j++) {
            if (j + 1 < input[1].length && i + 1 < input[0].length) {
                start = input[0][i][0]
                end = input[0][i + 1][0]
                index1 = 1
                index2 = 0
                letter1 = j
                letter2 = i
                if (start == end) {
                    index1 = 0
                    index2 = 1
                    letter1 = i 
                    letter2 = j
                }
                value = input[index1][letter1][0]
                start = input[index2][letter2][0]
                end = input[index2][letter2 + 1][0]
                value2 = input[index2][letter2][1]
                start2 = input[index1][letter1][1]
                end2 = input[index1][letter1 + 1][1]
                if (_.inRange(value, start, end) == true) {
                    if (_.inRange(value2, start2, end2) == true) {
                        dist.push(Math.abs(input[0][0][0]) + Math.abs(input[0][0][1]) + Math.abs(input[1][0][0]) + Math.abs(input[1][0][1]))
                        
                        sumDist(i, 0)
                        sumDist(j, 1)

                        dist[dist.length-1] += Math.abs(input[0][i][0] - input[1][j][0])
                        dist[dist.length-1] += Math.abs(input[0][i][1] - input[1][j][1])
                        intersection.push([value, value2])
                    }
                } 
            }
    } 
}

part1 = intersection
    .map(arr => arr.reduce((sum, item) => sum += Math.abs(item), 0)).sort((a, b) => a - b)[0];

part2 = dist.sort((a, b) => a - b)[0]

function sumDist(arrayVar, arrayIndex) {
    for (k = 1; k <= arrayVar; k++) {
        if (input[arrayIndex][k][0] == input[arrayIndex][k - 1][0]) {
        dist[dist.length-1] += Math.abs(input[arrayIndex][k][1] - input[arrayIndex][k - 1][1])
        } else {
            dist[dist.length-1] += Math.abs(input[arrayIndex][k][0] - input[arrayIndex][k - 1][0])
        }
    }
}