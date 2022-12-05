import { parseInput,arrSum} from "./helpers.js";
//split into a 2d string array
let boxes = (await parseInput("5.txt","\n\n"))[0]
.split("\n").slice(0,-1)
.map(el=>(el.matchAll(/[(.*?)]/g)
))

console.log(boxes[0])

let instructions = (await parseInput("5.txt","\n\n"))[1]
.split("\n")
.map(el=>el.split(/move | from | to /).slice(-3))


//console.log(instructions)