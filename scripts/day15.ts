import { parseInput,arrSum, deepCopy,Point,Node,range} from "./helpers.js";

let input = (await parseInput("15.txt","\r\n"))
.map(el=>el.split(/Sensor at x=|, y=|: closest beacon is at x=/g)
  .splice(1)
  .map(el=>parseInt(el))
)


let row:boolean[] = new Array(100).fill(false)


console.log('p1')




