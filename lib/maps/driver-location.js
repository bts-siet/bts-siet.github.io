var uri="https://bus-tracking-system-siet.000webhostapp.com/";

var svg2 = `<svg xmlns="http://www.w3.org/2000/svg" class="svg-icon" width="10px" height="10px">
 <circle cx="5" cy="5" r="4" fill="rgb(48,152,205)" stroke-width="1" stroke="black" opacity="1"/>
 </svg>`,
 currentLocIcon = new H.map.DomIcon(svg2);
 var Marker;
// Marker.icon=new H.map.DomIcon(domIconElement);
Marker = new H.map.DomMarker({lat:11.0781243, lng:77.03707376},
   {icon:currentLocIcon}
);
map.addObject(Marker);
var options = {
    enableHighAccuracy: true,
    maximumAge: 3600000
 }
 function getBusLocation(){
    var watchID = navigator.geolocation.getPosition(onSuccess, onError, options);
    clearWatch(watchID);
 }
 getBusLocation();
setInterval(function(){
        getBusLocation();
    },30000);
 function onSuccess(position) {
    alert("called success")
    var data="bus_no="+localStorage.getItem("bus_no")+"&latitude="+position.coords.latitude+"&longitude="+position.coords.longitude+"&date="+timestampToDate(position.timestamp)+"&time="+timestampToTime(position.timestamp);
    updateBusLocation(data,timestampToTime(position.timestamp));
    Marker.setGeometry({lat:position.coords.latitude,lng:position.coords.longitude});
    alert(data);
 };
 function onError(error) {
    alert("Failed");
    alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n',"error");
 }

 function timestampToDate(timestamp){
     var date=new Date(timestamp);
     var month=date.getMonth();
     var year=date.getFullYear();
     var day=date.getDate();

    return day+"-"+month+"-"+year;
 }
 function timestampToTime(timestamp){
    var date=new Date(timestamp);
    var hours=date.getHours();
    var mins=date.getMinutes();
    var sec=date.getSeconds();

   return hours+":"+mins+":"+sec;
}

function updateBusLocation(datastring,time){
   $.ajax({
      url:uri+"update-bus-location.php",
      type: "POST",
      data:datastring,
      dataType:"json",
      crossDomain:true,
      encode:true,  
      cache: false,
      success: function(data)
      {   
          if(data.type=="success"){
               custom_alert("Last Updated on "+time,"sec");
          }
          else{
             console.log(data);
            custom_alert("Can't able to Update Location","error");
          }
      },
      error: function(data){
         console.log(data);
          custom_alert("Network Error","error");
          $('.loader').hide();
      }
  });   
}