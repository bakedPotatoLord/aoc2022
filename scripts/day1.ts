import { parseInputAsNum,arrSum} from "./helpers.js";

let input2 = await parseInputAsNum("1.txt","\n")

let calArray:number[] = []
let totalArray:number[] = []

for(let i of input2){
  if(!isNaN(i)){
		calArray.push(i)
	}else{
		totalArray.push(arrSum(calArray))
		calArray = []
	}
}
console.log("solution1: ",Math.max(...totalArray))

totalArray.sort((a, b) =>a - b);
console.log("solution2: ",arrSum(totalArray.slice(-3)))
