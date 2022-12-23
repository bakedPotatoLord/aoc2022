import { parseInput,arrSum, deepCopy,Point,Node,range, parseInputAsNum,hasOverlap} from "./helpers.js";

let input= (await parseInput("20.txt","\r\n"))
.map(el=>parseInt(el))

let ogInput = deepCopy(input)

ogInput.forEach((el,i)=>{
  let ind= input.findIndex((e)=>e==el)
  let instertInd = ((ind+ el )% (input.length ))
  if(instertInd == 0) instertInd = input.length
  input.splice(ind,1)
  input.splice(instertInd ,0,el)
})
let indOf0 = input.findIndex((e)=>e==0)
let sum = [
  input[(indOf0+1000)%input.length],
  input[(indOf0+2000)%input.length],
  input[(indOf0+3000)%input.length],
]
// < 6954
// < 20016
console.log('p1',arrSum(sum))