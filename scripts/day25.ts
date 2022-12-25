import { parseInput,arrSum, deepCopy,Point,Node,range, parseInputAsNum,hasOverlap, cube} from "./helpers.js";

const numLut = {
  '2':2,
  '1':1,
  '0':0,
  '-':-1,
  '=':-2,
}

const codeLut = {
  '2':'2',
  '1':'1',
  '0':'0',
  '-1':'-',
  '-2':'=',
}

let input= (await parseInput("25.txt","\r\n"))
.map(el=>codeToDecimal(el))

function baseConvert(num:string,from:number,to:number){
  return parseInt(num,from).toString(to)
}


function codeToDecimal(code:string){
  let arr = code.split('')
  let temp = 0  
  let i = 0
  while(arr.length > 0){
    temp += numLut[arr.pop()]* (5 ** i)
    i++
  }
  return temp
}

let sum = arrSum(input)

//   Decimal          SNAFU
//         1              1
//         2              2
//         3             1=
//         4             1-
//         5             10
//         6             11
//         7             12
//         8             2=
//         9             2-
//        10             20
//        15            1=0
//        20            1-0
//      2022         1=11-2
//     12345        1-0---0
// 314159265  1121-1110-1=0


function decimalToCode(decimal:string|number){
  let code:number[]= []
  let num = parseInt(decimal.toString() )

  while(num >0){
    code.push(((num +2) %5))
    num = Math.floor((num+2) /5)
  }
  
  return code
  .reverse()
  .map(digit =>{
		switch(digit){
		case 0:
			return '=';
		case 1: 
			return '-';
		case 2:
			return '0';
		case 3: 
			return '1';
		case 4:
			return '2';
		}
	})
  .join('')


}

console.log('p1:', decimalToCode(sum))