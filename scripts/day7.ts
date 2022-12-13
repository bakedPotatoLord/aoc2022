import { parseInput,arrSum, deepCopy,Node} from "./helpers.js";
//split into a 3d string array 🤏
let input = (await parseInput("7.txt","$"))
.map(el=>el.slice(1,el.length))
.map(el=>el.split("\r\n").filter(el=>(el != '')).map(el=>el.split(" ")))
input.shift() //remove initial cd

let nodes:DirNode[] = []
let currentDir:DirNode = null //setting initial dir to null because 🧠

class DirNode extends Node{
  values:number[]
  files:number[]
  declare children:DirNode[]
  declare parent: DirNode
  constructor(name:string,parent:DirNode){
    super(name,parent)
    this.children = []
    this.values = []
  }
  getSum = ():number=>{
    //recursion 🔁🔁🔁🔁 bc im a master programmer
    return arrSum(this?.children.map(el=>el.getSum() )) + arrSum(this.values)
  } 
}

input.forEach(el=>{
  if(el[0][0] == "cd"){
    if(el[0][1] ==".."){
      currentDir = currentDir.parent
    }else{
      //to add a directory node
      nodes.push(new DirNode(el[0][1],currentDir))
      currentDir = nodes[nodes.length -1]
      //pushing children like a middle school bully 😱
      currentDir.parent?.children.push(currentDir)
    }
  }else if(el[0][0] = 'ls'){
    //parse ls files 🤏
    let dir = (<string[][]>deepCopy(el))
    dir.shift() // i dont want the "ls" ❌
    dir = dir.filter(el=>el[0] != 'dir') // i dont want the filenames ❌
    let files = dir.map(el=>parseInt(el[0]))
    currentDir.values.push(...files)
  }
})

let sizeSums = nodes.map(el=>el.getSum() ) // recursive dir size 🔁
let filteredSum = arrSum(sizeSums.filter(el=>el <= 100_000)) //dirs with size under 100_000
console.log("p1: ",filteredSum)

let totalSize = Math.max(...sizeSums) //size of base directory
let spaceNeeded = totalSize - 40_000_000 
let largeEnough = sizeSums.filter(el=>el>=spaceNeeded) //dirs that can empty enough space
console.log('p2: ',Math.min(...largeEnough))
