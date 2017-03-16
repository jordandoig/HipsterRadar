//Google maps API key
//AIzaSyCbLFtIwl7aH8u4vkTY0I0X5oZmLuezv3A

//Yelp
//Consumer key
//-JMYtpcAGrf1LmRKCV5IpQ
//Consumer Secret
//DgpUuc1DIve5fsY6EsqGQh67dU4
//Token
//aomdOa44QuYgNuNKB9P9wIeNMvatbI03
//Token Secret
//zYCM9mUp7luRkgXO_JIcgNroKyE

var swapping = false;

var loc = {
  lat: 39.7392,
  lng: -104.9903
};

postPicture(39);
postRating(39);

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
  var latLng = loc.lat.toString() + "," + loc.lng.toString();
  var count = 0;
  $.post("https://yelp-api-q1.herokuapp.com/search/", {
    location: latLng,
    "radius_filter": 1000,
    'category_filter': 'breweries,vinyl_records,divebars,comicbooks,bikes,musicvenues,usedbooks,barbers,thrift_stores,tattoo,vegan,vintage'
  }, function(data) {
    count += parseInt(data.total);
    postRating(count);
    postPicture(count);
  });
}

function postRating(number) {
  var num = Math.round(number * (10 / 6));
  if (num <= 33) {
    $(".rankingBar").attr("style", "background-color: green; height: " + num + "%;");
  } else if (num <= 66) {
    $(".rankingBar").attr("style", "background-color: yellow; height: " + num + "%;");
  } else {
    $(".rankingBar").attr("style", "background-color: red; height: " + num + "%;");
  }
  if (num > 100) {
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

function postPicture(number) {
  var num = Math.round(number / 6);
  if (num > 10) {
    var numRand = Math.floor(Math.random() * 21);
    $(".hipsterImage").attr("src", "Images/HipsterOverload/" + numRand + ".png");
  } else {
    $(".hipsterImage").attr("src", "Images/HipsterLevels/HipsterLevel" + num + ".png");
  }
}

function hipsterOverload() {
  // $("body").addClass("overload");
  overloading();
}

function resetCSS() {
  $("body").removeClass("overload");
  $("body").removeClass("overload1");
  $("header").removeClass("overload");
  $("header").removeClass("overload1");
  $("footer").removeClass("overload");
  $("footer").removeClass("overload1");
}

function overloading() {
  $("h1").text("HipsterOverload!");
  $("body").addClass("overload1");
  $("header").addClass("overload");
  $("footer").addClass("overload");
  var numRand = 0;
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
  }, 100);
}
