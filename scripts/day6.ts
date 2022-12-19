import { parseInput,arrSum,hasDuplicates} from "./helpers.js";
//split into a 2d string array
let input = (await parseInput("6.txt",""))


for(let i in input){
  let k = parseInt(i)
  if(k > 3){
    if(!hasDuplicates(input.slice(k-4,k))  ){
      console.log("p1: ",i)
      break
    }
  }
}


for(let i in input){
  let k = parseInt(i)
  if(k > 13){
    if(!hasDuplicates(input.slice(k-14,k))  ){
      console.log("p2: ",i)
      break
    }
  }
}
