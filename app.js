//Google maps API key
//AIzaSyCbLFtIwl7aH8u4vkTY0I0X5oZmLuezv3A

// $(document).ready(function(){
//   getMap();
// });

//var src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCbLFtIwl7aH8u4vkTY0I0X5oZmLuezv3A";

var map = document.querySelector(".googleMap");

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
  });
}

// function myMap() {
//   var mapProp = {
//     center: new google.maps.LatLng(39.7392, -104.9903),
//     zoom: 13,
//   };
//   var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
// }
// var src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCbLFtIwl7aH8u4vkTY0I0X5oZmLuezv3A&callback=myMap";
