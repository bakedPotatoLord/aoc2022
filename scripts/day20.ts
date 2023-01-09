import { parseInput,arrSum, deepCopy,Point,Node,range, parseInputAsNum,hasOverlap} from "./helpers.js";

let input= (await parseInput("20.txt","\r\n"))
.map(el=>parseInt(el))

let ogInput = deepCopy(input)

let len = input.length

//console.log(input.join(', '))

function getInsertInd(selfIndex:number,val:number){
  let moves = Math.abs(val)
  let insertInd =selfIndex

  while(moves > 0){
    if(val > 0){
      //if positive
      if(insertInd == len -1){
        insertInd = 1
      }else{
        insertInd++
      }
    }else{
      //if negative
      if(insertInd == 0){
        insertInd = len- 2
      }else if(insertInd == 1){
        insertInd = len -1
      }else{
        insertInd--
      }

    }
    moves --
  }

  return insertInd
}

ogInput.forEach((el)=>{
  let ind= input.findIndex(e=>e==el)
  
  let insertInd = getInsertInd(ind,el)
  
  //remove self
  input.splice(ind,1)

  //insert new
  input.splice(insertInd ,0,el)
  
  //console.log(input.join(', '))
})
let indOf0 = input.findIndex((e)=>e==0)
let sum = [
  input[(indOf0+1000)%(len)],
  input[(indOf0+2000)%(len)],
  input[(indOf0+3000)%(len)],
]
// < 6954
// < 20016
//not 20603
console.log('p1',arrSum(sum))