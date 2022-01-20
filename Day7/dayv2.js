const fs = require('fs');

class intCode {
    constructor() {
        this.code = fs.readFileSync('./inputday7.txt', {encoding: 'utf8'}).split(',').map(n => parseInt(n));
        this.first = true;
        this.i = 0
        this.done = false
      }

    main(phase, output) {
    for (let i = this.i; i < this.code.length; i+=n) {
        var instruction = this.code[i].toString()
        var len = instruction.length
        var n = 4
        for (let j = 0; j < 4 - len; j++) {
            instruction = "0" + instruction
        }
        if (instruction[1] == '0') {
                var value1 = this.code[this.code[i + 1]]
            } else {
                var value1 = this.code[i + 1]
            }
        if (instruction[0] == '0') {
                var value2 = this.code[this.code[i + 2]]
            } else {
                var value2 = this.code[i + 2]
            }
        if (instruction[3] == '1') {
                this.code[this.code[i + 3]] = value1 + value2
        } else if (instruction[3] == '2') {
            this.code[this.code[i + 3]] = value1 * value2
        } else if (instruction[3] == '7') {
            if (value1 < value2) {
                this.code[this.code[i + 3]] = 1
            } else {
                this.code[this.code[i + 3]] = 0
            }
        } else if (instruction[3] == '8') {
            if (value1 == value2) {
                this.code[this.code[i + 3]] = 1
            } else {
                this.code[this.code[i + 3]] = 0
            }
        } else if (instruction[3] == '3') {
            if (this.first == true) {
            this.code[this.code[i + 1]] = phase
            this.first = false
            } else {                
                this.code[this.code[i + 1]] = output
            }
            n = 2
        } else if (instruction[3] == '4') {
            output = value1
            this.i = i + 2
            break
        } else if (instruction[3] == '5') {
            if (value1 !== 0) {
                n = value2 - i
            } else { 
                n = 3
            }
        } else if (instruction[3] == '6') {
            if (value1 == 0) {
                n = value2 - i
            } else {
                n = 3
            }
        }
        if (instruction[2] == '9' && instruction[3] == '9') {
            this.done = true
            break
        }
    }
    return output
}
}

highestSignal = 0
setting = [5, 6, 7, 8, 8]
final = [9, 8, 7, 6, 5]

while (arrayEquals(setting, final) !== true) {
        repeat = true
        while (repeat == true) {
            repeat = false
            for (let i = 4; i >= 0; i--) {
                if (setting[i] < 9) {
                    setting[i]++
                    if (i < 4) {
                        for (let j = i + 1; j <= 4; j++) {
                            setting[j] = 5
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
        ampA = new intCode
        ampB = new intCode
        ampC = new intCode
        ampD = new intCode
        ampE = new intCode

        outputE = 0
        while (ampE.done == false) {  
            outputA = ampA.main(setting[0], outputE)
            outputB = ampB.main(setting[1], outputA)
            outputC = ampC.main(setting[2], outputB)
            outputD = ampD.main(setting[3], outputC)
            outputE = ampE.main(setting[4], outputD)
        }

        if (outputE > highestSignal) {
            highestSignal = outputE
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