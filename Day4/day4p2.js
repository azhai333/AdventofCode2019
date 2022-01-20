var min = "265275"
var max = "781584"

min = min.split('').map(n => Number(n))
max = max.split('').map(n => Number(n))

for (let i = 0; i < min.length; i++) {
    if (min[i] > min[i+1]) {
        for (let j = i + 1; j < min.length; j++) {
            min[j] = min[i]
        }
    }
}

for (let i = 0; i < max.length; i++) {
    if (max[i] > max[i+1]) {
        max[i]--
        for (let j = i + 1; j < min.length; j++) {
            max[j] = 9
        }
    }
}

min = Number(min.join(""))
max = Number(max.join(""))

var num = min
var passCount = 0

while (num >= min && num <= max) {
    num = num.toString().split('').map(n => Number(n))

    for (let i = 0; i < 5; i++) {
        match = 0
        while (num[i] == num[i+1]) {
            i++
            match++
        }
        if (match == 1) {
            passCount++
            break
        }
    }

    for (let i = 5; i >= 0; i--) {
        if (num[i] < 9) {
            num[i]++
            if (i < 5) {
                for (let j = i + 1; j <= 5; j++) {
                    num[j] = num[i]
                }
            }
            break
        }
    }
 
    num = Number(num.join(""))
}

console.log(passCount)
