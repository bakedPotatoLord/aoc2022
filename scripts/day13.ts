import { parseInput,arrSum, deepCopy,Point,Node} from "./helpers.js";

type thing = (number | number[])[]

let input:thing = (await parseInput("13.txt","\r\n\r\n"))
.map(el=>el.split('\r\n')
.map(el=>JSON.parse(el)))

//create input copy
let s1 = [[2]], s2 = [[6]]
let in2:thing[] = [s1,s2]
deepCopy(input).forEach((el) =>in2.push(el[0],el[1]))

function compare(el1:thing,el2:thing):boolean{
  //create deep copies
  let e1:thing = deepCopy(el1)
  let e2:thing=  deepCopy(el2)
  while(e1.length >0 && e2.length>0){
    let t1 = e1.shift() 
    let t2 = e2.shift() 
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
  return (e1.length == e2.length) ? null: e1.length == 0
}

let correctOrder = input.map(el=>compare(el[0],el[1]))
let indicies= correctOrder.map((el,i)=>el ?? true ? i+1:0)
console.log('p1',arrSum(indicies))

in2.sort((a,b)=>(compare(a,b) ?? true) ?-1:1)
console.log('p2:',(in2.indexOf(s1)+1)*(in2.indexOf(s2)+1))
