import { parseInput,arrSum} from "./helpers.js";

let input2 = await parseInput("1.txt","\n\n")

let data = input2.map((el)=> arrSum(el.split("\n").map(el=>parseInt(el))))

console.log("solution1: ",Math.max(...data))
data.sort((a, b) =>a - b);
console.log("solution2: ",arrSum(data.slice(-3)))
