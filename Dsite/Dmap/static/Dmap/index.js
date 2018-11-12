
// var location;
var map, infoWindow;
var defaultCenter = {
    lat: 1.343093699999999,
    lng: 103.68089499999999
};
<<<<<<< HEAD

=======
var responseArray = [];
//var latLngArray = [];
var route = [];
>>>>>>> 3bb0cd3da905fa9676cd51bfd60e9b4f52616be1
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
<<<<<<< HEAD
    // console.log("hi")
    console.log(_location)
    $.post(loc_url, _location, function(response){
        // if(response==='success'){ conso}
        // else{alert("Noooooo");}
    });
    // location = _location
    // console.log("hi")
=======
    console.log("hi")
    console.log(_location)
    $.post(loc_url, _location, function(response){

    });
>>>>>>> 3bb0cd3da905fa9676cd51bfd60e9b4f52616be1
}


function initMap() {
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;


    map = new google.maps.Map(document.getElementById('map'),
        {
            center:defaultCenter,
            zoom:30
        });
    infoWindow = new google.maps.InfoWindow;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);

            infoWindow.open(map);
<<<<<<< HEAD
            map.setCenter(pos)
            document.getElementById('start').value = pos.lat + "," + pos.lng;
        }, function () {
            handleLocationError(true, infoWindow, defaultCenter)
=======
            map.setCenter(pos);
            document.getElementById('start').value = pos.lat + "," + pos.lng;
        }, function () {
            handleLocationError(true, infoWindow, defaultCenter);
>>>>>>> 3bb0cd3da905fa9676cd51bfd60e9b4f52616be1
        });
    }else{
            handleLocationError(false, infoWindow, defaultCenter);
    }
<<<<<<< HEAD
    directionsDisplay.setMap(map)

    var onChangeHandler = function() {
          calculateAndDisplayRoute(directionsService, directionsDisplay);
        };
    document.getElementById('go').addEventListener('click', onChangeHandler);

}

=======
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
>>>>>>> 3bb0cd3da905fa9676cd51bfd60e9b4f52616be1
function calculateAndDisplayRoute(directionsService, directionsDisplay){
    /*Check if there is any error..*/

    /*Todo: Add checks on the restriction of the place.*/

<<<<<<< HEAD
    console.log("calculateAndDisplayRoute")
=======
    console.log("calculateAndDisplayRoute");
>>>>>>> 3bb0cd3da905fa9676cd51bfd60e9b4f52616be1
    var start = document.getElementById('start').value;
    var end = document.getElementById('end').value;
    var mode = document.getElementById('mode').value;

    var data = {
        'start': start,
        'end': end,
        'mode': mode
    };
    //Send start, end and mode to the server..

<<<<<<< HEAD
    $.post(route_url, data, function(response){
        if(response==='success'){ alert("Yay!");}
        else{alert("Noooooo");}
    });


    var searchFromNTUtoNTU = false;
    if (!searchFromNTUtoNTU) {
        directionsService.route({
                origin: start,
                destination: end,
                travelMode: mode
            },
            function (response, status) {
                if (status === 'OK') {
                    directionsDisplay.setDirections(response);
                } else {
                    window.alert('Directions request failed due to ' + status);
                }
            }
        )
    } else{
        //Perform search from NTU website..

    }

}
function checkLocationNTU(location){
    /*The app should only work for search that starts with or
    end with NTU.


    * */

}
function getLastBusStop(response){
    /* A regex search to be implemented to search for last bus
    stop
     */
}


=======
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
        console.log(data);
        result = data.toString();
        console.log(result);
        result = result.substring(3,result.length - 3);
        result = result.split(", [['").join();
        console.log(result)
        responseArray = result.split("\', \'");
        console.log(responseArray);


//        console.log(result)
//        result = result.substring(2,result.length - 2);
//        console.log(result)
//        result = result.replace("[", "");
//        result = result.replace("[", "");
//        console.log(result);
//        result = result.replace("]", "");
//        result = result.replace("]", "");
//        console.log(result);

//        console.log(result);
//        result = result.split(" ", "").join();
//        console.log(result)
//        result = result.split("'").join();
//        console.log(result);
//        result = result.split(",");
//        result = result.split(",")
//        console.log(result);
//        result = result.filter(Boolean);
//        result = result.filter(" ");
//        console.log(result);
//        responseArray = result;
//        result = result.split(" ").join();
//        console.log(result);
//        result = result.split(",");
//        console.log(result);
//        responseArray = result;
//        p = re.compile("")
//        var re = /[0-9]{1,3}[.][0-9]{3,11}*/g;
//        console.log(result)
//        responseArray = re.exec(result);
//        console.log(responseArray);
//        console.log(responseArray);
//        responseArray = result.split('\',\'');
//        console.log(result)
        updatePath();
    });

        //latLngArray = new google.maps.LatLng(parseFloat(responseArray[0]),parseFloat(responseArray[1]));
        //console.log('asd')
//        console.log(typeof parseFloat(responseArray[0]));
//        console.log(parseFloat(responseArray[0]));



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
    for(var i = 0; i < length; i += 2) {
        console.log(responseArray[i])
        var _lat = parseFloat(responseArray[i]);
        var _lng = parseFloat(responseArray[i+1]);

        console.log(_lat);
        console.log(_lng);
        var _latlng = {lat:_lat, lng:_lng};
        latlng = new google.maps.LatLng(_latlng);
        path.push(latlng);
    }
//    console.log(path)
    route.setPath(path);
    route.setMap(map);

    var marker = new google.maps.Marker({
        position: defaultCenter,
        title: "LALALA" + path.getLength(),
        map: map
    });
    google.maps.event.trigger(map, 'resize');

}

function removePath(){
    route.setMap(null);
}
>>>>>>> 3bb0cd3da905fa9676cd51bfd60e9b4f52616be1


//request for location
getLocation();
//
//

console.log("okay so far..")
<<<<<<< HEAD
=======


>>>>>>> 3bb0cd3da905fa9676cd51bfd60e9b4f52616be1
