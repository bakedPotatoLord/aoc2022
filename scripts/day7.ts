import { getRandomValues } from "crypto";
import { parseInput,arrSum,hasDuplicates, deepCopy} from "./helpers.js";
//split into a 2d string array
let input = (await parseInput("7.txt","$"))
.map(el=>el.slice(1,el.length))
.map(el=>el.split("\n").filter(el=>(el != '')).map(el=>el.split(" ")))
input.shift()

let nodes:Node[] = []

let currentDir:Node|null = null

class Node{
  name: string;
  parent: Node|null
  children: Node[]
  values:number[]
  files:number[]
  constructor(name:string,parent:Node|null){
    this.children = []
    this.parent = parent
    this.values = []
    this.name = name
  }
  getSum = ():number=>{
    return arrSum(this?.children.map(el=>el.getSum() )) + arrSum(this.values)
  } 
}

input.forEach(el=>{
  if(el[0][0] == "cd"){
    if(el[0][1] ==".."){
      currentDir = currentDir.parent
    }else{
      nodes.push(new Node(el[0][1],currentDir))
      currentDir = nodes[nodes.length -1]
      currentDir.parent?.children.push(currentDir)
    }
  }else if(el[0][0] = 'ls'){
    let dir = (<string[][]>deepCopy(el))
    dir.shift()
    dir = dir.filter(el=>el[0] != 'dir')
    let files = dir.map(el=>parseInt(el[0]))
    //console.log(files)
    currentDir.values.push(...files)

  }
})


let sizeSums = nodes.map(el=>el.getSum() )

let filteredSum = arrSum(sizeSums.filter(el=>el <= 100_000))

console.log("p1: ",filteredSum)

let totalSize = Math.max(...sizeSums)
let spaceNeeded = totalSize - 40_000_000

let largeEnough = sizeSums.filter(el=>el>=spaceNeeded)

console.log('p2: ',Math.min(...largeEnough))
