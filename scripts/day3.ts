import { parseInput,arrSum} from "./helpers.js";
//split into a 2d string array
let input = await parseInput("3.txt","\n")

//split into 3d string array
let parsed = input.map(el=>{
  let arr = Array.from(el)
  return [arr.slice(0,arr.length/2),arr.slice(arr.length/2,arr.length)]
})

//declare getChar function
//it could be an LUT, but this is less work
function getCharVal(x:string){
  if(x != x.toUpperCase()){
    return x.charCodeAt(0)-96
  }else{
    return x.charCodeAt(0)-64+26 //dont ask questions
  }
}
//filter for double included elements
let charVals = parsed.map(el=> el[0].filter(element => el[1].includes(element)) )
//get char vals, turning string[][] into number[]
.map(el=>getCharVal(el[0]))

console.log("p1: ", arrSum(charVals))

// create groups array
let groups: string[][][] = []
// 
//theres probably a better way to do this but whatevs
while(input.length /*because 0 is falsy 😏*/){
  groups.push(input.slice(0,3).map(el=>Array.from(el)))
  input.splice(0,3)
}
//filter for elems repeated across all 3 arrays
let charVals2 = groups.map(el=>el[0].filter(element => el[1].includes(element) && el[2].includes(element)))
//map to number[]
.map(el=>getCharVal(el[0]))

console.log("p2: ",arrSum(charVals2))