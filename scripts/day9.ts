import { parseInput,arrSum, deepCopy,Point} from "./helpers.js";

//split into a 3d string array 🤏
let input = (await parseInput("9.txt","\r\n"))
.map(el=>el.split(" "))
.map(el=>[el[0],parseInt(el[1])])


let h:Point = {x:0,y:0}
let t:Point = {x:0,y:0}

function toStr(ob:Point){
  return ""+ob.x+","+ob.y
}

function isDiagonal(p1:Point,p2:Point){
  return Math.abs(p1.x-p2.x) == Math.abs(p1.y-p2.y)  
}
function isNextTo(p1:Point,p2:Point){
  return (Math.abs(p1.x-p2.x) == 1 && Math.abs(p1.y-p2.y) == 0 ) || (Math.abs(p1.x-p2.x) == 0 && Math.abs(p1.y-p2.y) == 1 )
}

function canFollow(p1:Point,p2:Point){
  return !(Math.abs(p1.x-p2.x) <= 1 && Math.abs(p1.y-p2.y)  <=1)
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


let tail:Point[] =Array.from(Array(10),x=> new Point(0,0)) 
postions.clear()

input.forEach((dir,ind)=>{
  for(let i = 0;i<dir[1];i++){
    //add position to set
    postions.add(toStr(tail[9]))
    //move head
    if(dir[0] == "R"){
      (tail[0]).x ++
    }else if(dir[0] == "L"){
      tail[0].x--
    }else if(dir[0] == "U"){
      tail[0].y++
    }else if(dir[0] == "D"){
      tail[0].y--
    }

    for(let index in tail){
      let indx = parseInt(index)
      let h:Point
      let t:Point
      if(indx != 0){
        h = tail[indx-1]
        t = tail[indx]
      }
      if((indx != 0) &&!(ind == 0 && i == 0)  && canFollow(h,t) ){
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
  }
})

console.log("p2:",postions.size)