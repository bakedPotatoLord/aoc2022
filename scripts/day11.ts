import { parseInput,arrSum, deepCopy,Point} from "./helpers.js";

//split into instruction array 🤏
let input = (await parseInput("11.txt","\r\n\r\n"))
.map(el=>el.split("\r\n"))
.map(el=>[
  el[1].split(':')[1].split(',').map(el=>parseInt(el)),
  el[2].split(':')[1.].split('=')[1],
  parseInt(el[3].split('by')[1]),
  parseInt(el[4].split('monkey')[1]),
  parseInt(el[5].split('monkey')[1])
])

class Monkey{
  items:number[]
  op:string
  test:number
  ifTrue:number
  ifFalse:number
  constructor(items:number[],operation:string,test:number,ifTrue:number,ifFalse:number){
    this.items = items
    this.op = operation
    this.test = test
    this.ifTrue = ifTrue
    this.ifFalse = ifFalse
  }
}
//@ts-ignore
let monkeys = input.map(el=>new Monkey(el[0],el[1],el[2],el[3],el[4]))

console.log("p1:")