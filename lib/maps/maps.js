

/**
 * Adds markers to the map highlighting the locations of the captials of
 * France, Italy, Germany, Spain and the United Kingdom.
 *
 * @param  {H.Map} map      A HERE Map instance within the application
 */

 var svg1 = `<svg xmlns="http://www.w3.org/2000/svg" class="svg-icon" width="10px" height="10px">
 <circle cx="5" cy="5" r="4" fill="rgb(250, 127, 0)" stroke-width="1" stroke="black" opacity="1"/>
 </svg>`,
 stopIcon = new H.map.DomIcon(svg1);

 var svg2 = `<svg xmlns="http://www.w3.org/2000/svg" class="svg-icon" width="10px" height="10px">
 <circle cx="5" cy="5" r="4" fill="rgb(48,152,205)" stroke-width="1" stroke="black" opacity="1"/>
 </svg>`,
 currentLocIcon = new H.map.DomIcon(svg2);

//  var icon = new H.map.Icon(svgMarkup);
 function addMarkersToMap(map,latitude,longitude) {
    var Marker = new H.map.DomMarker({lat:latitude, lng:longitude},
                {icon:stopIcon}
            );
    // Marker.icon=new H.map.DomIcon(domIconElement);
    map.addObject(Marker);  
}
var lineString = new H.geo.LineString();
function addPolylineToMap(map,latitude,longitude) { 
    lineString.pushPoint({lat:latitude, lng:longitude});
}
/**
 * Boilerplate map initialization code starts below:
 */
 

//Step 1: initialize communication with the platform
// In your own code, replace variable window.apikey with your own apikey
var platform = new H.service.Platform({
  apikey: window.apikey
});
var defaultLayers = platform.createDefaultLayers();

//Step 2: initialize a map - this map is centered over Europe
var map=new H.Map(document.getElementById('map'),
    defaultLayers.vector.normal.map,{
    center: {lat:11.30251978, lng:76.93752161},
    zoom: 10,
    setMax:12,
    pixelRatio: window.devicePixelRatio || 1
});
// add a resize listener to make sure that the map occupies the whole container
window.addEventListener('resize', () => map.getViewPort().resize());

//Step 3: make the map interactive
// MapEvents enables the event system
// Behavior implements default interactions for pan/zoom (also on mobile touch environments)
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

// Create the default UI components
var ui = H.ui.UI.createDefault(map, defaultLayers);

// Now use the map as required...
window.onload = function () {
    getBusRoute();
}

function getBusRoute()
{
    var route_id=localStorage.getItem('route_id');
    var datastring="route_id="+route_id;
    $.ajax({
        url:uri+"get-bus-route.php",
        type: "POST",
        data:datastring,
        dataType:"json",
        crossDomain:true,
        encode:true,  
        cache: false,
        beforeSend:function(){
            $('.loader').show()
        },
        success: function(data)
        {   
            var s_no=0;
            data.forEach(function(e){
                stop_name=e.boarding_point;
                time=e.time;
                s_no++;
                lat=e.latitude;
                lng=e.longitude;
                createCard(stop_name,time,s_no);
                console.log(e.latitude,e.longitude);
                map.setCenter({lat,lng}, true);
                if(lat!='' && lng!=''){
                    addMarkersToMap(map,e.latitude,e.longitude);
                }
                
            });
            $('.loader').hide();
        },
        error: function(data){
            custom_alert("error","Network Error");
            $('.loader').hide();
        }
    });   
}

function createCard(stop_name,time,s_no,status){
    var col12=document.createElement("div");
    col12.classList.add("col-12");
    var row=document.createElement("row");
    row.classList.add("row");
    col12.appendChild(row);

    var id_div=document.createElement("div");
    id_div.classList.add("col-3","border");
    id_div.innerHTML="S No";
    var id_p=document.createElement("p");
    id_p.classList.add("time");
    id_p.innerHTML=s_no;
    id_div.appendChild(id_p);
    row.appendChild(id_div);

    var time_div=document.createElement("div");
    time_div.classList.add("col-3","border");
    time_div.innerHTML="Time";
    var time_p=document.createElement("p");
    time_p.classList.add("time");
    time_p.innerHTML=time;
    time_div.appendChild(time_p);
    row.appendChild(time_div);

    var status_div=document.createElement("div");
    status_div.classList.add("col-6","border");
    status_div.innerHTML="Status";
    var status_p=document.createElement("p");
    status_p.classList.add("time");
    status_p.innerHTML="Reached";
    status_div.appendChild(status_p);
    row.appendChild(status_div);

    var row2=document.createElement("row");
    row2.classList.add("row");
    col12.appendChild(row2);
    
    var loc_div=document.createElement("div");
    loc_div.classList.add("col-12","border");
    loc_div.innerHTML="Location";
    var loc_p=document.createElement("p");
    loc_p.innerHTML=stop_name;
    loc_p.classList.add("time");
    loc_div.appendChild(loc_p);
    row2.appendChild(loc_div);

    col12.appendChild(row2);

    var card=document.createElement("div");
    card.classList.add("card","bg-light","mt-1");
    card.appendChild(col12);
    $('#history').append(card);
}

