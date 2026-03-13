let map = L.map('map').setView([13.0827,80.2707],17)

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map)

let path = []
let polyline = L.polyline([], {color:'red'}).addTo(map)

let territories = []

navigator.geolocation.watchPosition(updatePosition)

function updatePosition(pos){

let lat = pos.coords.latitude
let lon = pos.coords.longitude

let point = [lat,lon]

path.push(point)

polyline.addLatLng(point)

map.setView(point)

checkLoop()

}

function distance(a,b){

let dx = a[0]-b[0]
let dy = a[1]-b[1]

return Math.sqrt(dx*dx+dy*dy)

}

function checkLoop(){

if(path.length < 10) return

let start = path[0]
let end = path[path.length-1]

if(distance(start,end) < 0.0001){

captureTerritory()

}

}

function captureTerritory(){

let polygon = L.polygon(path,{color:'green'}).addTo(map)

let geojson = polygon.toGeoJSON()

let area = turf.area(geojson)

document.getElementById("area").innerText = Math.round(area)

territories.push(polygon)

path = []

polyline.setLatLngs([])

}

document.getElementById("reset").addEventListener("click",function(){

path = []

polyline.setLatLngs([])

})