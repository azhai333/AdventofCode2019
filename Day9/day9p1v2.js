const fs = require('fs');

class intCode {
    constructor() {
        this.code = fs.readFileSync('./inputday9.txt', {encoding: 'utf8'}).split(',').map(n => parseInt(n));
        this.first = true;
        this.i = 0
        this.base = 0
      }

    main(input) {
        for (let i = this.i; i < this.code.length; i+=n) {
            var instruction = this.code[i].toString()
            var len = instruction.length
            var n = 4
            var index;
            for (let j = 0; j < 4 - len; j++) {
                instruction = "0" + instruction
            }
            //console.log(this.code)

            if (instruction[1] == '0') {
                    index = this.code[i + 1]
                    var value1 = this.code[index]
                } else if (instruction[1] == '1') {
                    var value1 = this.code[i + 1]
                } else {
                    index = this.base + this.code[i + 1]
                    var value1 = this.code[index]
                    //console.log(value1)
                }
            if (instruction[3] !== "3" && instruction[3] !== "4" && instruction[3] !== "9") {
                if (instruction[0] == '0') {
                    index = this.code[i + 2]
                    var value2 = this.code[index]
                    } else if (instruction[0] == '1') {
                        var value2 = this.code[i + 2]
                    } else {
                        index = this.base + this.code[i + 2]
                        var value2 = this.code[index]
                }
            }
            if (instruction[3] == '1') {
                index = this.code[i + 3]
                this.code[index] = value1 + value2
                
            } else if (instruction[3] == '2') {
                index = this.code[i + 3]
                this.code[index] = value1 * value2
            } else if (instruction[3] == '7') {
                index = this.code[i + 3]
                if (value1 < value2) {
                    this.code[index] = 1
                } else {
                    this.code[index] = 0
                }
            } else if (instruction[3] == '8') {
                index = this.code[i + 3]
                if (value1 == value2) {
                    this.code[index] = 1
                } else {
                    this.code[index] = 0
                }
            } else if (instruction[3] == '3') {
                index = this.code[i + 1]
                this.code[index] = input
                n = 2
            } else if (instruction[3] == '4') {
                //var output = value1
                console.log(value1)
                n = 2
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
            } else if (instruction[2] == '9' && instruction[3] == '9') {
                break
            } else if (instruction[3] == '9') {
                this.base += value1
                n = 2
            }
        }
        return
    }
}

computer = new intCode
finalOutput = computer.main()

console.log(computer.code)

//console.log(finalOutput)