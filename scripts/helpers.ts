import fs from 'fs/promises';

export  async function parseInput(name:string,splitCriteria:string|RegExp):Promise<string[]>{
  return (await fs.readFile(`./inputs/${name}`,"utf-8")).split(splitCriteria)
}

export  async function parseInputAsNum(name:string,splitCriteria:string|RegExp):Promise<number[]>{
  return Array.from((await fs.readFile(`./inputs/${name}`,"utf-8")).split(splitCriteria),(v)=>parseFloat(v))
}

export function arrSum(arr:number[]){
	return arr.reduce((partialSum, a) => partialSum + a, 0);
}

export function hasDuplicates(array:any[]) {
  var valuesSoFar = [];
  for (var i = 0; i < array.length; ++i) {
      var value = array[i];
      if (valuesSoFar.indexOf(value) !== -1) {
          return true;
      }
      valuesSoFar.push(value);
  }
  return false;
}

export const deepCopy = structuredClone

export class Point{
  x:number
  y:number
  constructor(x:number,y:number){
    this.x = x
    this.y = y
  }

  equals=(p:Point)=> this.x == p.x && this.y == p.y
  clone = ()=>deepCopy(this)
  toString = ():string => `Point: ${this.x},${this.y}`
  toHash = ()=> `${this.x},${this.y}`
  slopeTo =(p1:Point)=>(p1.y-this.y) / (p1.x-this.x)
}

export function range(start:number, end:number) {
  return [...Array(Math.abs(start-end)+1).keys()].map(i => i + Math.min(...[start,end]));
}

export class Node{
  name: string;
  parent: Node
  children: Node[]
  constructor(name:string,parent:Node){
    this.children = []
    this.parent = parent
    this.name = name
  }
}

export function hasOverlap(arr:any[]){
  for(let el of arr){
    if( arr.filter(e=>e==el).length > 1 ){
      return true
    }
  }
  return false
}