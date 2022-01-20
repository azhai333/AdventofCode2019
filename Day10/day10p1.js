const fs = require('fs');

let input = fs.readFileSync('./inputday10.txt', {encoding: 'utf8'}).split('\n').map(arr => arr.split(""));

asteroids = []
slopes = [[], []]
for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
        if (input[i][j] == "#") {
            //slopes.push([])
            for (let k = 0; k < input.length; k++) {
                for (let l = 0; l < input[k].length; l++) {
                    if (input[k][l] == "#" && (k !== i || l !== j)) {
                        if (k == i && l > j) {
                        slope = [0, "right", Math.abs(j-l), l, k]
                        } else if (k == i && l < j) {
                        slope = [0, "left", Math.abs(j-l), l, k]
                        } else if (l == j && k > i) {
                        slope = [0, "down", Math.abs(i-k), l, k]
                        } else if (l == j && k < i) {
                        slope = [0, "up", Math.abs(i-k), l, k]
                        } else {
                            if (j > l) {
                            slope = [(i - k)/(j - l), "left", Math.sqrt(Math.pow(i-k,2) + Math.pow(j-l,2)), l, k]
                            } else {
                            slope = [(i - k)/(j - l), "right", Math.sqrt(Math.pow(i-k,2) + Math.pow(j-l,2)), l, k] 
                            }
                        }
                        if (arraySearch(slopes[slopes.length - 1], slope) == false) {
                        slopes[slopes.length - 1].push([slope])
                        } else {
                            coor = arraySearch(slopes[slopes.length - 1], slope)
                            slopes[slopes.length - 1][coor[1]].push(slope)
                            
                        }
                    }
                }
            }
            if (slopes[1].length > slopes[0].length) {
                slopes[0] = slopes[1]
                x = i
                y = j
            }        
            slopes[1] = []
            
        }
    }
}

slopes = slopes[0].map(arr => arr.sort(function(a, b) {
    return a[2] - b[2];
  }))

q1 = []
q2 = []
q3 = []
q4 = []

up = null
down = null
left = null
right = null

for (let i = 0; i < slopes.length; i++) {
    if (slopes[i][0][0] < 0 && slopes[i][0][1] == "right") {
        q1.push(slopes[i])
    }
    if (slopes[i][0][0] > 0 && slopes[i][0][1] == "left") {
        q2.push(slopes[i])
    }
    if (slopes[i][0][0] < 0 && slopes[i][0][1] == "left") {
        q3.push(slopes[i])
    }
    if (slopes[i][0][0] > 0 && slopes[i][0][1] == "right") {
        q4.push(slopes[i])
    }
    if (slopes[i][0][0] == 0 && slopes[i][0][1] == "right") {
        right = slopes[i]
    }
    if (slopes[i][0][0] == 0 && slopes[i][0][1] == "left") {
        left = slopes[i]
    }
    if (slopes[i][0][0] == 0 && slopes[i][0][1] == "up") {
        up = slopes[i]
    }
    if (slopes[i][0][0] == 0 && slopes[i][0][1] == "down") {
        down = slopes[i]
    }
}

q1 = q1.sort(function(a, b) {
    return a[0][0] - b[0][0];
})
if (up !== null) {
    q1.splice(0, 0, up)
}

q2 = q2.sort(function(a, b) {
    return a[0][0] - b[0][0];
})
if (left !== null) {
q2.splice(0, 0, left)
}

q3 = q3.sort(function(a, b) {
    return a[0][0] - b[0][0];
})
if (down !== null) {
q3.splice(0, 0, down)
}

q4 = q4.sort(function(a, b) {
    return a[0][0] - b[0][0];
})
if (right !== null) {
q4.splice(0, 0, right)
}

final = q1.concat(q4, q3, q2)

for (let i = 0; i < 200; i++) {
    x = final[i][0][3]
    y = final[i][0][4]
    finalOutput = x*100 + y
    final[i] = final[i].splice(0, 1)
}

console.log(finalOutput)

function arraySearch(arr, search) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i][0][0] == search[0] && arr[i][0][1] == search[1]) {
            return [arr[i][0][2], i]
        }
    }
    return false
}
