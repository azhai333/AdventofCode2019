const fs = require('fs');

let input = fs.readFileSync('./example0.txt', {encoding: 'utf8'}).split('\n')

class moon {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.xVel = 0;
        this.yVel = 0;
        this.zVel = 0;
    }

    gravity(object) {
        if (this.x > object.x) {
            this.xVel-=1
            object.xVel+=1
        } else if (this.x < object.x) {
            this.xVel+=1
            object.xVel-=1
        }
        if (this.y > object.y) {
            this.yVel-=1
            object.yVel+=1
        } else if (this.y < object.y) {
            this.yVel+=1
            object.yVel-=1
        }
        if (this.z > object.z) {
            this.zVel-=1
            object.zVel+=1
        } else if (this.z < object.z) {
            this.zVel+=1
            object.zVel-=1
        }
    }
    velocity() {
        this.x+=this.xVel
        this.y += this.yVel
        this.z += this.zVel
    }
}

var moons = [new moon(-1, 0, 2), new moon(2, -10, -7), new moon(4, -8, 8), new moon(3, 5, -1)]

for (var h=0; h<10; h++) {
    for (var i=0; i<moons.length - 1; i++) {
        for (var j=i; j<moons.length - 1; j++) {
            moons[i].gravity(moons[j+1])
        }
    }

    for (var i=0; i<moons.length; i++) {
        moons[i].velocity()
    }
}
var total = 0
for (var i=0; i<moons.length; i++) {
    total += (Math.abs(moons[i].x) + Math.abs(moons[i].y) + Math.abs(moons[i].z)) * (Math.abs(moons[i].xVel) + Math.abs(moons[i].yVel) + Math.abs(moons[i].zVel))
}
console.log(total)