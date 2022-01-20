const fs = require('fs');


var currentY = 0
var lastY = 0
var currentX = 0
var lastX = 0
var pos = 0
class intCode {
    constructor() {
        this.code = fs.readFileSync('./inputday11.txt', {encoding: 'utf8'}).split(',').map(n => parseInt(n));
        this.first = true;
        this.i = 0
        this.base = 0
        this.ship = [[0]]
      }

    main() {
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
                this.code[index] = this.ship[y][x]
                n = 2
            } else if (instruction[3] == '4') {
                //var output = value1
                //console.log(value1)
                if (pos == 0) {
                    while (this.ship[y] == undefined) {
                        if (y > 0) {
                            this.ship.push([])
                        } else {
                            this.ship.splice(y, 0, [])
                        }
                    }
                    while (this.ship[y][x] == undefined) {
                        if (x > 0) {
                            this.ship[y].push(0)
                        } else {
                            this.ship[y].splice(x, 0, 0)
                        }
                    }
                    this.ship[y][x] = value1
                    pos = 1
                } else {
                    pos = 0
                }
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
computer.main()

//console.log(finalOutput)