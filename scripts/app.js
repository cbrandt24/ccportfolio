$(document).ready(function() {
  var $menu = $("#sidebar-wrapper");

  $(document).on("click", ".js-menu-open", function(evt) {
    $menu.addClass("open");
    return evt.target.tagName === "A";
  })
    .on("click", ".js-menu-close", function(evt) {
      $menu.removeClass("open");
      return evt.target.tagName === "A";
    })

    getWeather();

    function getWeather() {
      var apiKey = "2151ebaf712bc8c4ff17151eb0e656b5";
      var latitude = "47.956287";
      var longitude = "-122.208599";
      $.ajax({url: 'https://api.darksky.net/forecast/' + apiKey + '/' + latitude + ',' + longitude,
  dataType: 'jsonp', success: function(response) {
          var conditions = response.currently.icon;
          loadImage(conditions);
        }
      });
    }

    function getTimeOfDay() {
      var time = new Date();
      var hours = time.getHours();
      console.log(hours);
      var timeOfDay;
      if (hours > 17 || hours < 7) {
        timeOfDay = "night";
      } else if (hours >= 12 && hours <=17) {
        timeOfDay = "afternoon";
      } else {
        timeOfDay = "morning";
      }
      console.log(timeOfDay);
      return timeOfDay;
    }

    function loadImage(conditions) {
      console.log(conditions);
      var timeOfDay = getTimeOfDay();
      conditions = conditions.toLowerCase();

      if (conditions === "clear-day" || conditions === "clear-night") {
        conditions = "clear";
      } else if (conditions === "fog" || conditions === "cloudy" || conditions === "partly-cloudy-day" || conditions === "partly-cloudy-night") {
        conditions = "cloudy";
      } else if (conditions === "snow" || conditions === "sleet") {
        conditions = "snow";
      } else {
        conditions = "rain";
      }
      console.log(conditions);
      var imageSRC = "img/weather/hero-" + conditions + "-" + timeOfDay + ".jpg";
      $("#intro").css('background-image', "url(" + imageSRC + ")");

    }



});
