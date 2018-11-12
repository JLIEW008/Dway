
// var location;
var map, infoWindow;
var defaultCenter = {
    lat: 1.343093699999999,
    lng: 103.68089499999999
};

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
    // console.log("hi")
    console.log(_location)
    $.post(loc_url, _location, function(response){
        // if(response==='success'){ conso}
        // else{alert("Noooooo");}
    });
    // location = _location
    // console.log("hi")
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
            map.setCenter(pos)
            document.getElementById('start').value = pos.lat + "," + pos.lng;
        }, function () {
            handleLocationError(true, infoWindow, defaultCenter)
        });
    }else{
            handleLocationError(false, infoWindow, defaultCenter);
    }
    directionsDisplay.setMap(map)

    var onChangeHandler = function() {
          calculateAndDisplayRoute(directionsService, directionsDisplay);
        };
    document.getElementById('go').addEventListener('click', onChangeHandler);

}

function calculateAndDisplayRoute(directionsService, directionsDisplay){
    /*Check if there is any error..*/

    /*Todo: Add checks on the restriction of the place.*/

    console.log("calculateAndDisplayRoute")
    var start = document.getElementById('start').value;
    var end = document.getElementById('end').value;
    var mode = document.getElementById('mode').value;

    var data = {
        'start': start,
        'end': end,
        'mode': mode
    };
    //Send start, end and mode to the server..

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




//request for location
getLocation();
//
//

console.log("okay so far..")
