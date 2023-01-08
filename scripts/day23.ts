import { parseInput,arrSum, deepCopy,Point,Node,range, parseInputAsNum,hasOverlap} from "./helpers.js";

let input= (await parseInput("23.txt","\r\n"))
.map(ln=>ln.split('').map(el=>(el == '#')))

class Elf extends Point{
  proposed:string
  toIntHash = ()=>toIntHash(this.x,this.y)

  goToProposed(){
    let xy = this.proposed.split(',').map(el=>parseInt(el))
    this.x = xy[0]
    this.y = xy[1]
  }

  hasNeigbors(){
    return elfPositions.has(toIntHash(this.x-1,this.y)) ||
    elfPositions.has(toIntHash(this.x-1,this.y+1)) ||
    elfPositions.has(toIntHash(this.x-1,this.y-1)) ||
    elfPositions.has(toIntHash(this.x+1,this.y)) ||
    elfPositions.has(toIntHash(this.x+1,this.y+1)) ||
    elfPositions.has(toIntHash(this.x+1,this.y-1)) ||
    elfPositions.has(toIntHash(this.x,this.y+1)) ||
    elfPositions.has(toIntHash(this.x,this.y-1)) 
  }
}

function toIntHash(a:number|bigint,b:number|bigint){
  /*
  a = BigInt(a)
  b = BigInt(b)
  let A = a >= 0 ? 2n * a : -2n * a - 1n;
  let B = b >= 0 ? 2n * b : -2n * b - 1n;
  let C = (A >= B ? A * A + A + B : A + B * B) / 2n;
  a < 0 && b < 0 || a >= 0 && b >= 0 ? C : -C - 1n;
  return (A + B) * (A + B + 1n) / 2n + A;
  */
 return a+','+b
}


let elves:Elf[] = []

let elfPositions:Set<string> = new Set()

let considered:Set<bigint|string> = new Set()

let duplicates:Set<bigint|string> = new Set()

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
    if(!(elfPositions.has(toIntHash(el.x,el.y-1)) ||elfPositions.has(toIntHash(el.x+1,el.y-1)) || elfPositions.has(toIntHash(el.x-1,el.y-1)))){
      //north
      el.proposed = toIntHash(el.x,el.y-1)
      if(considered.has(el.proposed)) duplicates.add(el.proposed)
      considered.add(el.proposed)
      return true
    }else{
      return false
    }
  },
  (el:Elf)=>{
    if(!(elfPositions.has(toIntHash(el.x,el.y+1)) ||elfPositions.has(toIntHash(el.x+1,el.y+1)) || elfPositions.has(toIntHash(el.x-1,el.y+1)))){
      //south
      el.proposed = toIntHash(el.x,el.y+1)
      if(considered.has(el.proposed)) duplicates.add(el.proposed)
      considered.add(el.proposed)
      return true
    }else{
      return false
    }
  },
  (el:Elf)=>{
    if(!(elfPositions.has(toIntHash(el.x-1,el.y)) ||elfPositions.has(toIntHash(el.x-1,el.y+1)) || elfPositions.has(toIntHash(el.x-1,el.y-1)))){
      //West
      el.proposed = toIntHash(el.x-1,el.y)
      if(considered.has(el.proposed)) duplicates.add(el.proposed)
      considered.add(el.proposed)
      return true
    }else{
      return false
    }
  },
  (el:Elf)=>{
    if(!(elfPositions.has(toIntHash(el.x+1,el.y)) ||elfPositions.has(toIntHash(el.x+1,el.y+1)) || elfPositions.has(toIntHash(el.x+1,el.y-1)))){
      //East
      el.proposed = toIntHash(el.x+1,el.y)
      if(considered.has(el.proposed)) duplicates.add(el.proposed)
      considered.add(el.proposed)
      return true
    }else{
      return false
    }
  }
  
]
const numRounds = 10

function executeRound(){
  
  duplicates.clear()
  considered.clear()
  elves.forEach(el=>{
  
    if(el.hasNeigbors()){
      check:{
        for(let i of checks){
          if(i(el)) break check
        }
        el.proposed = el.toIntHash()
      }
    }else{
      el.proposed = el.toIntHash()
    }
  })
  
  elves.forEach(el=>{
      let [x,y] = el.toIntHash()
      .split(',')
      .map(el=>parseInt(el))
      if(!duplicates.has(el.proposed) ){
        elfPositions.delete(el.toIntHash())
        el.goToProposed()
        elfPositions.add(el.proposed)
      }
  
  })
  checks.push(checks.shift())
  /*
  console.log(`\r\nend of round ${round+1}\r\n`)
  
  let rep =input.map((ln,y)=>
    ln.map((e,x)=>elfPositions.has(toIntHash(x,y))?'#':'.')
    .join('')
  ).join('\r\n')
  
  console.log(rep)
  */
}
let round = 0

while(round < 10){
  executeRound()
  round++
}

let height = Math.max(...elves.map(e=>e.y)) -Math.min(...elves.map(e=>e.y)) + 1
let width = Math.max(...elves.map(e=>e.x)) - Math.min(...elves.map(e=>e.x)) +1

let totalSquares = (height * width)

let p1 = totalSquares - elves.length


while(true){
  executeRound()
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