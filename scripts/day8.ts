import { parseInput,arrSum, deepCopy} from "./helpers.js";
//split into a 3d string array 🤏
let input = (await parseInput("8.txt","\r\n"))
.map(el=>el.split("")
.map(el=>parseInt(el)))

//i: top to bottom
//j: left to right
let visible = input.map((el,i)=>
  el.map((e,j)=>{ //check if visible
    return (i == 0 || i == input.length-1 || j== 0 || j ==el.length-1) ||
    (lowerThan(deepCopy(el).splice(0,j),e)) || //looking from left
    (lowerThan(deepCopy(el).splice(j+1,el.length),e))|| //looking from right
    (lowerThan(deepCopy(input.map(el=>el[j])).splice(0,i),e)) || //looking from top
    (lowerThan(deepCopy(input.map(el=>el[j])).splice(i+1,el.length),e))//looking from bottom

  })
)
let sol1 = arrSum(visible.map(el=>arrSum(el.map(el=>el?1:0))))
console.log("p1: ",sol1)

//i: top to bottom
//j: left to right
let scenicScore = input.map((el,i)=>
  el.map((e,j)=>{ //check if visible
    if(i == 0 || i == input.length-1 || j== 0 || j ==el.length-1) return 0
    
    return (visibleTrees(deepCopy(el).splice(0,j).reverse(),e)) * //looking left
    (visibleTrees(deepCopy(el).splice(j+1,el.length),e))* //looking right
    (visibleTrees(deepCopy(input.map(el=>el[j])).splice(0,i).reverse(),e)) * //looking up
    (visibleTrees(deepCopy(input.map(el=>el[j])).splice(i+1,el.length),e))//looking down

  })
)
console.log("p2",Math.max(...scenicScore.map(el=>Math.max(...el))))


function lowerThan(arr:number[],num:number){
  return arr.filter(el=>el<num).length == arr.length
}
function visibleTrees(arr:number[],num:number){
  let ar:number[] = deepCopy(arr)
  let i = 1
  while(ar[0] < num && ar.length > 1){
    ar.shift()
    i++
  }
  return i
}