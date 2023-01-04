import { parseInput,arrSum, deepCopy,Point,Node,range, parseInputAsNum,hasOverlap} from "./helpers.js";

let input= (await parseInput("18.txt","\r\n"))
.map(el=>el.split(',')
  .map(el=>parseInt(el))
)
.map(el=>{
  return{
    arr:el,
    size:6
  }
})

function merge(a1:number[],a2:number[]){
  return a1.map((el,i)=>el-a2[i])
}

input.forEach((in1,i)=>{
  input.forEach(in2=>{
    if(Math.hypot(...merge(in1.arr,in2.arr)) == 1){
      in1.size --
    }
  })
})

console.log("p1",arrSum(input.map(el=>el.size)))

let surfaceCounter =  0

interface cubeData{
  solid:boolean,
  visited:boolean
}

let box:cubeData[][][] = Array(25).fill(undefined).map(()=>
  Array(25).fill(undefined).map(()=>
    Array(25).fill(undefined).map(()=>{return{solid:false,visited:false}})
  )
)

input.forEach(el=>{
  box[el.arr[0]+2][el.arr[1]+2][el.arr[2]+2].solid = true
})

type v3 = [number,number,number]

function isInsideRange(x:number,y:number,z:number){
  return (
    x >= 0 && x < 25 &&
    y >= 0 && y < 25 &&
    z >= 0 && z < 25
  )
}

const touching=(x:number,y:number,z:number):v3[]=>
  (<v3[]>[
    [x+1,y,z],
    [x-1,y,z],
    [x,y+1,z],
    [x,y-1,z],
    [x,y,z+1],
    [x,y,z-1],
  ])
  .filter(el=>isInsideRange(...el))

//start que
let que:v3[] = [[0,0,0]]
//expand over cube within boundries
while(que.length > 0 ){
  let val = que.shift()
  touching(...val).forEach(el=>{
    let cube = box[el[0]][el[1]][el[2]]
    if(cube.solid){
      surfaceCounter ++
    }else{
      if(!cube.visited){
        cube.visited = true
        que.push(el)
      }
    }
  })
}

console.log('p2: ',surfaceCounter)

