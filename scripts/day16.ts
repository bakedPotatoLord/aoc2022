import nodeTest from "node:test";
import { parseInput,arrSum, deepCopy,Point,Node,range, parseInputAsNum,hasOverlap} from "./helpers.js";

type instr = [string,number,string[]]

class ValNode extends Node{
  val: number;
  generation: number;
  n:string[]
  declare children: ValNode[];
  constructor(name:string,val:number,n:string[]){
    super(name,null)
    this.val = val
    this.n = n
  }

  getMaxPressure(currPressure:number,currDepth:number,visited:ValNode[]){
    console.log(currPressure)
    if(currDepth == depth){
      return currPressure
    }else{
      console.log('looking at',this.children.filter(el=>!visited.includes(el)))
      return Math.max(...

        this.children.filter(el=>!visited.includes(el))
        .map(el=>
          el.getMaxPressure(currPressure+this.val,currDepth+1,[...visited,this])
        )
      )
    }
  }
}

let input= (await parseInput("16.txt","\r\n"))
.map(el=>el.split(/Valve | has flow rate=|; tunnels lead to valves /g)
  .slice(1))
.map((el)=> [el[0],parseInt(el[1]),el[2]?.split(', ') ?? []])
.map((el:instr)=>new ValNode(...el))

let nodes:ValNode[] = input

nodes.forEach(el=>{
  el.children = nodes.filter(e=>el.n.includes(e.name))
})

let start = nodes.filter(el=>el.name == 'AA')[0]

const depth = 4

let p = start.getMaxPressure(0,0,[])

console.log('p1')