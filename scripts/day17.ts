import { parseInput,arrSum, deepCopy,Point,Node,range, parseInputAsNum,hasOverlap} from "./helpers.js";

let input= (await parseInput("17.txt",""))

function* gustGen(){
  let i = 0
  while(true){
    yield input[i] == '>' ? 1:-1 
    i = (i+1) % input.length
  }
  return 1
}

const gusts = gustGen()

class Shape{
  points:Point[]
  x=0
  y=0
  dataSave:{x:number,y:number,points:[number,number][]}
  constructor(num:number){

    //start with leftmost equal to 0
    //start that lowest equal to 0
    if(num == 0){
      // horizontal line
      this.points= [
        new Point(0,0),
        new Point(1,0),
        new Point(2,0),
        new Point(3,0),
      ]
    }else if(num == 1){
      //plus sign
      this.points= [
        new Point(1,0),
        new Point(0,1),
        new Point(1,1),
        new Point(2,1),
        new Point(1,2),
      ]
    }else if(num == 2){
      //backwards L
      this.points= [
        new Point(0,0),
        new Point(1,0),
        new Point(2,0),
        new Point(2,1),
        new Point(2,2),
      ]
    }else if(num == 3){
      // vertical line
      this.points= [
        new Point(0,0),
        new Point(0,1),
        new Point(0,2),
        new Point(0,3),
      ]
    }else if(num == 4){
      // box
      this.points= [
        new Point(0,0),
        new Point(0,1),
        new Point(1,0),
        new Point(1,1),
      ]
    }
  }

  save(){
    this.dataSave = {x:this.x,y:this.y,points:this.points.map(el=>
      [el.x,el.y]  
    )}
  }

  restore(){
    this.x = this.dataSave.x
    this.y = this.dataSave.y
    this.points = this.dataSave.points.map(el=>new Point(...el))
  }

  move(x:number,y:number){
    this.save()
    this.points.forEach(p=>p.x += x)
    this.x += x
    
    if(Math.min(...this.points.map(el=>el.x)) <= -1 || Math.max(...this.points.map(el=>el.x)) >= 7){
      this.restore()
    }
    
    for( let s of shapes.filter(s=>s != this)){
      for(let p of s.points){
        for(let c of this.points){
          if(p.equals(c)){
            this.restore()
          }
        }
      }
    }
    
    this.points.forEach(p=>p.y += y)
    this.y += y
  }
  
  set(x:number,y:number){
    this.save()

    let dx = x-this.x
    let dy = y-this.y

    this.points.forEach(p=>{p.x += dx;p.y += dy})
    this.x += dx
    this.y += dy

  }

}

const getHighest= ()=>
  Math.max(0,...shapes.map(el=>
    Math.max(...el.points.map(el=>el.y))+1
  ))

let shapes:Shape[] = []

const numRocks = 2022

let start  = Date.now()

for(let i = 0;i<numRocks;i++){
  let current = new Shape(i %5)

  current.set(2,getHighest()+3)

  
  
  landed:{while(true){
    let gust = gusts.next().value
  
    current.move(gust,0)
    

    current.move(0,-1)
    for( let s of shapes.filter(s=>s != current)){
      for(let p of s.points){
        for(let c of current.points){
          if(p.equals(c)){
            current.restore()
            break landed
          }
        }
      }
    }
    if(current.y <= -1){
      current.restore()
      break landed
    }
    console.log()
  }}

  shapes.push(current)
  console.clear()
  console.log(Math.floor(i/numRocks*100)+'%')
}
console.clear()
console.log('p1',getHighest())

console.log("time to complete",(Date.now()-start)/1000,'seconds')