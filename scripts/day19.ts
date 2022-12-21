import { parseInput,arrSum, deepCopy,Point,Node,range, parseInputAsNum,hasOverlap} from "./helpers.js";

let input= (await parseInput("19.txt","\r\n\r\n"))
.map(el=>(el.match(/\d+/g) ?? new Array(7).fill(''))
  .slice(1)
  .map(el=>parseInt(el))
)

type instr = [
  oreCost:number,
  claybotCost:number,
  obsBotCost1:number,
  obsBotCost2:number,
  geodeBotCost1:number,
  geodeBotCost2:number,
]
/*
orebot cost
claybotCost
obsbot costs x ore 
  and y clay
geodebot costs x ore 
  and y obsidian
*/
let newBots = [0,0,0,0]
let orebots =1,claybots = 0,obsbots = 0,geodebots = 0
let ore = 0,clay = 0,obs = 0,geode = 0

let qL = input.map((el,ind)=>{
  for(let i = 1;i<25;i++){
    orebots+= newBots[0]
    claybots+= newBots[1]
    obsbots+= newBots[2]
    geodebots+= newBots[3]
  
  
    //ore, clay, obs, geo
    newBots = [0,0,0,0]
  
    if(ore >= el[4] && obs >= el[5]){
      ore -= el[4]
      obs -= el[5]
      //can make geodebot
      newBots[3]++
    }else if(ore >= el[2] && clay >= el[3] && !(obs >=el[5])){
      ore -= el[2]
      clay -= el[3]
      //can make obsbot
      newBots[2]++
    }else if(ore >= el[1] && !(clay >=el[3]) ){
      ore -= el[1]
      //can make claybot
      newBots[1]++
    }else if(ore >= el[0]  ){
      ore -= el[0]
      //can make orebot
      newBots[0]++
    }

    ore += orebots
    clay += claybots
    obs += obsbots
    geode+= geodebots

    console.log()
  }

  return geode
  
})


console.log('p1')