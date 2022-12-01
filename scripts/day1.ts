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

for(let i = 0;i<3;i++){
	let max = Math.max(...totalArray)
	for(let j in totalArray){
		if(totalArray[j] == max){
			topElves.push(totalArray[j])
			totalArray.splice(parseInt(j),1,0)
		}
	}
}

console.log(topElves)
console.log(arrSum(topElves))
