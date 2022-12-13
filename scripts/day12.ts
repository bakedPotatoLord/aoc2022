
import { parseInput,arrSum, deepCopy,Point,Node} from "./helpers.js";

export class BFSNode{
  visited:boolean
  point: Point
  value:number
  parent:BFSNode
  generation:number
  constructor(point:Point,value:number){
    this.point = point
    this.value = value
    this.visited = false
    this.parent = null
  }

  getUsable=(nodes:BFSNode[])=> 
  nodes.filter(node=>-Math.abs(this.point.x - node.point.x) +1 == Math.abs(this.point.y - node.point.y))
  .filter(node=>node.value <= this.value+1)
}

let start:BFSNode
//split into heightmap  🤏
//i = top to bottom
//j = left to right
let input = (await parseInput("12.txt","\r\n"))
.map((elm,i)=>elm.split("")
.map((el,j)=>{
  if(el=='S'){
    start = new BFSNode(new Point(i,j),0) 
    return start
  }else if(el=='E'){
    return new BFSNode(new Point(i,j),27) 
  }else{
    return new BFSNode(new Point(i,j),el.charCodeAt(0)-96) 
  }
}))

let nodes:BFSNode[] = []
input.forEach(ln=>ln.forEach(node=>nodes.push(node)))


export function BFS(start:BFSNode,nodes:BFSNode[]){
  nodes.forEach(el=>el.visited = false)
  let que: BFSNode[] =[]
  start.visited = true
  start.generation = 0
  que.push(start)
  while(que.length >0){
    let v = que.shift()
    for(let child of v.getUsable(nodes)){
      child.generation = v.generation+1
      if(child.value == 27){
        return child.generation
      }
      if(!child.visited){
        child.visited = true
        que.push(child)
      }
    }
  }
  return 100_000
}

let sol1 = BFS(start,nodes)

let starts = nodes.filter(el=>el.value == 1)

let dists = starts.map((n,i)=>{
  console.clear()
  console.log("calculating... ",Math.floor(i/starts.length*10000)/100+'%')
  return BFS(n,nodes)
})

console.clear()
console.log("p1:",sol1)
console.log('p2:',Math.min(...dists))

