import { parseInput,arrSum, deepCopy} from "./helpers.js";
//split into a 3d string array 🤏
let input = (await parseInput("8.txt","\r\n"))
.map(el=>el.split("")
.map(el=>parseInt(el)))

console.log(input)


let visible = input.map((el,i)=>
  el.map((e,j)=>
    (i == 0 || i == input.length-1 || j== 0 || j ==el.length-1) 
  )
)

console.log(visible)