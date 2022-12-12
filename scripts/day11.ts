import test from "node:test";
import { parseInput,arrSum, deepCopy,Point} from "./helpers.js";

//split into instruction array 🤏
let input:[number[],string,number,number,number][] = (await parseInput("11.txt","\r\n\r\n"))
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
  inspectedItems: number;
  constructor(items:number[],operation:string,test:number,ifTrue:number,ifFalse:number){
    this.items = items
    this.op = operation
    this.test = test
    this.ifTrue = ifTrue
    this.ifFalse = ifFalse
    this.inspectedItems = 0
  }

  inspectItems(){
    this.items.forEach(item=>{
      let tempItem = Math.floor(<number>eval(this.op.replaceAll(/old/g,item.toString())) /3)
      tempItem % this.test == 0 ?
        monkeys[this.ifTrue].items.push(tempItem)
      :
        monkeys[this.ifFalse].items.push(tempItem)
      ;
      this.inspectedItems++
    })
    this.items = []
  }

  inspectItems2(){
    this.items.forEach(item=>{
      let tempItem = <number>eval(this.op.replaceAll(/old/g,item.toString())) 
      tempItem % this.test == 0 ?
        monkeys[this.ifTrue].items.push(tempItem)
      :
        monkeys[this.ifFalse].items.push(tempItem)
      ;
      this.inspectedItems++
    })
    this.items = []
  }
}
let monkeys = input.map(el=>new Monkey(...el))


for(let j = 0;j<20;j++){
  monkeys.forEach((mon,i)=>{
    mon.inspectItems()
  })
}
let monkeyBuisness = monkeys.map(m=>m.inspectedItems)
monkeyBuisness.sort((a,b)=>a-b)

console.log("p1:",monkeyBuisness.slice(-2)[0] * monkeyBuisness.slice(-2)[1])

monkeys = input.map(el=>new Monkey(...el))




monkeyBuisness = monkeys.map(m=>m.inspectedItems)
monkeyBuisness.sort((a,b)=>a-b)

console.log("p1:",monkeyBuisness.slice(-2)[0] * monkeyBuisness.slice(-2)[1])

