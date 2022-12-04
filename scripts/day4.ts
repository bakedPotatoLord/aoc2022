import { parseInput,arrSum} from "./helpers.js";
//split into a 2d string array
let input = await parseInput("4.txt","\n")

let parsed = input.map(el=>el.split(",")
.map(el=>el.split("-")
.map(el=>parseInt(el))
))

let sumContaining =  parsed.map(el=>
  //if bounds are both outside the other, or both inside the other
  (el[0][0]>=el[1][0] && el[0][1] <= el[1][1]) || 
  (el[0][0]<=el[1][0] && el[0][1] >= el[1][1])
)
//map to 1s and 0s
.map(el=>el ? 1:0)
console.log("p1:", arrSum(sumContaining))

let anyOverlap = parsed.map(el=>
  //for all numbers, if inside of the other list
  (el[0][0] <= el[1][1] && el[0][0] >=el[1][0] ) || 
  (el[0][1] <= el[1][1] && el[0][1] >=el[1][0] ) ||
  (el[1][0] <= el[0][1] && el[1][0] >=el[0][0] ) || 
  (el[1][1] <= el[0][1] && el[1][1] >=el[0][0] )
)
.map(el=>el ? 1:0)

console.log("p2: ",arrSum(anyOverlap))