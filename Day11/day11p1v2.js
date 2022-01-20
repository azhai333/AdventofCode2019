const fs = require('fs');


var y = 0
var x = 0
var pos = 0
var direction = ["up", "right", "down", "left"]
var pointer = 0
var negativesY = []
var negativesX = []
var foundX = false
var frameshiftX = [0]
var frameshiftY = 0
var tempY
var tempX
var temp

var test = true

class intCode {
    constructor() {
        this.code = fs.readFileSync('./inputday11.txt', {encoding: 'utf8'}).split(',').map(n => parseInt(n));
        this.first = true;
        this.i = 0
        this.base = 0
        this.ship = [[0]]
      }

    main() {
        for (let i = this.i; i < 300; i+=n) {
            console.log(this.ship)
            //console.log()
            var instruction = this.code[i].toString()
            var len = instruction.length
            var n = 4
            var index;
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
                tempY = y
                    if (this.ship[y+frameshiftY] == undefined) {
                        if (y >= 0) {
                            this.ship.push([])
                            frameshiftX.push(0)
                            for (let i = 0; i < this.ship[y-1].length; i++) {
                                this.ship[y].push(0)
                            }
                        } else {
                            if (negativesY.indexOf(y) == -1) {
                                negativesY.push(y)
                                this.ship.splice(0, 0, [])
                                frameshiftY++
                                frameshiftX.splice(0, 0, 0)
                                for (let i = 0; i < this.ship[1].length; i++) {
                                    this.ship[0].push(0)
                                }
                            }   
                        }
                    }
                    if (tempY < 0) {
                        temp = negativesY.sort((a, b) => a - b)
                        tempY = temp.indexOf(y)
                    }
                    foundX = false
                    for (let i = 0; i < negativesX.length; i++) {
                        if (arrayEquals(negativesX[i], [x, y])) {
                            foundX = true
                        }
                    }
                    if (this.ship[tempY][x+frameshiftX] == undefined || foundX == false) {
                        if (x >= 0) {
                            this.ship[tempY].push(0)
                        } else {
                            this.ship[tempY].splice(0, 0, 0)
                            frameshiftX[tempY+frameshiftY]++
                            negativesX.push([x, y])
                        }
                    }
                temp = negativesY.sort((a, b) => a - b)
                tempY = temp.indexOf(y)
                if (y < 0) {
                    if (x < 0) {
                        tempX = negativesX.map(arr => {
                            if (arr[1] == y) {
                                return arr[0]
                        }}).sort((a, b) => a - b)
                        this.code[index] = this.ship[tempY][tempX.indexOf(x)]
                    } else {
                        this.code[index] = this.ship[tempY][x+frameshiftX[tempY+frameshiftY]]
                    }
                } else {
                    if (x < 0) {
                        tempX = negativesX.map(arr => {
                            if (arr[1] == y) {
                                return arr[0]
                        }}).sort((a, b) => a - b)
                        this.code[index] = this.ship[y+frameshiftY][tempX.indexOf(x)]
                    } else {
                        //console.log(frameshiftY)
                        this.code[index] = this.ship[y+frameshiftY][x+frameshiftX[y+2*frameshiftY]]
                    }
                }
                n = 2
            } else if (instruction[4] == '4') {
                //var output = value1
                // if (isNaN(value1)) {
                //     console.log(1)
                // }
                if (pos == 0) {
                    temp = negativesY.sort((a, b) => a - b)
                    tempY = temp.indexOf(y)
                    if (y < 0) {
                        if (x < 0) {
                            tempX = negativesX.map(arr => {
                                if (arr[1] == y) {
                                    return arr[0]
                            }}).sort((a, b) => a - b)
                            this.ship[tempY][tempX.indexOf(x)] = value1
                        } else {                       
                            this.ship[tempY][x+frameshiftX[tempY+frameshiftY]] = value1
                        }
                    } else {
                        if (x < 0) {
                            tempX = negativesX.map(arr => {
                                if (arr[1] == y) {
                                    return arr[0]
                            }}).sort((a, b) => a - b)
                            this.ship[y+frameshiftY][tempX.indexOf(x)] = value1
                        } else {
                        this.ship[y+frameshiftY][x+frameshiftX[y+2*frameshiftY]] = value1
                        }
                    }
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

//console.log(finalOutput)

function arrayEquals(a, b) {
    return (
      Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index])
    );
} 