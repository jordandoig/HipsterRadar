//Google maps API key
//AIzaSyCbLFtIwl7aH8u4vkTY0I0X5oZmLuezv3A


var swapping = false;

var loc = {
  lat: 39.7392,
  lng: -104.9903
};

postPicture(6);
postRating(6);

function getMap() {
  var map = new google.maps.Map(document.querySelector(".googleMap"), {
    zoom: 13,
    center: loc
  });
  var marker = new google.maps.Marker({
    position: loc,
    map: map
  });
  map.addListener("click", function(event) {
    loc = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    };
    getMap();
    getData(loc);
  });
}

function getData(loc) {
  var latLng = loc.lat.toString() + ',' + loc.lng.toString();
  var zip;
  $.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latLng +  '&key=AIzaSyCbLFtIwl7aH8u4vkTY0I0X5oZmLuezv3A')
  .then(data => {
    addressComps = data.results[0].address_components;
    for (var i = 0; i < addressComps.length; i++) {
      for (var j = 0; j < addressComps[i].types.length; j++) {
        if (addressComps[i].types[j] === 'postal_code') {
          zip = addressComps[i].long_name;
          break;
        }
      }
    }
  })
  .then(() => {
    $.get('https://galvanize-cors.herokuapp.com/http://api.brewerydb.com/v2/locations?key=ce4d2d037906d953a49c8f9b9811830f&postalCode=' + zip)
    .then(data => {
      var numResults = data.totalResults;
      if (numResults === undefined) {
        numResults = 0;
      }
      postRating(numResults);
      postPicture(numResults);
    })
  })
}

function postRating(num) {
  if (num <= 3) {
    $(".rankingBar").attr("style", "background-color: green; height: " + num + "0%;");
  } else if (num <= 6) {
    $(".rankingBar").attr("style", "background-color: #FFD700; height: " + num + "0%;");
  } else {
    $(".rankingBar").attr("style", "background-color: red; height: " + num + "0%;");
  }
  if (num > 10) {
    if (swapping) {
      clearInterval(swap);
    }
    swapping = true;
    hipsterOverload();
  } else {
    resetCSS();
    if (swapping) {
      clearInterval(swap);
      swapping = false;
    }
  }
}

function postPicture(num) {
  if (num > 10) {
    var numRand = Math.floor(Math.random() * 21);
    $(".hipsterImage").attr("src", "Images/HipsterOverload/" + numRand + ".png");
  } else {
    $(".hipsterImage").attr("src", "Images/HipsterLevels/HipsterLevel" + num + ".png");
  }
}

function hipsterOverload() {
  overloading();
}

function resetCSS() {
  $("body").removeClass("overload");
  $("body").removeClass("overload1");
  $("header").removeClass("overload");
  $("header").removeClass("overload1");
  $("footer").removeClass("overload");
  $("footer").removeClass("overload1");
  $("h1").text("HipsterRadar!");
}

function overloading() {
  $("h1").text("HipsterOverload!");
  $("body").addClass("overload1");
  $("header").addClass("overload");
  $("footer").addClass("overload");
  var numRand = 0;
  var heightCycle = 110;
  var colors = 0;
  var colorCycle = ["red", "green", "#FFD700"];
  swap = setInterval(function() {
    $("body").toggleClass("overload");
    $("body").toggleClass("overload1");
    $("header").toggleClass("overload");
    $("header").toggleClass("overload1");
    $("footer").toggleClass("overload");
    $("footer").toggleClass("overload1");
    $(".hipsterImage").attr("src", "Images/HipsterOverload/" + numRand + ".png");
    numRand++;
    if (numRand === 21) {
      numRand = 0;
    }
    $(".rankingBar").attr("style", "background-color: " + colorCycle[colors] + "; height: " + heightCycle + "%;");
    heightCycle += 33;
    if (heightCycle > 125) {
      heightCycle -= 125;
    }
    colors++;
    if (colors === 3) {
      colors = 0;
    }
  }, 100);
}

// function getSearchData() {
//   $("#searchButton").click(function() {
//     var searchLocation = $(".searchBar").val();
//   });
// }
