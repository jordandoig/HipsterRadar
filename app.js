//Google maps API key
//AIzaSyCbLFtIwl7aH8u4vkTY0I0X5oZmLuezv3A

//Yelp
//Consumer key
//-JMYtpcAGrf1LmRKCV5IpQ
//Consumer Secret
//DgpUuc1DIve5fsY6EsqGQh67dU4
//Token
//As1Vd07pR30RfoqqVT9ZK_6urD_D56dB
//Token Secret
//x9kDLVJfCnrkNc220GQG3dOx-9k

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
