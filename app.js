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
    console.log(loc);
    getData();
  });
}

function getData (data) {
  var timestamp = getTimestamp();
  console.log(timestamp);
  var nonce = getNonce();
  console.log(nonce);
  $.get("https://galvanize-cors.herokuapp.com/https://api.yelp.com/v2/search/?oauth_consumer_key=-JMYtpcAGrf1LmRKCV5IpQ&oauth_token=aomdOa44QuYgNuNKB9P9wIeNMvatbI03&oauth_signature_method=HMAC-SHA1&oauth_timestamp=" + timestamp + "&oauth_nonce=" + nonce + "&oauth_version=1.0&oauth_signature=zYCM9mUp7luRkgXO_JIcgNroKyE=&location=Denver, CO&category_filter=breweries");
}

function getTimestamp () {
  return Math.floor(Date.now() / 1000);
}

function getNonce () {
  return Math.floor(Math.random() * 1000000);
}

console.log(getData());
