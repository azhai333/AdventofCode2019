const fs = require('fs');

let code = fs.readFileSync('./inputday7.txt', {encoding: 'utf8'}).split(',').map(n => parseInt(n));

var n = 4

function intCode(input, output) {
    var first = true
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
            if (first == true) {
            code[code[i + 1]] = input
            first = false
            } else {
                code[code[i + 1]] = output 
            }
            n = 2
        } else if (instruction[3] == '4') {
            output = value1
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
    return output
}

highestSignal = 0
setting = [0, 1, 2, 3, 3]
final = [4, 3, 2, 1, 0]

while (arrayEquals(setting, final) !== true) {
    repeat = true
    signal = 0
    while (repeat == true) {
        repeat = false
           for (let i = 4; i >= 0; i--) {
               if (setting[i] < 4) {
                   setting[i]++
                   if (i < 4) {
                       for (let j = i + 1; j <= 4; j++) {
                           setting[j] = 0
                       }
                   }
                   break
               }
           } 
       for (let i = 0; i < setting.length - 1; i++) {
           for (let j = i; j < setting.length - 1; j++) {
               if (setting[i] == setting[j+1]) {
               repeat = true
               }
           }
       }
    }

     for (let i = 0; i < setting.length; i++) {
         signal = intCode(setting[i], signal)
     }

     if (signal > highestSignal) {
        highestSignal = signal
     }  
}

console.log(highestSignal)   

function arrayEquals(a, b) {
    return (
      Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index])
    );
  }