const fs = require('fs');

let input = fs.readFileSync('./example0.txt', {encoding: 'utf8'}).split('\n')

class moon {
    constructor(x, y, z) {
        this.array = [x, y, z, 0, 0, 0]
        this.initial = [x, y, z, 0, 0, 0]
    }

    gravity(object) {
        if (this.array[0]> object.array[0]) {
            this.array[3]-=1
            object.array[3]+=1
        } else if (this.array[0]< object.array[0]) {
            this.array[3]+=1
            object.array[3]-=1
        }
        if (this.array[1]> object.array[1]) {
            this.array[4]-=1
            object.array[4]+=1
        } else if (this.array[1]< object.array[1]) {
            this.array[4]+=1
            object.array[4]-=1
        }
        if (this.array[2]> object.array[2]) {
            this.array[5]-=1
            object.array[5]+=1
        } else if (this.array[2]< object.array[2]) {
            this.array[5]+=1
            object.array[5]-=1
        }
    }
    velocity() {
        this.array[0]+= this.array[3]
        this.array[1]+= this.array[4]
        this.array[2]+= this.array[5]
    }
}

var periods = [1, 1, 1]

for (var h=0; h<3; h++) {
    var moons = [new moon(-13, -13, -13), new moon(5, -8, 3), new moon(-6, -10, -3), new moon(0, 5, -5)]

    for (var i=0; i<moons.length - 1; i++) {
        for (var j=i; j<moons.length - 1; j++) {
            moons[i].gravity(moons[j+1])
        }
    }

    for (var i=0; i<moons.length; i++) {
        moons[i].velocity()
    }

    var go = true
    while (go == true) {
    for (var i=0; i<moons.length - 1; i++) {
        for (var j=i; j<moons.length - 1; j++) {
            moons[i].gravity(moons[j+1])
        }
    }

    for (var i=0; i<moons.length; i++) {
        moons[i].velocity()
    }

    periods[h]++
    if (moons[0].array[h] == moons[0].initial[h] && moons[1].array[h] == moons[1].initial[h] && moons[2].array[h] == moons[2].initial[h] && moons[3].array[h] == moons[3].initial[h] && moons[0].array[h + 3] == moons[0].initial[h + 3] && moons[1].array[h + 3] == moons[1].initial[h + 3] && moons[2].array[h + 3] == moons[2].initial[h + 3] && moons[3].array[h + 3] == moons[3].initial[h + 3]) {
        go = false
    }
}
}

const calculateLCM = (arr) => {
    const gcd2 = (a, b) => {
       // Greatest common divisor of 2 integers
       if(!b) return b===0 ? a : NaN;
          return gcd2(b, a%b);
    };
    const lcm2 = (a, b) => {
       // Least common multiple of 2 integers
       return a * b / gcd2(a, b);
    }
    // Least common multiple of a list of integers
    let n = 1;
    for(let i = 0; i < arr.length; ++i){
       n = lcm2(arr[i], n);
    }
    return n;
 };

 console.log(calculateLCM(periods));