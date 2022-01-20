const fs = require('fs');
var Jimp = require('jimp');

var y = 0
var x = 0
var pos = 0
var start = true
var direction = ["up", "right", "down", "left"]
var count = 0
var pointer = 0
var tempY
var tempX

class intCode {
    constructor() {
        this.code = fs.readFileSync('./inputday11.txt', {encoding: 'utf8'}).split(',').map(n => parseInt(n));
        this.first = true;
        this.i = 0
        this.base = 0
        this.ship = {}
      }

    main() {
        for (let i = this.i; i < this.code.length; i+=n) {
            //console.log()
            var instruction = this.code[i].toString()
            var len = instruction.length
            var n = 4
            var index;
            for (let j = 0; j < 5 - len; j++) {
                instruction = "0" + instruction
            }
            if (instruction[3] == '9' && instruction[4] == '9') {
                new Jimp(42, 5, (err, image) => {
                    for (const xCoord in this.ship) {
                        for (const yCoord in this.ship[xCoord]) { 
                            if (this.ship[xCoord][yCoord] == 1) {
                                image.setPixelColor(Jimp.rgbaToInt(255, 255, 255, 255), Number(xCoord), Number(yCoord))
                            }
                        }
                    }
                    image.write("final.jpg")
                  });
                  console.log(this.ship)
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
                tempY = y.toString()
                tempX = x.toString()

                if (this.ship[tempX] == undefined) {
                    this.ship[tempX] = {} 
                }

                if (this.ship[tempX][tempY] == undefined) {
                    if (start == true) {
                        this.ship[tempX][tempY] = 1
                        start = false
                    } else {
                        this.ship[tempX][tempY] = 0
                    }
                    count++
                }
                
                this.code[index] = this.ship[tempX][tempY]
                n = 2
            } else if (instruction[4] == '4') {
                if (pos == 0) {
                    tempY = y.toString()
                    tempX = x.toString()
                    this.ship[tempX][tempY] = value1
                    pos = 1
                } else {
                    if (value1 == 0) {
                        if (direction[pointer] == "up") {
                            x -= 1
                        } else if (direction[pointer] == "right") {
                            y -= 1
                        } else if (direction[pointer] == "down") {
                            x += 1
                        } else {
                            y += 1
                        }
                        if (pointer > 0) {
                            pointer--
                        } else {
                            pointer = 3
                        }
                    } else {
                        if (direction[pointer] == "up") {
                            x += 1
                        } else if (direction[pointer] == "right") {
                            y += 1
                        } else if (direction[pointer] == "down") {
                            x -= 1
                        } else {
                            y -= 1
                        }
                        if (pointer < 3) {
                            pointer++
                        } else {
                            pointer = 0
                        }
                    }
                    pos = 0
                    //console.log([x, y])
                }
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
finalOutput = computer.main()
