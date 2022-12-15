import { parseInput,arrSum, deepCopy,Point,Node,range} from "./helpers.js";

let input = (await parseInput("14.txt","\r\n"))
.map(el=>el.split(' -> ')
  .map(el=>el.split(',')
    .map(el=>parseInt(el))
  )
)

let walls:Set<string> =  new Set()
input.forEach(ln=>
  ln.forEach((pr,i)=>{
    if(i != 0 ){
      if(ln[i-1][0] == ln[i][0]){
        Array.from(
          range(ln[i-1][1],ln[i][1]),
          el=>new Point(pr[0],el)
        ).forEach(el=>
          walls.add(el.toString())
        )
      }else if(ln[i-1][1] == ln[i][1]){
        Array.from(
          range(ln[i-1][0], ln[i][0]),
          el=>new Point(el,pr[1])
        ).forEach(el=>
          walls.add(el.toString())
        )
      }
    }
  } )
)

function exists(x:number,y:number){
  return walls.has(`${x},${y}`) || sand.has(`${x},${y}`)
}

let sand:Set<string> = new Set()

noneFallen:{while(true){
  let point = new Point(500,0)
  sandDrop:{while(true){
    if(!exists(point.x,point.y+1)){
      point.y++
    }else if(!exists(point.x-1,point.y+1)){
      point.y++
      point.x--
    }else if(!exists(point.x+1,point.y+1)){
      point.y++
      point.x++
    }else{
      sand.add(point.toString())
      console.log()
      break sandDrop
    }
    if(point.y > 500) break noneFallen
  }}
  console.clear()

}}
console.clear()
console.log('p1:',Array.from(sand.keys()).length)


let lowest = Math.max( ...Array.from( walls.entries(),el=> parseInt(el[0].split(',')[1])))+2 
sand.clear()

settled:{while(true){
  let point = new Point(500,0)
  sandDrop:{while(true){
    if(exists(point.x,point.y)){
      break settled
    }else if(!exists(point.x,point.y+1)){
      point.y++
    }else if(!exists(point.x-1,point.y+1)){
      point.y++
      point.x--
    }else if(!exists(point.x+1,point.y+1)){
      point.y++
      point.x++
    }else{
      sand.add(point.toString())
      break sandDrop
    }
    if(point.y == lowest-1){
      sand.add(point.toString())
      break sandDrop
    }
  }}
}}
console.log('p2:',Array.from(sand.keys()).length)

