import { parseInput,arrSum, deepCopy,Point,Node,range, parseInputAsNum,hasOverlap} from "./helpers.js";

let input= (await parseInput("22.txt","\r\n\r\n"))

let map = input[0]
.split('\r\n')
.map(el=>
  el.split('')
  .map(el=>
    el.charCodeAt(0)
  )
)

let instr:[number[],(1|-1)[]] = [
  input[1].split(/L|R/)
  .map(el=>parseInt(el)),
  Array.from(input[1].matchAll(/L|R/g))
  .map(el=>el[0] == 'R' ? 1 :-1),
]

let instrCopy = deepCopy(instr)

function isOnMap(x:number,y:number){
  try{
    map[y][x]
    return !( map[y][x] == 32 || map[y][x] == undefined )
  }catch(err){
    return false
  }
}

function charAt(x:number,y:number){
  if(isOnMap(x,y)){
    if(map[y][x] == 46){
      return 'period'
    }else if(map[y][x] == 35){
      return 'hash'
    }
  }else{
    return null
  }
}

// 0 = r 
// 1 = d
// 2 = l
// 3 = u
let dir = 0
let pos = new Point(input[0].search(/\./),0)

while(instr[0].length > 0){
  let dist = instr[0].shift()
  if(instr[0].length != instr[1].length){
    dir = ((dir+ instr[1].shift())+4) %  4
  }

  unhindered:{
    for(let i =0;i<dist;i++){
      let startPos:[number,number] = [pos.x,pos.y]
      if(dir == 0){
        pos.x++
        if(charAt(pos.x,pos.y)=='hash'){
          pos = new Point(...startPos)
          break unhindered
        }
        if(!isOnMap(pos.x,pos.y)){
          pos = new Point(...startPos)
          while(isOnMap(pos.x,pos.y)){
            pos.x--
          }
          pos.x++
          if(charAt(pos.x,pos.y)=='hash'){
            pos = new Point(...startPos)
            break unhindered
          }
        }
      }else if(dir == 1){
        pos.y++
        if(charAt(pos.x,pos.y)=='hash'){
          pos = new Point(...startPos)
          break unhindered
        }
        if(!isOnMap(pos.x,pos.y)){
          pos = new Point(...startPos)
          while(isOnMap(pos.x,pos.y)){
            pos.y--
          }
          pos.y++
          if(charAt(pos.x,pos.y)=='hash'){
            pos = new Point(...startPos)
            break unhindered
          }
        }
      }else if(dir == 2){
        pos.x--
        if(charAt(pos.x,pos.y)=='hash'){
          pos = new Point(...startPos)
          break unhindered
        }
        if(!isOnMap(pos.x,pos.y)){
          pos = new Point(...startPos)
          while(isOnMap(pos.x,pos.y)){
            pos.x++
          }
          pos.x--
          if(charAt(pos.x,pos.y)=='hash'){
            pos = new Point(...startPos)
            break unhindered
          }
        }
      }else if(dir == 3){
        pos.y--
        if(charAt(pos.x,pos.y)=='hash'){
          pos = new Point(...startPos)
          break unhindered
        }
        if(!isOnMap(pos.x,pos.y)){
          pos = new Point(...startPos)
          while(isOnMap(pos.x,pos.y)){
            pos.y++
          }
          pos.y--
          if(charAt(pos.x,pos.y)=='hash'){
            pos = new Point(...startPos)
            break unhindered
          }
        }
      }
    } 
  }
}

console.log('p1',(1000*(pos.y+1))+(4*(pos.x+1))+dir)


dir = 0
pos = new Point(input[0].search(/\./),0)
instr = deepCopy(instrCopy)
/*
top,bottom
left, right
front, back
*/
function getSides(x:number,y:number):[number[],number[]]{
  return [[4*x,4*y],[4*x+3,4*y+3]]
}
let faces= {
  top:getSides(2,1),
  back:getSides(0,2),
  front:getSides(2,2),
  left:getSides(1,1),
  bottom:getSides(0,1),
  right:getSides(0,1),
  
}

function getside(x:number,y:number){
  for (const [key,val] of Object.entries(faces)) {
    if( x>=val[0][0] && x<=val[1][0] && y>=val[0][1] && y<=val[1][1] ){
      
    }
  }
}

