import { parseInput,arrSum, deepCopy,Point,Node,range, parseInputAsNum,hasOverlap} from "./helpers.js";

let input= (await parseInput("17.txt","\r\n"))

class shape{
  points:Point[]
  constructor(num){
    if(num == 0){
      this.points= [
        new Point(-1,0),
        new Point(0,0),
        new Point(1,0),
        new Point(2,0),
      ]
    }else if(num == 1){
      this.points= [
        new Point(-1,0),
        new Point(0,0),
        new Point(1,0),
        new Point(2,0),
      ]
    }
  }
}


for(let i = 0;i<2022;i++){

}