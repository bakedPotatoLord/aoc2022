import { mkdtempSync } from "fs";
import { parseInput,arrSum, deepCopy,Point,Node,range, parseInputAsNum,hasOverlap} from "./helpers.js";

let input= (await parseInput("21.txt","\r\n"))
.map(el=> el.split(/: | /))
.map(el=>el.length == 2 ?
  [el[0],parseInt(el[1])]
  :
  el
)

let map = new Map()

input.forEach(el=>{
  if(el.length == 2){
    map.set(el[0],()=>el[1])
  }else{
    map.set(el[0],()=>
      eval(
        map.get(el[1])()
        +el[2]+
        map.get(el[3])()
      )
    )
  }
})

console.log('p1:',map.get('root')())

map.clear()

/*/
root is an equality check
humn is determined by me

to solve:

create node tree
set root as parent


*/
// input.forEach(el=>{
//   if(el[0] == 'root'){
//     map.set(el[0],()=>el[1] == el[3])
//   }else if(el.length == 2){
//     map.set(el[0],()=>el[1])
//   }else{
//     map.set(el[0],()=>
//       eval(
//         map.get(el[1])()
//         +el[2]+
//         map.get(el[3])()
//       )
//     )
//   }
// })
