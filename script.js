let map = L.map('map',{
maxZoom:22,
minZoom:3
})

map.setView([13.0067,80.2337],18)

L.tileLayer(
'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
{
maxZoom:22,
}).addTo(map)

let path = []

let polyline = L.polyline([],{color:'green',weight:5}).addTo(map)

let lastPoint = null

function distance(a,b){

let dx = a[0]-b[0]
let dy = a[1]-b[1]

return Math.sqrt(dx*dx + dy*dy)

}

function updatePosition(pos){

let lat = pos.coords.latitude
let lon = pos.coords.longitude
let accuracy = pos.coords.accuracy

// ignore bad gps signal
if(accuracy > 30) return

let point = [lat,lon]

// spike filter
if(lastPoint){

let d = distance(lastPoint,point)

if(d > 0.002){

return

}

}

lastPoint = point

path.push(point)

polyline.addLatLng(point)

map.setView(point,20)

checkLoop()

}

function checkLoop(){

if(path.length < 10) return

let start = path[0]
let end = path[path.length-1]

let d = distance(start,end)

if(d < 0.0002){

let polygon = L.polygon(path,{
color:'green',
fillOpacity:0.4
}).addTo(map)

path=[]
polyline.setLatLngs([])

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
timeout:5000

}

)
