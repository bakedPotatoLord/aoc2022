import { parseInput,arrSum} from "./helpers.js";
//parse input into sums of calorie groups
let input2 = await parseInput("1.txt","\n\n")
let data = input2.map((el)=> arrSum(el.split("\n").map(el=>parseInt(el))))
//print outputs. 
console.log("solution1: ",Math.max(...data))
data.sort((a, b) =>a - b);
console.log("solution2: ",arrSum(data.slice(-3)));
