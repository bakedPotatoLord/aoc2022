import { parseInput,arrSum, deepCopy,Point,Node} from "./helpers.js";

let input:thing = (await parseInput("13.txt","\r\n\r\n"))
.map(el=>el.split('\r\n')
.map(el=>JSON.parse(el)))
type thing = (number | thing[])[]

let in2:thing[] = []

deepCopy(input).forEach(el=>in2.push(el[0],el[1]))

function compare(el1:thing,el2:thing):boolean{

  let e1:thing = deepCopy(el1),e2:thing=deepCopy(el2)
  while(e1.length >0 && e2.length>0){
    let t1 = e1.shift() 
    let t2 = el2.shift() 
    if(typeof t1 == 'number' && typeof t2 == "number"){
      if(t1>t2){
        return false
      }else if(t1<t2){
        return true
      }
    }else if(typeof t1 == 'number'){
      //@ts-ignore
      let t = compare([t1],t2)
      if(t !=null) return t
    }else if(typeof t2 == "number"){
      //@ts-ignore
      let t = compare(t1,[t2])
      if(t !=null) return t
    }else{
      //@ts-ignore
      let t = compare(t1,t2)
      if(t !=null) return t
    }
  }
  if(el1.length == el2.length) return null
  return el1.length == 0
}

let correctOrder = input.map(el=>compare(el[0],el[1]))
console.log(correctOrder)
let indicies= correctOrder.map((el,i)=>el ?? true ? i+1:0)
console.log('p1',arrSum(indicies))

console.log(in2)

in2.sort((a,b)=>(compare(deepCopy(a),deepCopy(b)) ?? true) ?-1:1)

console.log('p2:')