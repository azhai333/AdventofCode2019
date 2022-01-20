const fs = require('fs');

class intCode {
    constructor() {
        this.first2 = true;
        this.instruction;
        this.len;
        this.n = 4;
        this.value1;
        this.value2;
        this.code = fs.readFileSync('./inputday7.txt', {encoding: 'utf8'}).split(',').map(n => parseInt(n));
      }

    async main(phase, output, feeder, next, first1) {
    for (let i = 0; i < this.code.length-1; i+=this.n) {
        this.instruction = this.code[i].toString()
        this.len = this.instruction.length
        this.n = 4
        //console.log(this.code)
        for (let j = 0; j < 4 - this.len; j++) {
            this.instruction = "0" + this.instruction
        }
        if (this.instruction[1] == '0') {
                this.value1 = this.code[this.code[i + 1]]
            } else {
                this.value1 = this.code[i + 1]
            }
        if (this.instruction[0] == '0') {
                this.value2 = this.code[this.code[i + 2]]
            } else {
                this.value2 = this.code[i + 2]
            }
        if (this.instruction[3] == '1') {
                this.code[this.code[i + 3]] = this.value1 + this.value2
        } else if (this.instruction[3] == '2') {
            this.code[this.code[i + 3]] = this.value1 * this.value2
        } else if (this.instruction[3] == '7') {
            if (this.value1 < this.value2) {
                this.code[this.code[i + 3]] = 1
            } else {
                this.code[this.code[i + 3]] = 0
            }
        } else if (this.instruction[3] == '8') {
            if (this.value1 == this.value2) {
                this.code[this.code[i + 3]] = 1
            } else {
                this.code[this.code[i + 3]] = 0
            }
        } else if (this.instruction[3] == '3') {
            if (first1 == true) {
            this.code[this.code[i + 1]] = 0
            first1 = false
            } else if (this.first2 == true){
                console.log(this.code[i + 1])
            this.code[this.code[i + 1]] = phase
            this.first2 = false
            } else {
                    //this.pause(feeder)
                    //this.code[this.code[i + 1]] = feeder[0]
                    
                    //console.log(this.code[this.code[i + 1]])
            }
            this.n = 2
        } else if (this.instruction[3] == '4') {
            output = this.output(output, this.value1, next)
            //console.log(output)
            this.n = 2
        } else if (this.instruction[3] == '5') {
            if (this.value1 !== 0) {
                this.n = this.value2 - i
            } else { 
                this.n = 3
            }
        } else if (this.instruction[3] == '6') {
            if (this.value1 == 0) {
                this.n = this.value2 - i
            } else {
                this.n = 3
            }
        }
        if (this.instruction[2] == '9' && this.instruction[3] == '9') {
            break
        }
    }
    return output
}
//push to results array for relavent amp 
    output(output, value1, array) {
        output = value1
        array.push(output)
        return output
    }

    pause(array) {
        var timeout1 = setInterval(function() {
         if(array.length >= 1) {
             clearInterval(timeout1); 
         }
         }, 1);
     }
}


highestSignal = 0
setting = [5, 6, 7, 8, 8]
final = [9, 8, 7, 6, 5]

ampA = new intCode
ampB = new intCode
ampC = new intCode
ampD = new intCode
ampE = new intCode

ampAOutput = []
ampBOutput = []
ampCOutput = []
ampDOutput = []
ampEOutput = []


//while (arrayEquals(setting, final) !== true) {
    repeat = true
    signal = 0
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

     
    ampA.main(setting[0], signal, ampEOutput, ampBOutput, true)  
    ampB.main(setting[1], signal, ampAOutput, ampCOutput, false)               
    ampC.main(setting[2], signal, ampBOutput, ampDOutput, false)               
    ampD.main(setting[3], signal, ampCOutput, ampEOutput, false)               
    ampE.main(setting[4], signal, ampDOutput, ampAOutput, false)                 
     

     if (signal > highestSignal) {
        highestSignal = signal
     }  
    
//}


function arrayEquals(a, b) {
    return (
      Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index])
    );
  }
