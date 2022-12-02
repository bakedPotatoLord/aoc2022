import { parseInput,arrSum} from "./helpers.js";
//split into a 2d string array
let input = await parseInput("2.txt","\n")
let parsed:string[][] = Array.from(input,(el,i)=>el.split(" "))
//create LUTs
let pointCombos = {
	AX : 1+3,
	AY : 2+6,
	AZ : 3+0,
	BX : 1+0,
	BY : 2+3,
	BZ : 3+6,
	CX : 1+6,
	CY : 2+0,
	CZ : 3+3,
}
let pointCombos2 = {
	AX : 0+3,
	AY : 3+1,
	AZ : 6+2,
	BX : 0+1,
	BY : 3+2,
	BZ : 6+3,
	CX : 0+2,
	CY : 3+3,
	CZ : 6+1,
}
//create array from results from LUT
let pointArr = parsed.map((el,i)=>pointCombos[el[0]+el[1]])
console.log("part1: ",arrSum(pointArr))
//create array from results from second LUT
pointArr = parsed.map((el)=>pointCombos2[el[0]+el[1]])
console.log("part2: ",arrSum(pointArr))