const fs = require('fs');

let input = fs.readFileSync('./inputday6.txt', {encoding: 'utf8'}).split('\n');

var orbits = 0
class TreeNode {
    constructor(value) {
      this.value = value;
      this.descendants = [];
    }
  }

function makeTree() {
  for (let i = 0; i < input.length; i++) {
      divider = input[i].indexOf(")")
      object = input[i].substr(0, divider)
      orbiter = input[i].substr(divider + 1, input[i].length-2)

      if (this[object] == undefined) {
      this[object] = new TreeNode(object)
      }

      if (this[orbiter] == undefined) {
        this[orbiter] = new TreeNode(orbiter)
        }

      this[object].descendants.push(this[orbiter])
  }
  return this.COM
}

let BreadthFirstSearch = (tree) => {
  var lastDist = -5
  var dist = -1
  let queue = [];
  queue.push([dist, tree]);

  while (queue.length > 0) {
    let currentNode = queue[0][1];
    
    if (queue[0][0] !== lastDist) {
      dist++
      lastDist = queue[0][0]
    }
    currentNode.descendants.forEach(child => queue.push([dist, child]))

    queue.shift();
    
    orbits += dist;
    }
   return orbits
}

console.log(BreadthFirstSearch(makeTree()))