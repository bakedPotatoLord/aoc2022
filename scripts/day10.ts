import { parseInput,arrSum, deepCopy,Point} from "./helpers.js";

//split into instruction array 🤏
let input = (await parseInput("10.txt","\r\n"))
.map(el=>el.split(" "))
.map(el=>[el[0],el[1]])

let strength = 1

let vals:number[] = []

input.forEach((instr)=>{
  if(instr[0] == "addx"){
    vals.push(strength)
    vals.push(strength)
    strength += parseInt(instr[1])
  }else if(instr[0]== "noop"){
    vals.push(strength)
  }
  
})

vals.unshift(0)

let strengthSums = arrSum(vals.map((el,i)=>{
  if((i+20) %40 == 0) console.log(el*i)
   return (i+20) %40 == 0 ? el*i :0
  }))

console.log("p1:",strengthSums)

let sprite = 1
vals.shift()
let screen = ""

vals.forEach((val,i)=>{
  if(i == 38){
    console.log("potato")
  }
  if(Math.abs((i%40)-val) <=1){
    screen+="#"
  }else{
    screen+="."
  }
})

console.log(screen.match(/.{1,40}/g).join("\n"))