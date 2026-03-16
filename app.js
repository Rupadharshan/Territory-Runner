import { signup,login,googleLogin,listenAuth } from "./auth.js";
import { initMap,updatePath,getPath } from "./map.js";
import { detectCheat } from "./antiCheat.js";
import { loadLeaderboard } from "./leaderboard.js";

let watchID;
let prevPos=null;
let prevTime=null;

let distance=0;
let xp=0;

document.getElementById("signupBtn").onclick=()=>{

signup(
signupEmail.value,
signupPass.value
);

};

document.getElementById("loginBtn").onclick=()=>{

login(
loginEmail.value,
loginPass.value
);

};

document.getElementById("googleBtn").onclick=()=>{
googleLogin();
};

listenAuth(user=>{

if(user){

document.getElementById("auth").style.display="none";
document.getElementById("game").style.display="block";

document.getElementById("username").innerText=user.email;

startLocation();

}

});

function startLocation(){

navigator.geolocation.getCurrentPosition(pos=>{

initMap(
pos.coords.latitude,
pos.coords.longitude
);

});

}

document.getElementById("startBtn").onclick=()=>{

watchID=navigator.geolocation.watchPosition(pos=>{

let lat=pos.coords.latitude;
let lng=pos.coords.longitude;

updatePath(lat,lng);

let now=Date.now();

if(prevPos){

let cheat=detectCheat(
prevPos,
{lat,lng},
(now-prevTime)/1000
);

if(cheat){
alert("Cheating detected");
navigator.geolocation.clearWatch(watchID);
return;
}

let dx=lat-prevPos.lat;
let dy=lng-prevPos.lng;

distance+=Math.sqrt(dx*dx+dy*dy)*111;

}

prevPos={lat,lng};
prevTime=now;

xp=Math.floor(distance*100);

distanceText.innerText=distance.toFixed(2);

});

};

document.getElementById("stopBtn").onclick=()=>{

navigator.geolocation.clearWatch(watchID);

alert("Run saved! XP:"+xp);

loadBoard();

};

async function loadBoard(){

let players=await loadLeaderboard();

let ul=document.getElementById("leaderboard");

ul.innerHTML="";

players.forEach(p=>{

let li=document.createElement("li");

li.innerText=p.username+" - "+p.distance+"km";

ul.appendChild(li);

});

}
