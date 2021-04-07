var uri="http://bus-tracking-system-siet.000webhostapp.com/";
var bus_routes=[
    [77.17701608350248, 11.107681085001227],
    [77.08682877619162, 11.061352234785431]
];
var bus_route=[];
var view_point;
get_bus_route();
function get_bus_route(){
    $.ajax({
        url:uri+"get-bus-route.php",
        type: "POST",
        // data:datastring,
        dataType:"json",
        crossDomain:true,
        encode:true,  
        cache: false,
        success: function(routes)
        {   
            routes.forEach(function(data){
                var points=[data.longitude,data.latitude];
                bus_route.push(points);
            });
        }
    }); 
    console.log(bus_route);
    console.log(bus_routes)  
}
var map = L.map('map', {doubleClickZoom: false}).locate({setView: true, maxZoom: 9});
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYnVzdHJhY2tpbmdzeXN0ZW0iLCJhIjoiY2tsdzZoemxvMGNxNTJ1cnp2bGFxd3p1NyJ9.Oj_fUilvDK9sFn-LtFq7MQ', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiYnVzdHJhY2tpbmdzeXN0ZW0iLCJhIjoiY2tsdzZoemxvMGNxNTJ1cnp2bGFxd3p1NyJ9.Oj_fUilvDK9sFn-LtFq7MQ'
}).addTo(map);
var marker = L.marker([11.040410514162, 77.07435888383034]).addTo(map);


var firstpolyline = new L.Polyline(bus_routes, {
    color: 'red',
    weight: 3,
    opacity: 0.5,
    smoothFactor: 1
});
firstpolyline.addTo(map)