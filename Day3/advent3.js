const fs = require('fs');
var _ = require('lodash');
const manhattan = require('manhattan');



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
            xCord -= n
            input[i][j] = [xCord, yCord]
        }
    }
}

input[1] = [[8, 0], [8, 5], [3, 5], [3, 2]]
input[0] = [[0, 7], [6, 7], [6, 3], [2, 3]]


var intersection = []

for (i=0; i<input[0].length; i++) {
    for (j=0; j<input[1].length; j++) {
            if (j + 1 < input[1].length && i + 1 < input[0].length) {
                value = input[0][i][0]
                start = input[1][j][0]
                end = input[1][j + 1][0]
            
            if (_.inRange(value, start, end) == true || value == start && value == end) {
                value2 = input[1][j][1]
                start2 = input[0][i][1]
                end2 = input[0][i + 1][1]
                if (_.inRange(value2, start2, end2) == true || value2 == start2 && value2 == end2) {
                    if (start == end) {
                    intersection.push([input[1][j][0], input[0][i][1]])
                    }
                }
            } 
            value = input[1][j][0]
            start = input[0][i][0]
            end = input[0][i + 1][0]

            if (_.inRange(value, start, end) == true || value == start && value == end) {
                value2 = input[0][i][1]
                start2 = input[1][j][1]
                end2 = input[1][j + 1][1]
                if (_.inRange(value2, start2, end2) == true || value2 == start2 && value2 == end2) {
                    intersection.push([value, value2])
                }
            }
            value = input[0][i][1]
            start = input[1][j][1]
            end = input[1][j + 1][1]

            if (_.inRange(value, start, end) == true) {
                value2 = input[0][i][0]
                start2 = input[1][j][0]
                end2 = input[1][j + 1][0]
                if (_.inRange(value2, start2, end2) == true) {
                    intersection.push([value, value2])
                }
            }

            }
    } 
}

output = intersection
    .map(arr => manhattan([0, 0], arr)).sort((a, b) => a - b)[0];

console.log(output)

