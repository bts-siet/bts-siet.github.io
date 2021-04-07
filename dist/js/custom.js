var uri="https://bus-tracking-system-siet.000webhostapp.com/";

function fullScreen() {
    var el = document.documentElement,
      rfs = el.requestFullscreen
        || el.webkitRequestFullScreen
        || el.mozRequestFullScreen
        || el.msRequestFullscreen 
    ;

    rfs.call(el);
}

function studentsignup(){
    var name=$("#name").val();
    var email=$('#email').val();
    var bus_no=$('#bus_no').val();
    var dept=$('#dept').val();
    var year=$('#year').val();
    var boarding_point=$('#boarding_point').val();
    var password=$('#password').val();
    var cpassword=$('#cpassword').val();
    if(name=="" || email=="" || bus_no=="" || dept=="" || year=="" || boarding_point=="" || password=="" || cpassword==""){
        custom_alert("please check all the fields","error");
    }
    else{
        if(cpassword==password){
            var datastring="name="+name+"&email="+email+"&bus_no="+bus_no+"&dept="+dept+"&year="+year+"&boarding_point="+boarding_point+"&password="+password;
            $.ajax({
                url:uri+"student-sign-up.php",
                type: "POST",
                data:datastring,
                dataType:"json",
                crossDomain:true,
                encode:true,  
                cache: false,
                success: function(data)
                {  
                    console.log(data);
                    if(data.type=='exist'){
                        custom_alert(data.text,"success");
                    }
                    else if(data.type=='success'){
                        custom_alert("Successfully signed up","success");
                        window.location.href="login.html";
                    }
                    else{
                        custom_alert("Error in connecting database  ","error");
                    }
                },
                error: function(data){
                    console.log(data.val);
                }
            });}
        else{
            custom_alert("please check password and confirm password","error")
        }
    }
}
function staffsignup(){
    var name=$("#name").val();
    var email=$('#email').val();
    var password=$('#password').val();
    var phone_number=$('#phone_number').val();
    var dept=$('#dept').val();
    var boarding_point=$('#boarding_point').val();
    var bus_no=$('#bus_no').val();
    var cpassword=$('#cpassword').val();
    if(name=="" || email=="" || bus_no=="" || dept=="" || boarding_point=="" || password=="" || cpassword==""){
        custom_alert("please check all the fields","error");
    }
    else{
        if(password==cpassword && password.length>6){
            var datastring="name="+name+"&email="+email+"&password="+password+"&phone_number="+phone_number+"&dept="+dept+"&boarding_point="+boarding_point+"&bus_no="+bus_no;
            $.ajax({
                url:uri+"staff-sign-up.php",
                type: "POST",
                data:datastring,
                dataType:"json",
                crossDomain:true,
                encode:true,  
                cache: false,
                success: function(data)
                {   
                    custom_alert(data.text,"success");
                    setTimeout(function()
                    {
                        window.location.href="login.html";
                    },600);
                },
                error: function(data){
                    custom_alert("please check all the fields","error");
                }
            });}
        else{
                custom_alert("please check password and confirm password","error")
            }
        }
}
function studentlogin()
{
    var email=$('#email').val();
    var password=$('#password').val();
    if(email=="" || password==""){
        custom_alert("check email and password","error");
    }
    else
    {
        var datastring="email="+email+"&password="+password;
        $.ajax({
            url:uri+"student-login.php",
            type: "POST",
            data:datastring,
            dataType:"json",
            crossDomain:true,
            encode:true,  
            cache: false,
            success: function(data)
            {   
                if(data.type=='success'){
                    localStorage.setItem("email",email);
                    custom_alert("Successfully signed in","success");
                    setTimeout(function(){
                        window.location.href="index.html";
                    },600);
                    console.log(localStorage.getItem('email'));
                }
                else{
                    custom_alert("E-mail or Password Incorrect","error");
                }
            },
            error: function(data){
                custom_alert("Network Error","error");
            }
        });
    }
}

function stafflogin()
{
    var email=$('#email').val();
    var password=$('#password').val();
    if(email=="" || password==""){
        custom_alert("check email and password","error");
    }
    else
    {
        var datastring="email="+email+"&password="+password;
        $.ajax({
            url:uri+"staff-login.php",
            type: "POST",
            data:datastring,
            dataType:"json",
            crossDomain:true,
            encode:true,  
            cache: false,
            success: function(data)
            {   
                if(data.type=='success'){
                    localStorage.setItem("email",email);
                    custom_alert("Successfully signed in","success");
                    setTimeout(function(){
                        window.location.href="index.html";
                    },600);
                    console.log(localStorage.getItem('email'));
                }
                else{
                    custom_alert("E-mail or Password Incorrect","error");
                }
            },
            error: function(data){
                custom_alert("Network Error","error");
            }
        });
    }
}

function updatedrivername()
{
    var bus_id=$('#bus_id').val();
    var name=$('#driver_name').val();
        var datastring="bus_id="+bus_id+"&name="+name;
        console.log(datastring);
        $.ajax({
            url:uri+"driver-update.php",
            type: "POST",
            data:datastring,
            dataType:"json",
            crossDomain:true,
            encode:true,  
            cache: false,
            success: function(data)
            {   
                custom_alert("Successfully data added","success");
                console.log(data);

            },
            error: function(data){
                custom_alert(data.text,"error");
                console.log(data);
            }
        });
}
// --------------------------------------------------------------------------------------------
function driverlogin()
{
    var phone_number=$('#phone_number').val();
    var password=$('#password').val();
    if(phone_number=="" || password==""){
        custom_alert("check phone number and password","error");
    }
    else
    {
        var datastring="phone_number="+phone_number+"&password="+password;
        $.ajax({
            url:uri+"driver-login.php",
            type: "POST",
            data:datastring,
            dataType:"json",
            crossDomain:true,
            encode:true,  
            cache: false,
            success: function(data)
            {   
                if(data.type=='success'){
                    localStorage.setItem("phone_number",phone_number);
                    localStorage.setItem("bus_no",data.data.bus_no);
                    localStorage.setItem("route_id",data.data.route_id);
                    custom_alert("Successfully signed in","success");
                    console.log(data);
                    setTimeout(function(){
                        window.location.href="maps.html"
                    },600);
                    console.log(data.data.route_id);
                }
                else{
                    custom_alert("phone no or Password Incorrect","error");
                }
            },
            error: function(data){
                custom_alert("Network error","error");
            }
        });
    }
}   


function adminlogin()
{
    var email=$('#email').val();
    var password=$('#password').val();
    if(email=="" || password==""){
        custom_alert("check email and password","error");
    }
    else
    {
        var datastring="email="+email+"&password="+password;
        $.ajax({
            url:uri+"admin-login.php",
            type: "POST",
            data:datastring,
            dataType:"json",
            crossDomain:true,
            encode:true,  
            cache: false,
            success: function(data)
            {   
                if(data.type=='success'){
                    localStorage.setItem("email",email);
                    custom_alert("Successfully signed in","success");
                    setTimeout(function(){
                        window.location.href="index.html";
                    },600);
                    console.log(localStorage.getItem('email'));
                }
                else{
                    custom_alert("E-mail or Password Incorrect","error");
                }
            },
            error: function(data){
                custom_alert("Network Error","error");
            }
        });   
    }
}

//getting student info
function getStudentData(){
    var email=localStorage.getItem('email');
    var datastring="email="+email;
    
    $.ajax({
        url:uri+"get-student-details.php",
        type: "POST",
        data:datastring,
        dataType:"json",
        crossDomain:true,
        encode:true,  
        cache: false,
        beforeSend:loader(),
        success: function(data)
        {   
            document.getElementById("bus_no").innerHTML=data[0].route_id;
            document.getElementById("boarding_point").innerHTML=data[0].boarding_point;
            document.getElementById("year").innerHTML=data[0].year;
            document.getElementById("email").innerHTML=data[0].email;
            console.log(data[0]);
            localStorage.setItem("name",data[0].name);
            localStorage.setItem("dept",data[0].dept);
            localStorage.setItem("boarding",data[0].boarding_point);
            localStorage.setItem("route_id",data[0].route_id);

        }
    });   
}
var bus_route=[];
function updateBusRoute(){
    
    $.ajax({
        url:uri+"update-student-details.php",
        type: "POST",
        data:datastring,
        dataType:"json",
        crossDomain:true,
        encode:true,  
        cache: false,
        beforeSend:loader(),
        success: function(data)
        {   
            document.getElementById("bus_no").innerHTML=data.route_id;
            document.getElementById("boarding_point").innerHTML=data.boarding_point;
            document.getElementById("year").innerHTML=data.year;
            document.getElementById("email").innerHTML=data.email;
            console.log(data[0]);
            localStorage.setItem("name",data.name);
            localStorage.setItem("dept",data.dept);
            localStorage.setItem("boarding",data.boarding_point);
            localStorage.setItem("route_id",data.route_id);
            custom_alert("Successfully Updated","success");
        }
    });   
}
//getting staff info
function getStaffData(){
    var email=localStorage.getItem("email");
    var datastring="email="+email;
    $.ajax({
        url:uri+"get-staff-details.php",
        type: "POST",
        data:datastring,
        dataType:"json",
        crossDomain:true,
        encode:true,  
        cache: false,
        success: function(data)
        {   
            localStorage.setItem("bus_no",data[0].bus_no);
            document.getElementById("bus_no").innerHTML=data[0].bus_no;
            document.getElementById("boarding_point").innerHTML=data[0].boarding_point;
            document.getElementById("phone_number").innerHTML=data[0].phone_number;
            document.getElementById("email").innerHTML=data[0].email;
            localStorage.setItem("boarding",data[0].boarding_point);
            // localStorage.setItem("route_id",data[0].route_id);
            console.log(data[0]);

        }
    });   
}
//alert function

function custom_alert(msg,type){
    var div=document.createElement("div");
    div.classList.add("col-sm-6","alert","text-center");
    var span=document.createElement("span");
    span.classList.add("closebtn");
    span.innerHTML="&times;"; 
    span.onclick=function(){
            this.parentElement.style.display="none";
    }
    div.append(span);
    div.append(msg);
    if(type=="success"){
        div.style.backgroundColor="#1abc9c";
    }
    else if(type=="error"){
        div.style.backgroundColor="#f44336";
    }
    else{
        div.style.backgroundColor="#B2B5B6";

    }
    $("body").append(div);
    setTimeout(function(){ 
        $(div).slideUp(3000 ,"linear"); 
    }, 4000);
}

function goBack(){
    window.history.back();
}
//department suggestion

function checkConnection() {
    var networkState = navigator.connection.type;

    // var states = {};
    // states[Connection.UNKNOWN]  = 'Unknown connection';
    // states[Connection.ETHERNET] = 'Ethernet connection';
    // states[Connection.WIFI]     = 'WiFi connection';
    // states[Connection.CELL_2G]  = 'Cell 2G connection';
    // states[Connection.CELL_3G]  = 'Cell 3G connection';
    // states[Connection.CELL_4G]  = 'Cell 4G connection';
    // states[Connection.CELL]     = 'Cell generic connection';
    // states[Connection.NONE]     = 'No network connection';

    console.log('Connection type: ' + networkState);
}

document.addEventListener("offline", function(e){
    alert("NO_NETWORK");
}, false);  
function loader(){
    
    $('.loader').addClass("is-active");

}

function loaderHide(){
    $('.loader').removeClass('is-active');

}

function logout(){
    localStorage.clear();
    window.location='login.html';
}

function getBusRoute(){
    let bus_routes=[];
    $.ajax({
        url:uri+"get-bus-route.php",
        type: "POST",
        dataType:"json",
        crossDomain:true,
        encode:true,  
        cache: false,
        beforeSend:loader(),
        success: function(data)
        {   
            console.log(data[0]);

            var buses=[],s_no=1,bus_no,route_id,starting_point;
            data.forEach(function(data){
                if(buses.indexOf(data.bus_no)<0){
                    bus_no=data.bus_no;
                    route_id=data.route_id;
                    starting_point=data.boarding_point;
                    buses.push(bus_no);
                    createRow(s_no,bus_no,route_id,starting_point);
                    s_no++;
                }
            });
        }
    });
}
function createRow(s_no,bus_no,route_id,starting_point){
    var table=document.getElementById("table");
    var tr=table.insertRow();
    
    var col1=tr.insertCell(0);
    var col2=tr.insertCell(1);
    var col3=tr.insertCell(2);

    col1.innerHTML=s_no;
    col2.innerHTML=starting_point;
    var input=document.createElement("input");
    input.setAttribute("placeholder",bus_no);
    input.setAttribute("value",bus_no);
    input.setAttribute("id",route_id);
    col3.appendChild(input);
}

function stop_details()
{
    var boarding_point=$('#boarding_point').val();
        var datastring="boarding_point="+boarding_point;
        console.log(datastring);
        $.ajax({
            url:uri+"stop-details.php",
            type: "POST",
            data:datastring,
            dataType:"json",
            crossDomain:true,
            encode:true,  
            cache: false,
            success: function(data)
            {   
                if(data.type=="success"){
                    var array=data.result[0];
                    console.log(array);
                    createResultCard(array.boarding_point,array.bus_no,array.time,array.name,array.phone_number);
                }
                else{
                    custom_alert("Please Enter valid Stop Name","error");
                    console.log(data.text.length);
                }
            }
        });
}
function createResultCard(stop_name,bus_no,time,driver_name,phone_number){
    var container=document.getElementById("result");
    container.innerHTML='';

    var col12=document.createElement("div");
    col12.classList.add("col-12");
    var row=document.createElement("row");
    row.classList.add("row");
    col12.appendChild(row);

    var id_div=document.createElement("div");
    id_div.classList.add("col-12","border");
    id_div.innerHTML="Stop Name ";
    var id_p=document.createElement("div");
    id_p.classList.add("time");
    id_p.innerHTML=stop_name;
    id_div.appendChild(id_p);
    row.appendChild(id_div);

    var time_div=document.createElement("div");
    time_div.classList.add("col-6","border");
    time_div.innerHTML="Bus No";
    var time_p=document.createElement("p");
    time_p.classList.add("time");
    time_p.innerHTML=bus_no;
    time_div.appendChild(time_p);
    row.appendChild(time_div);

    var status_div=document.createElement("div");
    status_div.classList.add("col-6","border");
    status_div.innerHTML="Time";
    var status_p=document.createElement("p");
    status_p.classList.add("time");
    status_p.innerHTML=time;
    status_div.appendChild(status_p);
    row.appendChild(status_div);

    var row2=document.createElement("row");
    row2.classList.add("row");
    col12.appendChild(row2);
    
    var loc_div=document.createElement("div");
    loc_div.classList.add("col-12","border");
    loc_div.innerHTML="Driver Name ";
    var loc_p=document.createElement("p");
    loc_p.innerHTML=driver_name;
    loc_p.classList.add("time");
    loc_div.appendChild(loc_p);
    row2.appendChild(loc_div);

    col12.appendChild(row2);

    var card=document.createElement("div");
    card.classList.add("card","bg-light","mt-1");
    card.appendChild(col12);
    $('#result').append(card);
}

  $(window).on('load', function(){ 
    $('.loader').removeClass('is-active');
  });

  function get_attendance(){
    var bus_number=localStorage.getItem("bus_no");
    var date=$('#date').val();
        var datastring="bus_number="+bus_number+"&date="+date;
        console.log(datastring);
        $.ajax({
            url:uri+"get-attendance.php",
            type: "POST",
            data:datastring,
            dataType:"json",
            crossDomain:true,
            encode:true,  
            cache: false,
            success: function(data)
            {   
                custom_alert("Successfully data viewed","success");
                console.log(data);
                var s_no=1,name,department,status;
                data.result.forEach(function(data){
                    name=data.name;
                    department=data.dept;
                    if(status){
                        status="Present";
                    }
                    else{
                        status="Absent";
                    }
                    createRow1(s_no,name,department,status);
                    s_no++;
            });
                
            },
            error: function(data){
                custom_alert(data.text,"error");
                console.log(data);
            }
        }); 
  }

  function get_attendance_admin(){
    var bus_number=$('#bus_no').val();
    var date=$('#date').val();
        var datastring="bus_number="+bus_number+"&date="+date;
        console.log(datastring);
        $.ajax({
            url:uri+"get-attendance.php",
            type: "POST",
            data:datastring,
            dataType:"json",
            crossDomain:true,
            encode:true,  
            cache: false,
            success: function(data)
            {   
                custom_alert("Successfully data viewed","success");
                console.log(data);
                var s_no=1,name,department,status;
                data.result.forEach(function(data){
                    name=data.name;
                    department=data.dept;
                    if(status){
                        status="Present";
                    }
                    else{
                        status="Absent";
                    }
                    createRow1(s_no,name,department,status);
                    s_no++;
            });
                
            },
            error: function(data){
                custom_alert(data.text,"error");
                console.log(data);
            }
        }); 
  }


  function createRow1(s_no,name,department,status){
    var table=document.getElementById("table1");
    console.log(status);
    var tr=table.insertRow();
    var col1=tr.insertCell(0);
    var col2=tr.insertCell(1);
    var col3=tr.insertCell(2);
    var col4=tr.insertCell(3);
    col1.innerHTML=s_no;
    col2.innerHTML=name;
    col3.innerHTML=department;
    col4.innerHTML=status;
}