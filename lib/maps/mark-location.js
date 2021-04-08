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
 getBusLocation();
setInterval(function(){
        getBusLocation();
    },30000);

function getBusLocation(){
    var datastring = "bus_no="+localStorage.getItem("bus_no");
   $.ajax({
      url:uri+"get-bus-location.php",
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
               Marker.setGeometry({lat:data.latitude,lng:data.longitude});
          }
          else{
             console.log(data);
            custom_alert("Driver Offline","error");
          }
      },
      error: function(data){
         console.log(data);
          custom_alert("Network Error","error");
          $('.loader').hide();
      }
  });   
}