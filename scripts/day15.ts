import { parseInput,arrSum, deepCopy,Point,Node,range, parseInputAsNum,hasOverlap} from "./helpers.js";

let input = (await parseInput("15.txt","\r\n"))
.map(el=>el.split(/Sensor at x=|, y=|: closest beacon is at x=/g)
  .splice(1)
  .map(el=>parseInt(el))
)
const taxiDist = (p1:Point,p2:Point)=> Math.abs(p1.x-p2.x)+Math.abs(p1.y-p2.y)

let row:boolean[] = new Array(16_000_000).fill(false)
const offset = 8_000_000
const line = 20

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

/**
 * @description points for the [ right, top, left, bottom] vertecies of a sensor-beacon pair
 */
type shape = [Point,Point,Point,Point]

function getVertecies(s:Point,b:Point):shape{
  let dist = taxiDist(s,b)
  return [
    new Point(s.x+dist,s.y),
    new Point(s.x,s.y+dist),
    new Point(s.x-dist,s.y),
    new Point(s.x,s.y-dist),
  ]
}

let shapes:shape[] = input.map(el=>
  // generates shapes from sensor-beacon pairs 
  getVertecies( new Point(el[0],el[1]),new Point(el[2],el[3]))
)

function getFuncData(p1:Point,p2:Point):number{
  // y = mx+b
  //b = y- mx
  return   p1.y - p1.slopeTo(p2)*p1.x  //just the x-intercept
}
function getXInts(s:shape){
 return {
  tr: getFuncData(s[1],s[0]),
  tl: getFuncData(s[2],s[1]),
  bl: getFuncData(s[3],s[2]),
  br: getFuncData(s[0],s[3]),
  parent: s
 }
}

//for each combination of shapes
shapes.forEach(s1=>{
  shapes.forEach(s2=>{
    shapes.forEach(s3=>{
      shapes.forEach(s4=>{
        //get x intercepts
        const sl1 = getXInts(s1)
        const sl2 = getXInts(s2)
        const sl3 = getXInts(s3)
        const sl4 = getXInts(s4)

        if( 
          //if the shape parts surround one 
          Math.abs(sl1.bl- sl2.tr)== 2   &&
          Math.abs(sl3.tl-sl4.br) == 2  &&
          //and none of the shapes are the same
          !hasOverlap([
            sl1.parent,
            sl2.parent,
            sl3.parent,
            sl4.parent,
          ])
        ){
          //calculate tuning frequency
          let y = (sl1.bl + sl2.tr +sl3.tl + sl4.br ) /4 
          let avgxI = ((sl1.bl +sl2.tr)/2)
          let x = -y +avgxI
          //output solution
          console.log('p2:',(x*4_000_000)+y)
        }
      })
    })
  })
})
