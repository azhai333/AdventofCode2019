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
            //console.log(instruction)
            for (let j = 0; j < 5 - len; j++) {
                instruction = "0" + instruction
            }
            if (instruction[3] == '9' && instruction[4] == '9') {
                break
            }
            if (instruction[2] == '0') {
                    index = this.code[i + 1]
                    this.memory(index)
                    var value1 = this.code[index]
                } else if (instruction[2] == '1') {
                    var value1 = this.code[i + 1]
                } else {
                    index = this.base + this.code[i + 1]
                    this.memory(index)
                    var value1 = this.code[index]
                    //console.log(value1)
                }
                console.log(index)
            if (instruction[4] !== "3" && instruction[4] !== "4" && instruction[4] !== "9") {
                if (instruction[1] == '0') {
                    index = this.code[i + 2]
                    this.memory(index)
                    var value2 = this.code[index]
                    } else if (instruction[1] == '1') {
                        var value2 = this.code[i + 2]
                    } else {
                        index = this.base + this.code[i + 2]
                        this.memory(index)
                        var value2 = this.code[index]
                }
            }

            if (instruction[0] == '0') {
                index = this.code[i + 3]
            } else {
            index = this.base + this.code[i + 3] 
            }
            if (instruction[4] == '1') {
                this.memory(index)
                this.code[index] = value1 + value2
                
            } else if (instruction[4] == '2') {
                this.memory(index)
                this.code[index] = value1 * value2
            } else if (instruction[4] == '7') {
                this.memory(index)
                if (value1 < value2) {
                    this.code[index] = 1
                } else {
                    this.code[index] = 0
                }
            } else if (instruction[4] == '8') {
                this.memory(index)
                if (value1 == value2) {
                    this.code[index] = 1
                } else {
                    this.code[index] = 0
                }
            } else if (instruction[4] == '3') {
                if (instruction[2] == '0') {
                index = this.code[i + 1]
                } else {
                index = this.base + this.code[i + 1] 
                }
                this.memory(index)
                this.code[index] = input
                n = 2
            } else if (instruction[4] == '4') {
                //var output = value1
                //console.log(value1)
                n = 2
            } else if (instruction[4] == '5') {
                if (value1 !== 0) {
                    n = value2 - i
                } else { 
                    n = 3
                }
            } else if (instruction[4] == '6') {
                if (value1 == 0) {
                    n = value2 - i
                } else {
                    n = 3
                }
            } else if (instruction[4] == '9') {
                this.base += value1
                n = 2
            }
        }
        return
    }

    memory(index) {
        if (this.code[index] == undefined) {
            let length = this.code.length
            for (let i = 0; i < index - length + 1; i++) {
                this.code.push(0)
            }
        }
    }
}

computer = new intCode
finalOutput = computer.main(0)

//console.log(finalOutput)