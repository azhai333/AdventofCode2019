const fs = require('fs');

let input = fs.readFileSync('./input.txt', {encoding: 'utf8'}).split(',').map(n => parseInt(n));

function part1(noun, verb) {
    let tmp = []
    for (let i = 0; i < input.length; i++) {
    tmp.push(input[i])
    }

    tmp[1] = noun
    tmp[2] = verb

    for (let i = 0; i < tmp.length; i+=4) {
        if (tmp[i] == 1) {
        tmp[tmp[i + 3]] = tmp[tmp[i + 1]] + tmp[tmp[i + 2]]
    } else if (tmp[i] == 2) {
        tmp[tmp[i + 3]] = tmp[tmp[i + 1]] * tmp[tmp[i + 2]]
    } else {
        return tmp[0]
    }
    }
}

for (let i = 0; i < 99; i++) {
    for (let j = 0; j < 99; j++) {
        if (part1(i, j) == 19690720) {
            console.log(j) 
        }
    }
}