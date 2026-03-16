let map;
let polyline;
let path=[];

export function initMap(lat,lng){

map=L.map("map").setView([lat,lng],16);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png")
.addTo(map);

polyline=L.polyline([],{color:"red"}).addTo(map);

}

export function updatePath(lat,lng){

path.push([lat,lng]);

polyline.setLatLngs(path);

}

export function getPath(){
return path;
}
