import { parseInput,arrSum} from "./helpers.js";
//split into a 2d string array
let input = (await parseInput("6.txt",""))

console.log("starting")

for(let i in input){
  let k = parseInt(i)
  if(k > 13){
    if(!hasDuplicates(input.slice(k-14,k))  ){
      console.log("p1: ",i)
      break
    }
  }
}

function hasDuplicates(array:any[]) {
  var valuesSoFar = [];
  for (var i = 0; i < array.length; ++i) {
      var value = array[i];
      if (valuesSoFar.indexOf(value) !== -1) {
          return true;
      }
      valuesSoFar.push(value);
  }
  return false;
}