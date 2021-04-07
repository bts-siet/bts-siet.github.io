var uri="https://bus-tracking-system-siet.000webhostapp.com/";

//department suggestion
$(function () {
    // NAME AUTO-COMPLETE
    $('#dept').autocomplete({
      source: function (request, response) {
        var dept=$('#dept').val();
        var datastring="dept="+dept;
        console.log(datastring);
        $.ajax({
          type: "POST",
          url: uri+"get-department.php",
          data: datastring,
          success: response,
          dataType: 'json',
          minLength: 2,
          delay: 100
        });
      }
    });  

})

//boarding_point suggestion
$(function () {
    // NAME AUTO-COMPLETE
    $('#boarding_point').autocomplete({
      source: function (request, response) {
        var boarding_point=$('#boarding_point').val();
        var datastring="boarding_point="+boarding_point;
        console.log(datastring);
        $.ajax({
          type: "POST",
          url: uri+"get-boarding-point.php",
          data: datastring,
          success: response,
          dataType: 'json',
          minLength: 2,
          delay: 100
        });
      }
    });  

})

