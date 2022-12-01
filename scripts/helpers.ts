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