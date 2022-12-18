import { parseInput,arrSum, deepCopy,Point,Node,range, parseInputAsNum} from "./helpers.js";

let input = (await parseInput("15.txt","\r\n"))
.map(el=>el.split(/Sensor at x=|, y=|: closest beacon is at x=/g)
  .splice(1)
  .map(el=>parseInt(el))
)
const taxiDist = (p1:Point,p2:Point)=> Math.abs(p1.x-p2.x)+Math.abs(p1.y-p2.y)

/*
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
*/


/**
 * @description points for the [ right, top, left, bottom] vertecies of a sensor-beacon pair
 */
type shape = [Point,Point,Point,Point]
/**
 * @returns points for the [ right, top, left, bottom] vertecies of a sensor-beacon pair
 */
function getVertecies(s:Point,b:Point):shape{
  let dist = taxiDist(s,b)
  return [
    new Point(s.x+dist,s.y),
    new Point(s.x,s.y+dist),
    new Point(s.x-dist,s.y),
    new Point(s.x,s.y-dist),
  ]
}

interface shapeXInts{
  tl:number,
  bl:number,
  br:number,
  tr:number
}

const bottom =20
const right = 20

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

function hasOverlap(arr:any[]){
  for(let el of arr){
    if( arr.filter(e=>e==el).length > 1 ){
      return true
    }
  }
  return false
}


hasOverlap([1,2,1])


let fittingShapes = []


//for each shape
shapes.forEach(s1=>{
  shapes.forEach(s2=>{
    shapes.forEach(s3=>{
      shapes.forEach(s4=>{
        
        const sl1 = getXInts(s1)
        const sl2 = getXInts(s2)
        const sl3 = getXInts(s3)
        const sl4 = getXInts(s4)
        // if( (sl1.bl == 24 && sl2.tr== 26 )  && (sl3.tl== -4  && sl4.br == -2)){
        if( 
          Math.abs(sl1.bl- sl2.tr)== 2   &&
          Math.abs(sl3.tl-sl4.br) == 2  &&
          !hasOverlap([
            sl1.parent,
            sl2.parent,
            sl3.parent,
            sl4.parent,
          ])
        ){

            
          let y = (sl1.bl + sl2.tr +sl3.tl + sl4.br ) /4 
          if((sl1.bl == 24 && sl2.tr== 26 )  && (sl3.tl== -4  && sl4.br == -2)){
            console.log()
          }
          let avgxI = ((sl1.bl +sl2.tr)/2)
          let x = -y +avgxI
          fittingShapes.push([x,y])
          console.log('p2:',x*y)
        }

      })
    })
  })
})


// > 9821458207265



