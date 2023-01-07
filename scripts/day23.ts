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
    elves.delete(toIntHash(this.x,this.y))
    elves.set(this.proposed,this)

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

let considered:boolean[][] = Array(6)

let duplicates:Set<bigint|string> = new Set()

input.forEach((ln,y)=>{
  ln.forEach((el,x)=>{
    if(el) elves.push(new Elf(x,y))
  })
})

elves.forEach(el=>{
  if(!(elves.has(toIntHash(el.x,el.y-1)) ||elves.has(toIntHash(el.x+1,el.y-1)) || elves.has(toIntHash(el.x-1,el.y-1)))){
    //north
    el.proposed = toIntHash(el.x,el.y-1)
    if(considered.has(el.proposed)) duplicates.add(el.proposed)
    considered.add(el.proposed)
  }else if(!(elves.has(toIntHash(el.x,el.y+1)) ||elves.has(toIntHash(el.x+1,el.y+1)) || elves.has(toIntHash(el.x-1,el.y+1)))){
    //south
    el.proposed = toIntHash(el.x,el.y+1)
    if(considered.has(el.proposed)) duplicates.add(el.proposed)
    considered.add(el.proposed)
  }else if(!(elves.has(toIntHash(el.x-1,el.y)) ||elves.has(toIntHash(el.x-1,el.y+1)) || elves.has(toIntHash(el.x-1,el.y-1)))){
    //West
    el.proposed = toIntHash(el.x-1,el.y)
    if(considered.has(el.proposed)) duplicates.add(el.proposed)
    considered.add(el.proposed)
  }else if(!(elves.has(toIntHash(el.x+1,el.y)) ||elves.has(toIntHash(el.x+1,el.y+1)) || elves.has(toIntHash(el.x+1,el.y-1)))){
    //East
    el.proposed = toIntHash(el.x+1,el.y)
    if(considered.has(el.proposed)) duplicates.add(el.proposed)
    considered.add(el.proposed)
  }
})


console.log("p1:")