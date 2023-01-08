import { parseInput,arrSum, deepCopy,Point,Node,range, parseInputAsNum,hasOverlap} from "./helpers.js";

//parse input into 2d boolean array
let input= (await parseInput("23.txt","\r\n"))
.map(ln=>ln.split('').map(el=>(el == '#')))

// OOP has uses... 
// just no uses that its good at
class Elf extends Point{
  proposed:string
  toHash = ()=>toHash(this.x,this.y)

  goToProposed(){
    let xy = this.proposed.split(',').map(el=>parseInt(el))
    this.x = xy[0]
    this.y = xy[1]
  }

  hasNeigbors(){
    return elfPositions.has(toHash(this.x-1,this.y)) ||
    elfPositions.has(toHash(this.x-1,this.y+1)) ||
    elfPositions.has(toHash(this.x-1,this.y-1)) ||
    elfPositions.has(toHash(this.x+1,this.y)) ||
    elfPositions.has(toHash(this.x+1,this.y+1)) ||
    elfPositions.has(toHash(this.x+1,this.y-1)) ||
    elfPositions.has(toHash(this.x,this.y+1)) ||
    elfPositions.has(toHash(this.x,this.y-1)) 
  }
}

//this could also be [parameters].join(',') but idk; it works
const toHash =(a:number,b:number)=> a+','+b

// initialize elf sets and array
let elves:Elf[] = []
let elfPositions:Set<string> = new Set()
let considered:Set<string> = new Set()
let duplicates:Set<string> = new Set()

//fill sets and elf array 
input.forEach((ln,y)=>{
  ln.forEach((el,x)=>{
    if(el){
      elves.push(new Elf(x,y))
      elfPositions.add(x+','+y)
    } 
  })
})

let checks=[
  (el:Elf)=>{
    if(!(elfPositions.has(toHash(el.x,el.y-1)) ||elfPositions.has(toHash(el.x+1,el.y-1)) || elfPositions.has(toHash(el.x-1,el.y-1)))){
      //north
      el.proposed = toHash(el.x,el.y-1)
      if(considered.has(el.proposed)) duplicates.add(el.proposed)
      considered.add(el.proposed)
      return true
    }else{
      return false
    }
  },
  (el:Elf)=>{
    if(!(elfPositions.has(toHash(el.x,el.y+1)) ||elfPositions.has(toHash(el.x+1,el.y+1)) || elfPositions.has(toHash(el.x-1,el.y+1)))){
      //south
      el.proposed = toHash(el.x,el.y+1)
      if(considered.has(el.proposed)) duplicates.add(el.proposed)
      considered.add(el.proposed)
      return true
    }else{
      return false
    }
  },
  (el:Elf)=>{
    if(!(elfPositions.has(toHash(el.x-1,el.y)) ||elfPositions.has(toHash(el.x-1,el.y+1)) || elfPositions.has(toHash(el.x-1,el.y-1)))){
      //West
      el.proposed = toHash(el.x-1,el.y)
      if(considered.has(el.proposed)) duplicates.add(el.proposed)
      considered.add(el.proposed)
      return true
    }else{
      return false
    }
  },
  (el:Elf)=>{
    if(!(elfPositions.has(toHash(el.x+1,el.y)) ||elfPositions.has(toHash(el.x+1,el.y+1)) || elfPositions.has(toHash(el.x+1,el.y-1)))){
      //East
      el.proposed = toHash(el.x+1,el.y)
      if(considered.has(el.proposed)) duplicates.add(el.proposed)
      considered.add(el.proposed)
      return true
    }else{
      return false
    }
  }
]
//youl understand why this is a function when you get to line 138
function executeRound(){
  //clear sets for each new round
  duplicates.clear()
  considered.clear()

  //round part 1: propose a move 
  elves.forEach(el=>{
    if(el.hasNeigbors()){
      check:{
        for(let check of checks){
          if(check(el)) break check //check function returns if it proposed a move
        }
        el.proposed = el.toHash()
      }
    }else{
      el.proposed = el.toHash()
    }
  })
  // round part 2: move all valid elves
  elves.forEach(el=>{
    if(!duplicates.has(el.proposed) ){
      elfPositions.delete(el.toHash())
      el.goToProposed()
      elfPositions.add(el.proposed)
    }
  })
  //move first instruction to the end of the array
  checks.push(checks.shift())
}

let round = 0
while(round < 10){
  executeRound()
  round++
}
//do part 1 calculations
let height = Math.max(...elves.map(e=>e.y)) -Math.min(...elves.map(e=>e.y)) + 1
let width = Math.max(...elves.map(e=>e.x)) - Math.min(...elves.map(e=>e.x)) +1
let totalSquares = (height * width)
// part 1 complete
let p1 = totalSquares - elves.length
//start executing until it reaches target round
while(true){
  executeRound()
  // none are considered if none have neigbors
  if(considered.size == 0){
    console.clear()
    console.log("p1:",p1)
    console.log('p2:',round+1)
    break
  }
  console.clear()
  console.log(Math.floor((round+1)/895*100)+'%')
  round++
}

// greater than 894