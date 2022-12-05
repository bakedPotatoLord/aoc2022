import { parseInput,arrSum} from "./helpers.js";
//split into a 2d string array
let input = (await parseInput("5.txt","\r\n\r\n"))
let boxes = input[0]
.split("\r\n").slice(0,-1)

let parsedBoxes: string[][] = [
boxes.map(el=>el.charAt(1)),
boxes.map(el=>el.charAt(5)),
boxes.map(el=>el.charAt(9)),
boxes.map(el=>el.charAt(13)),
boxes.map(el=>el.charAt(17)),
boxes.map(el=>el.charAt(21)),
boxes.map(el=>el.charAt(25)),
boxes.map(el=>el.charAt(29)),
boxes.map(el=>el.charAt(33)),
]
.map(el=>el.reverse())
.map(el=>el.filter(el=>(el != " ")))

console.log(parsedBoxes)

let instructions = input[1]
.split("\r\n")
.map(el=>el.split(/move | from | to /).slice(-3).map(
  el=>parseInt(el)
))


console.log(instructions)

instructions.forEach(i=>{
  let ins = 0
  for(ins =0;ins<i[0];ins++){
    parsedBoxes[i[2]-1].push(parsedBoxes[i[1]-1].pop())
  }
  
})

console.log("p1: " ,parsedBoxes.map(el=>el.pop()))