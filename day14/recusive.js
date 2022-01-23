const fs = require('fs');

var reactions = {
    'FUEL': null
}
var extras = {}

let input = fs.readFileSync('./example.txt', {encoding: 'utf8'}).split('\n').map(str => str.split(' => ').map(str => str.split(', ').map(str => str.split(' ')))).map(arr => {
    reactions[arr[1][0][1]] = [arr[1][0][0], arr[0]]
})

for (const reaction in reactions) {
    extras[reaction] = 0
}

var ore = 0

function getReactants(product, productNeeded) {
    for (let i=0; i<reactions[product][1].length; i++) {
        reactant = reactions[product][1][i][1]
        productProduced = Number(reactions[product][0])
        mult = Math.ceil(productNeeded/productProduced)
        reactantAmount = Number(reactions[product][1][i][0]) * mult
        productProduced *= mult
        if (extras[reactant] > 0) {
            if (extras[reactant] <= reactantAmount) {
                reactantAmount -= extras[reactant]
                extras[reactant] = 0
            } else {
                extras[reactant] -= reactantAmount
                reactantAmount = 0
            }
        }

        if (productProduced > productNeeded) {
            extras[product] += productProduced - productNeeded
        }

        //console.log(reactant)
        if (reactant != 'ORE') {
            getReactants(reactant, reactantAmount)
        } else {
            ore += reactantAmount
        }
    }
}

getReactants('FUEL', 1)
console.log(ore)