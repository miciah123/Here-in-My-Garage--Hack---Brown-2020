
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAYi1VET68DBLv9P06JmcNjP5GIi2x2FzI",
    authDomain: "qup-database-6a42e.firebaseapp.com",
    databaseURL: "https://qup-database-6a42e.firebaseio.com",
    projectId: "qup-database-6a42e",
    storageBucket: "qup-database-6a42e.appspot.com",
    messagingSenderId: "539244085701",
    appId: "1:539244085701:web:a08e1e45f1d481360c4bac",
    measurementId: "G-6LDDFJWKSK"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
var database = firebase.database();

///realcode

///how to live update
// change 'queues/id' for all data
var queuesRef = firebase.database().ref('queues');
queuesRef.on('value', function(snapshot) {
    if(document.getElementById("lmao") != null){
document.getElementById("lmao").innerHTML = JSON.stringify(snapshot.val());
}});

function createQueue(){
    var eventName = document.getElementById("eventname").value;
    var hostName = document.getElementById("hostname").value;
    var location = document.getElementById("location").value;
    var startTime = document.getElementById("starttime").value;
    var endTime = document.getElementById("endtime").value;
    // console.log(eventName);
    var id = newQueue(eventName,hostName, location,startTime,endTime);
    setTimeout(function(){document.location.href = "./user-queue.html?id=" + id},0);


}

function redirect(){
    var id = document.getElementById("code").value;
    setTimeout(function(){document.location.href = "./user-queue.html?id=" + id},0);
}


function newQueue(eventName, hostName, location,start,end){
    var queue = {}
    var theRef = firebase.database().ref('queues');
    var newPostRef = theRef.push();
    console.log(newPostRef.key);
    newPostRef.set({
        "eventName": eventName,
        "hostName": hostName,
        "location": location,
        "id": newPostRef.key,
        "start": start,
        "end": end,
        "people":0,
    });
    return newPostRef.key
}

///TODO: IMPLEMENT NUM COUNT FOR QUEUE COUNT
function createUser(){
    var name = document.getElementById("name").value;
    var code = document.getElementById("code").value;
    addUser(name, code);
    redirect();
}

function addUser(name, code) {
    var theRef = firebase.database().ref('queues/' + code + '/people');
    var newUserRef = theRef.push();
    newUserRef.set({
        "name": name,
        "code": code,
    });
}


function update(){
    var theRef = firebase.database().ref('queues');
    theRef.once('value', function(snapshot) {
    document.getElementById("lmao").innerHTML = JSON.stringify(snapshot.val());
    // console.log(snapshot);
    });
}

function getQfromID() {
    var code = document.getElementById("code").value;
    //console.log(code);
    var theRef = firebase.database().ref('queues/' + code + '/people');
    //console.log(theRef);
}
