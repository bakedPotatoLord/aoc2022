import { parseInput,arrSum, deepCopy,Point} from "./helpers.js";

//split into instruction array 🤏
let input = (await parseInput("10.txt","\r\n"))
.map(el=>el.split(" "))
.map(el=>[el[0],el[1]])

let strength = 1
let vals:number[] = []

input.forEach((instr)=>{
  if(instr[0] == "addx"){
    //indexes represent cycles
    vals.push(strength)
    vals.push(strength)
    strength += parseInt(instr[1])
  }else if(instr[0]== "noop"){
    vals.push(strength)
  }
})
vals.unshift(0) // idk why this fixes it but it does
let strengthSums = arrSum(vals.map((el,i)=>(i+20) %40 == 0 ? el*i :0))

console.log("p1:",strengthSums)

vals.shift() //shift back into place
let screen = ""

vals.forEach((val,i)=>{
  screen += (Math.abs((i%40)-val) <=1 ? "#":".") //update screen
})
//split into screen format
console.log(screen.match(/.{1,40}/g).join("\n"))