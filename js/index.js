$(document).ready(function() {
  
  var urlBase = "https://en.wikipedia.org/w/api.php?";
  var urlParams = "format=json&action=query&generator=search&gsrnamespace=0&gsrsearch=";
  var urlEnd = "&gsrlimit=10&prop=extracts&exintro&explaintext&exsentences=1&exlimit=max&callback=?";
  
  $("#search-input").keypress(function (e) {
    var key = e.which; 
    if(key == 13) {
      $("#getMessage").click();
      return false;
    }
  });

  $("#getMessage").on("click", function(){
    var inputVal = $("#search-input").val();
    
    $.ajax({
      url: urlBase + urlParams + inputVal + urlEnd,
      type: 'GET',
      contentType: 'application/json',
      dataType: 'json',
      success: function(json) {
        console.log(inputVal);  
        console.log(json);
          //console.log(json.query.pages);
          $(".results-div").empty();
          $.each(json.query.pages, function(index, value) {
            var $Url2 = "https://en.wikipedia.org/wiki/" + value.title.replace(/ /g, "_");
            
            var $titleDiv = "<div class='link_title'> <a href=" + $Url2 + ">" + value.title + "</a> </div>";
            
            var $infoDiv = "<div class='link_info'>" + value.extract + "</div>";
            var $link = "<a class='link' href=" + $Url2 + "> <i class='fa fa-link'></i> </a>";
            $(".results-div").append(
              "<div class='result-container'>" + $titleDiv + $infoDiv + $link + "</div>"
            );     
            //console.log(value.title);
            //console.log(value.extract);
          });
      }
    });

    function error(fail) {
      console.log(error);
      $("#search-results").html(fail);
    }
  });
});