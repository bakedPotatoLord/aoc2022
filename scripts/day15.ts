import { parseInput,arrSum, deepCopy,Point,Node,range} from "./helpers.js";

let input = (await parseInput("15.txt","\r\n"))
.map(el=>el.split(/Sensor at x=|, y=|: closest beacon is at x=/g)
  .splice(1)
  .map(el=>parseInt(el))
)

let row:boolean[] = new Array(16_000_000).fill(false)
const offset = 8_000_000
const line = 2_000_000

const taxiDist = (p1:Point,p2:Point)=> Math.abs(p1.x-p2.x)+Math.abs(p1.y-p2.y)

input.forEach(el=>{
  let sensor = new Point(el[0],el[1])
  let beacon = new Point(el[2],el[3])
  let dist = taxiDist(sensor,beacon)
  let xdist = dist - Math.abs(sensor.y-line)

  if(xdist >= 0){
    row.fill(true,sensor.x-xdist+offset,sensor.x+xdist+1+offset)
  }
  if(beacon.y == line){
    row[beacon.x+offset] = false
  }
})


console.log('p1',row.filter(el=>el).length)

