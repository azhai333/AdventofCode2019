const fs = require('fs');
let input = fs.readFileSync('./inputday1.txt', {encoding: 'utf8'}).trim().split('\n').map(n => parseInt(n));

fuelTotal = 0

for (let i = 0; i < input.length; i++) {
    calculateFuel(input[i])
}

function calculateFuel(module) {
    fuel = Math.floor(module/3) - 2
    if (fuel > 0) {
        fuelTotal += fuel
        calculateFuel(fuel)
    } 
}

console.log(fuelTotal)