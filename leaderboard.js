import { db } from "./firebase.js";

import{
collection,
query,
orderBy,
limit,
getDocs
}
from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

export async function loadLeaderboard(){

const q=query(
collection(db,"players"),
orderBy("distance","desc"),
limit(10)
);

const snap=await getDocs(q);

let list=[];

snap.forEach(doc=>{
list.push(doc.data());
});

return list;

}
