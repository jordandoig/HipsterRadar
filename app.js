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

var loc = {
  lat: 39.7392,
  lng: -104.9903
};

function getMap () {
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



function getData (loc) {
  $.post("https://cors-anywhere.herokuapp.com/https://api.yelp.com/v2/search/?cll=" + loc.lat + "," + loc.lng + "&category_filter=breweries");
}
