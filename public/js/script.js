 const socket=io();
 
 if(navigator.geolocation){
    navigator.geolocation.watchPosition((position)=>{
        const {latitude,longitude}=position.coords;
      socket.emit("send-location",{ latitude, longitude });

    }, (error)=>{
        console.error(error);
    },
    {
        enableHighAccuracy:true,
          timeout:5000,  //time limit
          maximumAge:0  //cache dont give any data
    }
);
 }
  const map = L.map("map").setView([0,0],16); // show the coordinates  and map zoom 

 L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
    attribution:"Emmanuel Mission School"
 }).addTo(map);
 
 //it show map in localhost
 const markers ={};

 socket.on("receive-location",(data) => {
    const {latitude,longitude,id} = data;  //here we receive data form server side and pass map coordinates and location
        map.setView([latitude,longitude]);
        if(markers[id]){
            markers[id].setLatLng([latitude, longitude]);
        }
        else {
            markers[id]=L.marker([latitude, longitude]).addTo(map);
        }
 }) //this will use for center the current location
 

 socket.on("user-disconnected", (id) => {
     if (markers[id]) {
        map.removeLayer(markers[id]);
        delete markers[id];
     }
 })