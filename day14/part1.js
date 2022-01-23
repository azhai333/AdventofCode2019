const fs = require('fs');

var reactions = {
    'FUEL': null
}
var extras = {}

fs.readFileSync('./example.txt', {encoding: 'utf8'}).split('\n').map(str => str.split(' => ').map(str => str.split(', ').map(str => str.split(' ')))).map(arr => {
    reactions[arr[1][0][1]] = [arr[1][0][0], arr[0]]
})

for (const reaction in reactions) {
    extras[reaction] = 0
}

var ore = 0

var queue = []

queue.push([reactions['FUEL'], 1, 'FUEL'])

var reactant = 'FUEL'

for (var j=0; j<7; j++) {
    for (var i=0; i<queue[0][0][1].length; i++) {
        productProduced = Number(queue[0][0][0])
        productNeeded = queue[0][1]
        mult = Math.ceil(productNeeded/productProduced)
        reactantAmount = Number(queue[0][0][1][i][0]) * mult
        productProduced *= mult
        console.log(reactantAmount, queue[0][0][1][i][1])
        if (extras[queue[0][0][1][i][1]] > 0) {
            if (extras[queue[0][0][1][i][1]] <= reactantAmount) {
                reactantAmount -= extras[queue[0][0][1][i][1]]
                extras[queue[0][0][1][i][1]] = 0
            } else {
                extras[queue[0][0][1][i][1]] -= reactantAmount
                reactantAmount = 0
            }
        }

        if (productProduced > productNeeded) {
            extras[queue[0][2]] += productProduced - productNeeded
        }

        if (queue[0][0][1][i][1] != 'ORE') {
            reactant = queue[0][0][1][i][1]
            queue.push([reactions[reactant], reactantAmount, reactant])
        } else {
            ore += reactantAmount
        }
    }
    queue.shift()
}

console.log(extras)
console.log(queue)