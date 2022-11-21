import {parseInput, parseInputAsNum} from "./parseInput.js";

let input = await parseInput("1.txt")

for(let i of input){
  console.log(i)
}

let input2 = await parseInputAsNum("1.txt")

for(let i of input2){
  console.log(i)
}
