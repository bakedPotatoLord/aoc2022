import test from "node:test";
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
      if(tempItem % this.test == 0){
        monkeys[this.ifTrue].items.push(tempItem)
      }else{
        monkeys[this.ifFalse].items.push(tempItem)
      }
      this.inspectedItems++
    })
    this.items = []
  }
}
//@ts-ignore
let monkeys = input.map(el=>new Monkey(el[0],el[1],el[2],el[3],el[4]))



for(let j = 0;j<20;j++){
  monkeys.forEach((mon,i)=>{
    mon.inspectItems()
  })
}
let monkeyBuisness = monkeys.map(m=>m.inspectedItems)
monkeyBuisness.sort((a,b)=>a-b)

console.log("p1:",monkeyBuisness.slice(-2)[0] * monkeyBuisness.slice(-2)[1])

//@ts-ignore
monkeys = input.map(el=>new Monkey(el[0],el[1],el[2],el[3],el[4]))

for(let j = 0;j<10_000;j++){
  monkeys.forEach((mon,i)=>{
    mon.inspectItems()
  })
  console.log(j)
}
monkeyBuisness = monkeys.map(m=>m.inspectedItems)
monkeyBuisness.sort((a,b)=>a-b)

console.log("p1:",monkeyBuisness.slice(-2)[0] * monkeyBuisness.slice(-2)[1])

