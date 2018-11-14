
// var location;
var map, infoWindow;
var defaultCenter = {
    lat: 1.343093699999999,
    lng: 103.68089499999999
};
var responseArray = [];
var directionArray =[];
var landmarks_name = [];
var landmarks_coordinates= [];
var landmarks_labels =[];
var my_position;
//var latLngArray = [];
var route = [];

//initialization part
// if (str.length == 0) {

        // return;
function hide_cards(){
    document.getElementById("card_segment").innerHTML = " ";
}
function card(img_url, card_title){
    var string = '<div class="col-sm-4">';
    string += '<div class="card">';
    string += '<img class="card-img-top img-thumbnail rounded" src=' + img_url + '>';
    string +=   '<div class="card-body">';
    string +=       '<h5 class="card-title">' + card_title + '</h5>';
    string +=   '</div>';
    string += '</div></div>';
    return string;
}
function show_cards(){

    // var image_url ="{% static 'Dmap/images/NDC_to_NH/1.351272,103.688468.jpeg' %}";
    // var image_url = '/static/Dmap/images/NDC_to_NH/1.351272,103.688468.jpeg';
    var base_url = '/static/Dmap/images/Key_landmarks/';
    var ext = ".jpg";
    var length = landmarks_name.length;
    var no_cards = Math.min(length,3 );
    console.log("getting cards information");
    var full_html = "";


    for(var i=0; i < no_cards; i++) {
        title = landmarks_name[i];
        title_name = landmarks_labels[i] + ": " + title.replace(/_/g, ' ');
        string = card(base_url + title + ext, title_name);

        console.log(string);
        full_html += string;
        // console.log(base_url + title + ext);
    }

    console.log("end of cards information");
    document.getElementById("card_segment").innerHTML =full_html;
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setPosition);
    } else {
        console.log("Geo Location not supported by browser");
    }
    return navigator.geolocation.getCurrentPosition(setPosition)
}

//function that retrieves the position
function setPosition(position) {
    var _location = {
        lng: position.coords.longitude,
        lat: position.coords.latitude
    }
    console.log("hi")
    console.log(_location)
    $.post(loc_url, _location, function(response){

    });
}


function initMap() {
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;


    map = new google.maps.Map(document.getElementById('map'),
        {
            center:defaultCenter,
            zoom:30
        });
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            var marker = new google.maps.Marker({
                position: pos,
                title: "Current Location",
                map: map
            });

            my_position = pos;
            // infoWindow.setPosition(pos);
            //
            // infoWindow.open(map);
            map.setCenter(pos);
            min_lat = pos.lat - 0.0001;
            min_lng = pos.lng - 0.0001;
            max_lat = pos.lat + 0.0001;
            max_lng = pos.lng + 0.0001;
            var southWestBound = new google.maps.LatLng(min_lat, min_lng);
            var northEastBound = new google.maps.LatLng(max_lat, max_lng);

            var bounds = new google.maps.LatLngBounds(southWestBound, northEastBound);
            map.fitBounds(bounds);
            document.getElementById('start').value = pos.lat + "," + pos.lng;
        }, function () {
            handleLocationError(true, infoWindow, defaultCenter);
        });
    }else{
            handleLocationError(false, infoWindow, defaultCenter);
    }
    directionsDisplay.setMap(map);

    var onChangeHandler = function() {
          calculateAndDisplayRoute(directionsService, directionsDisplay);
//          updatePath(); //Update path done in the next function
        };
    document.getElementById('go').addEventListener('click', onChangeHandler);
}
function getMap(){
    initMap();
    var mapProp= {
    center:new google.maps.LatLng(defaultCenter['lat'], defaultCenter['lng']),
    zoom:12,
    };
    map = new google.maps.Map(document.getElementById("map"),mapProp);
}
function calculateAndDisplayRoute(directionsService, directionsDisplay){
    /*Check if there is any error..*/

    /*Todo: Add checks on the restriction of the place.*/

    console.log("calculateAndDisplayRoute");
    var start = document.getElementById('start').value;
    var end = document.getElementById('end').value;
    var mode = document.getElementById('mode').value;

    var data = {
        'start': start,
        'end': end,
        'mode': mode
    };
    //Send start, end and mode to the server..

//    $.post(route_url, data, function(response){
//
//        asyncWait();
//
//        responseString = response.toString();
//        responseString = responseString.substring(2,responseString.length - 2);
//        responseArray = responseString.split('\', \'');
//   });
    //Todo: Add buffer screen while waiting for result..
    console.log("Getting route from the server..")
    $.post(route_url, data).done(function(data){
        console.log(typeof data);
        result = data.toString();
        // console.log("Here")
        console.log(result);

        response = result.split('*');
        responseArray = response[0];
        responseArray = responseArray.split(",");
        console.log(responseArray);
        //
        //
        directionArray = response[1];
        directionArray = directionArray.split(",");
        console.log(directionArray);
        // landmarks = response[1];

        // console.log(landmarks);
        // landmarks = response[2]
        // landmarks= landmarks.split('&');

        landmarks_name = response[2];
        landmarks_name =  landmarks_name.split(",");
        console.log(landmarks_name);
        landmarks_coordinates = response[3];
        landmarks_coordinates = landmarks_coordinates.split(",");
        console.log(landmarks_coordinates);
        // responseArray = result.split(",");


        // responseArray = result.split(",");
        // console.log(responseArray);


        updateLandmark();
        updatePath();
        updateDirections();
    });

        //latLngArray = new google.maps.LatLng(parseFloat(responseArray[0]),parseFloat(responseArray[1]));
        //console.log('asd')
//        console.log(typeof parseFloat(responseArray[0]));
//        console.log(parseFloat(responseArray[0]));



}

function updateLandmark(){
    console.log("Updating landmark locations..");
    var _length = landmarks_name.length;
    console.log(_length);
    var label_char = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    // console.log(first_char);
    for(var i = 0; i < _length; i++){
        console.log(i);
        var _lat = parseFloat(landmarks_coordinates[i*2]);
        var _lng = parseFloat(landmarks_coordinates[i*2+1]);
        console.log(_lat);
        console.log(_lng);
        landmarks_labels[i] = label_char[i%label_char.length];
        console.log(landmarks_labels[i]);
        var marker = new google.maps.Marker({
            position: {lat: _lat, lng: _lng},
            title: landmarks_name[i],
            label: label_char[i%label_char.length],
            map: map
        });
        console.log(i);
    }

    show_cards();


}
function updatePath(){
    if(route.length != 0){
        removePath();
    }
    route = new google.maps.Polyline({
        //latLngArray,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
    });
    console.log(route);
    route.setMap(map);
    var path = route.getPath();
    var length = responseArray.length;

    var min_lat = 200, min_lng=200;
    var max_lat = -200, max_lng=-200;

    for(var i = 0; i < length; i += 2) {
        // console.log(responseArray[i])
        var _lat = parseFloat(responseArray[i]);
        var _lng = parseFloat(responseArray[i+1]);

        if(min_lat > _lat){min_lat = _lat;}
        if(min_lng > _lng){min_lng = _lng;}
        if(max_lat < _lat){max_lat = _lat;}
        if(max_lng < _lng){max_lng = _lng;}


        // console.log(_lat);
        // console.log(_lng);
        var _latlng = {lat:_lat, lng:_lng};
        latlng = new google.maps.LatLng(_latlng);
        path.push(latlng);
    }
//    console.log(path)
    route.setPath(path);
    route.setMap(map);
    if (length !=0){
        //If there is no route information (initial case)
        console.log(min_lng);
        console.log(max_lng);
        var southWestBound = new google.maps.LatLng(min_lat, min_lng);
        var northEastBound = new google.maps.LatLng(max_lat, max_lng);

        var bounds = new google.maps.LatLngBounds(southWestBound, northEastBound);
        map.fitBounds(bounds);
    }   // var marker = new google.maps.Marker({

    //     position: defaultCenter,
    //     title: "LALALA" + path.getLength(),
    //     map: map
    // });
    google.maps.event.trigger(map, 'resize');

}

function updateDirections(){
    direction_bar = document.getElementById("directions")

    var full_html = "";

    //Todo: iterate
    for(var i = 0; i < directionArray.length; i++) {
        var direction = directionArray[i];
        var direction_string = '<li class="list-group-item">' + direction + '</li>';
        full_html += direction_string;
    }



    direction_bar.innerHTML = full_html;
    console.log(direction_string);
    // direction_bar.add(direction_string);
}

function removePath(){
    route.setMap(null);
}


//request for location
getLocation();
//
//

console.log("okay so far..")


