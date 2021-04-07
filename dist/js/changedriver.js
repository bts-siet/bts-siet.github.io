var uri="https://bus-tracking-system-siet.000webhostapp.com/";
$(function () {
    // NAME AUTO-COMPLETE
          $('#driver_name').autocomplete({
              source: function (request, response) {
              var name=$('#driver_name').val();
              console.log(name);
              var datastring="name="+name;
              console.log(datastring);
              $.ajax({
                  type: "POST",
                  url: uri+"get-driver-name.php",
                  data: datastring,
                  success: response,
                  dataType: 'json',
                  minLength: 2,
                  delay: 100
              });
              }
          });  
  
          })