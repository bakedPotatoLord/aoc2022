import * as algebra from 'algebra.js'
import { parseInput,arrSum, deepCopy,Point,Node,range, parseInputAsNum,hasOverlap} from "./helpers.js";

type instr = [string,string,string,string] | [string,number]
// parse instructions
let input= (await parseInput("21.txt","\r\n"))
.map(el=> el.split(/: | /))
// using the ternary operator bc im cool like that
.map(el=>el.length == 2 ? <instr>[el[0],parseInt(el[1])]:<instr>el
)

//types are weird but whatevs
let map:Map<string,()=>number> = new Map()

input.forEach(el=>{
  if(el.length == 2){
    map.set(el[0],()=>el[1])
  }else{
    map.set(el[0],()=>
      eval(
        map.get(el[1])()
        +el[2]+
        map.get(el[3])()
      )
    )
  }
})

console.log('p1:',map.get('root')())

//create new map
let map2:Map<string,()=>string> = new Map()

/*/
root is an equality check
humn is determined by me

to solve:
create long-ass equation (in terms of solve for x)
solve it with algebra library

i added types here after the fact, so they might be kinda wonky
*/


input.forEach(el=>{
  if(el[0] == 'root'){
    map2.set(el[0],()=>''+map2.get(el[1].toString())()+'='+ map2.get(el[3])())
  }else if(el[0] == 'humn'){
    map2.set(el[0],()=>'x')
  }else if(el.length == 2){
    map2.set(el[0],()=>el[1].toString())
  }else{
    map2.set(el[0],()=>{
      return '('+
        map2.get(el[1])()+
        el[2]+
        map2.get(el[3])()+
        ')'
    })
  }
})

let eq = map2.get('root')().split('=')
.map(el=><algebra.Expression>algebra.parse(el))
let req=new algebra.Equation(eq[0],eq[1])
console.log('p2',eval(req.solveFor('x').toString()))