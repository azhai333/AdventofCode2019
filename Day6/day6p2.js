const fs = require('fs');

let input = fs.readFileSync('./inputday6.txt', {encoding: 'utf8'}).split('\n');

class TreeNode {
    constructor(value) {
      this.value = value;
      this.ascendents = [];
      this.descendants = [];
    }
  }

tree = makeTree()

sanArray = []
youArray = []
BreadthFirstSearch(tree, "SAN", sanArray)
BreadthFirstSearch(tree, "YOU", youArray)

sanDist = input.length + 100
youDist = input.length + 100
for (let i = 0; i < sanArray.length; i++) {
    for (let j = 0; j < youArray.length; j++) {
        if (sanArray[i][1] == youArray[j][1] && sanArray[i][0] < sanDist && youArray[j][0] < youDist) {
            finalDist = sanArray[i][0] + youArray[j][0] - 2
            sanDist = sanArray[i][0]
            youDist = youArray[j][0]
        }
    }
}

console.log(finalDist)

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
      this[orbiter].ascendents.push(this[object])
  }
  return this.COM
}

function BreadthFirstSearch(tree, searchValue, storage) {
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

      if (currentNode.value === searchValue) {
        upSearch(currentNode, storage)
        return dist;
      }
      currentNode.descendants.forEach(child => queue.push([dist, child]))
      queue.shift();  
      }
  }

function upSearch(tree, storage) {
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
      storage.push([dist, currentNode.value])
      if (currentNode.value === "COM") {
        return storage;
      }
      currentNode.ascendents.forEach(child => queue.push([dist, child]))
      queue.shift();  
      }
}