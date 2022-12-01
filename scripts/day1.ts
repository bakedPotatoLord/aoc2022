import { parseInputAsNum,arrSum} from "./helpers.js";

let input2 = await parseInputAsNum("1.txt","\n")

let calArray:number[] = []
let totalArray:number[] = []
let topElves:number[]= []

for(let i of input2){
  if(!isNaN(i)){
		calArray.push(i)
	}else{
		totalArray.push(arrSum(calArray))
		calArray = []
	}
}
console.log("solution1: ",Math.max(...totalArray))


for(let i = 0;i<3;i++){
	let j = totalArray.indexOf(Math.max(...totalArray))
	topElves.push(totalArray[j])
	totalArray.splice(j,1,0)
}
console.log("solution2: ",arrSum(topElves))
