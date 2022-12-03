import { parseInput,arrSum} from "./helpers.js";
//split into a 2d string array
let input = await parseInput("3.txt","\n")


let parsed = input.map(el=>{
  let arr = Array.from(el)
  return [arr.slice(0,arr.length/2),arr.slice(arr.length/2,arr.length)]
})
function getThing(x:string){
  if(x != x.toUpperCase()){
    return x.charCodeAt(0)-96
  }else{
    return x.charCodeAt(0)-64+26
  }
}

let sameChar = parsed.map(el=>{
  return el[0].filter(element => el[1].includes(element));
})
console.log("p1: ", arrSum(sameChar.map(el=>getThing(el[0]))))

let groups: string[][][] = []

while(input.length !=0){
  groups.push(input.slice(0,3).map(el=>Array.from(el)))
  input.splice(0,3)
}

let sameChar2 = groups.map(el=>{
  return el[0].filter(element => el[1].includes(element) && el[2].includes(element));
})
.map(el=>getThing(el[0]))

console.log("p2: ",arrSum(sameChar2))