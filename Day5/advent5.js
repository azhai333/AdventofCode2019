const fs = require('fs');

let code = fs.readFileSync('./inputday5.txt', {encoding: 'utf8'}).split(',').map(n => parseInt(n));

var input = 5
var n = 4
for (let i = 0; i < code.length-1; i+=n) {
    instruction = code[i].toString()
    len = instruction.length
    n = 4
    for (let j = 0; j < 4 - len; j++) {
        instruction = "0" + instruction
    }
    if (instruction[1] == '0') {
            value1 = code[code[i + 1]]
        } else {
            value1 = code[i + 1]
        }
    if (instruction[0] == '0') {
            value2 = code[code[i + 2]]
        } else {
            value2 = code[i + 2]
        }
    if (instruction[3] == '1') {
            code[code[i + 3]] = value1 + value2
    } else if (instruction[3] == '2') {
        code[code[i + 3]] = value1 * value2
    } else if (instruction[3] == '7') {
        if (value1 < value2) {
            code[code[i + 3]] = 1
        } else {
            code[code[i + 3]] = 0
        }
    } else if (instruction[3] == '8') {
        if (value1 == value2) {
            code[code[i + 3]] = 1
        } else {
            code[code[i + 3]] = 0
        }
    } else if (instruction[3] == '3') {
        code[code[i + 1]] = input
        n = 2
    } else if (instruction[3] == '4') {
        console.log(value1)
        n = 2
    } else if (instruction[3] == '5') {
        if (value1 !== 0) {
            n = Math.abs(value2 - i)
        } else { 
            n = 3
        }
    } else if (instruction[3] == '6') {
        if (value1 == 0) {
            n = Math.abs(value2 - i)
        } else {
            n = 3
        }
    }
    if (instruction[2] == '9' && instruction[3] == '9') {
        break
    }
}