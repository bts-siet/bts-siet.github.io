var count=0;
var div=[];
var span=[];
function custom_alert(msg,type){
    div[count]=document.createElement("div");
    div[count].classList.add("col-sm-6","alert");
    span[count]=document.createElement("div");
    span[count].classList.add("closebtn");
    span[count].innerHTML="&times;"; 
    span[count].onclick=function(){
            this.parentElement.style.display="none";
    }
    div[count].append(span[count]);
    div[count].append(msg);
    if(type=="success"){
        div[count].style.backgroundColor="#1abc9c";
    }
    else{
        div[count].style.backgroundColor="#f44336";
    }

    $("body").append(div[count]);
    count++;
}


