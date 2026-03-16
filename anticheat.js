export function detectCheat(prev,current,time){

let dx=current.lat-prev.lat;
let dy=current.lng-prev.lng;

let dist=Math.sqrt(dx*dx+dy*dy)*111;

let speed=dist/(time/3600);

if(speed>40){
return true;
}

if(dist>0.5){
return true;
}

return false;

}
