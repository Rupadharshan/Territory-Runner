let map = L.map('map',{
maxZoom:22,
minZoom:3
})

map.setView([13.0067,80.2337],18)

L.tileLayer(
'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
{
maxZoom:22
}).addTo(map)

let path = []
let lastPoint = null

let polyline = L.polyline([],{
color:'red',
weight:5,
smoothFactor:1
}).addTo(map)

let player = L.marker([13.0067,80.2337]).addTo(map)

function distance(a,b){

let dx = a[0]-b[0]
let dy = a[1]-b[1]

return Math.sqrt(dx*dx + dy*dy)

}

// polygon area calculation (approx meters²)
function polygonArea(coords){

let area = 0

for(let i=0;i<coords.length;i++){

let j=(i+1)%coords.length

let xi = coords[i][1]*111320
let yi = coords[i][0]*111320

let xj = coords[j][1]*111320
let yj = coords[j][0]*111320

area += (xi*yj - xj*yi)

}

return Math.abs(area/2)

}

function updatePosition(pos){

let lat = pos.coords.latitude
let lon = pos.coords.longitude
let accuracy = pos.coords.accuracy

if(accuracy > 40) return

let point = [lat,lon]

if(lastPoint){

let d = distance(lastPoint,point)

if(d > 0.0015){
return
}

}

lastPoint = point

path.push(point)

polyline.addLatLng(point)

player.setLatLng(point)

map.panTo(point)

checkLoop()

}

function checkLoop(){

if(path.length < 15) return

let start = path[0]
let end = path[path.length-1]

let d = distance(start,end)

if(d < 0.00015){

let area = polygonArea(path)

let polygon = L.polygon(path,{
color:'green',
fillOpacity:0.4
}).addTo(map)

polygon.bindPopup(
"Territory Captured<br>Area: " + area.toFixed(0) + " m²"
)

polyline.setStyle({
color:'green'
})

setTimeout(()=>{

path=[]
polyline.setLatLngs([])
polyline.setStyle({color:'red'})

},2000)

}

}

navigator.geolocation.watchPosition(

updatePosition,

function(e){
console.log(e)
},

{
enableHighAccuracy:true,
maximumAge:0,
timeout:4000
}

)
