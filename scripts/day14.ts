import { parseInput,arrSum, deepCopy,Point,Node,range} from "./helpers.js";

let input = (await parseInput("14.txt","\r\n"))
.map(el=>el.split(' -> ')
.map(el=>el.split(',')
.map(el=>parseInt(el))))

let walls:Point[] =  []
input.forEach(ln=>
  ln.forEach((pr,i)=>{
    if(i != 0 ){
      if(ln[i-1][0] == ln[i][0]){
        walls.push(
          ...Array.from(
            range(ln[i-1][1],ln[i][1]),
            el=>new Point(pr[0],el)
          )
        )
      }else if(ln[i-1][1] == ln[i][1]){
        walls.push(
          ...Array.from(
            range(ln[i-1][0], ln[i][0]),
            el=>new Point(el,pr[1])
          )
        )
      }
    }
  } )
)

function exists(x:number,y:number){
  return walls.filter(el=>el.equals(new Point(x,y))).length >0 ||
  sand.filter(el=>(new Point(x,y)).equals(el)).length >0
}

let sand:Point[] = []

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
      sand.push(point)
      console.log()
      break sandDrop
    }
    if(point.y > 500) break noneFallen
  }}
  console.clear()
  console.log("calculating...",Math.floor((sand.length/698)*10000)/100+'%')
}}
console.clear()
console.log('p1:',sand.length)