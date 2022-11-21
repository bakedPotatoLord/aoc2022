import fs from 'fs/promises';

export  async function parseInput(name:string):Promise<string[]>{
  return (await fs.readFile(`../inputs/${name}`,"utf-8")).split('\n')
}

export  async function parseInputAsNum(name:string):Promise<number[]>{
  return Array.from((await fs.readFile(`../inputs/${name}`,"utf-8")).split('\n'),(v)=>parseFloat(v))
}