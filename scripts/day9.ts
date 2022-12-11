import { parseInput,arrSum, deepCopy,point} from "./helpers.js";

//split into a 3d string array 🤏
let input = (await parseInput("9.txt","\r\n"))
.map(el=>el.split(" "))
.map(el=>[el[0],parseInt(el[1])])


let h:point = {x:0,y:0}
let t:point = {x:0,y:0}

function toStr(ob:point){
  return ""+ob.x+","+ob.y
}

function isDiagonal(p1:point,p2:point){
  return Math.abs(p1.x-p2.x) == Math.abs(p1.y-p2.y)  
}
function isNextTo(p1:point,p2:point){
  return (Math.abs(p1.x-p2.x) == 1 && Math.abs(p1.y-p2.y) == 0 ) || (Math.abs(p1.x-p2.x) == 0 && Math.abs(p1.y-p2.y) == 1 )
}

let postions = new Set()

input.forEach((dir,ind)=>{
  for(let i = 0;i<dir[1];i++){
    //add position to set
    postions.add(toStr(t))
    //move head
    if(dir[0] == "R"){
      h.x++
    }else if(dir[0] == "L"){
      h.x--
    }else if(dir[0] == "U"){
      h.y++
    }else if(dir[0] == "D"){
      h.y--
    }
    if(!(ind == 0 && i == 0)  && !isDiagonal(t,h) && !isNextTo(t,h)){
      //if not the first iteration or tail directly next to head
      if(h.y > t.y){
        t.y++
        if(h.x > t.x){
          t.x++
        }else if(h.x < t.x){
          t.x--
        }
      }else if(h.y < t.y){
        t.y--
        if(h.x > t.x){
          t.x++
        }else if(h.x < t.x){
          t.x--
        }
      }else{
        if(h.x > t.x){
          t.x++
        }else if(h.x < t.x){
          t.x--
        }
      }
    }
  }
})


console.log("p1",postions.size)
