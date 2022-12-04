import { parseInput,arrSum} from "./helpers.js";
//split into a 2d string array
let input = await parseInput("4.txt","\n")

let parsed:number[][][] = input.map(el=>el.split(",")
.map(el=>el.split("-")
.map(el=>parseInt(el))
))

let sumContaining =  parsed.map(el=>{
  
  //console.log(el)
  //console.log((el[0][0]>=el[1][0] && el[0][1] <= el[1][1]) || (el[0][0]<=el[1][0] && el[0][1] >= el[1][1]))
  return ((el[0][0]>=el[1][0] && el[0][1] <= el[1][1]) || (el[0][0]<=el[1][0] && el[0][1] >= el[1][1]))
  
})


let numberTrue =  sumContaining.map(el=>{
  if(el){return 1
  }else{return 0}
})

console.log("p1:", arrSum(numberTrue))


let anyOverlap = parsed.map(el=>{
  
  return  (el[0][0] <= el[1][1] && el[0][0] >=el[1][0] ) || 
  (el[0][1] <= el[1][1] && el[0][1] >=el[1][0] )  ||
  (el[1][0] <= el[0][1] && el[1][0] >=el[0][0] ) || 
  (el[1][1] <= el[0][1] && el[1][1] >=el[0][0] )
})
.map(el=>{if(el){return 1}else{return 0}})


console.log("p2: ",arrSum(anyOverlap))