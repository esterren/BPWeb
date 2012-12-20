 //document.addEventListener("deviceready", onDeviceReady, false);

    // Cordova is ready
    //
    function onTrackRoute() {
	
		//var latlng = new google.maps.LatLng(57.7973333, 12.0502107);
        //var myOptions = {
        //        zoom: 8,
        //        center: latlng,
        //        mapTypeId: google.maps.MapTypeId.ROADMAP
        //    };
		//var map = new google.maps.Map(document.getElementById("map_canvas"),myOptions);
		var yourStartLatLng = new google.maps.LatLng(59.3426606750, 18.0736160278);
        $('#map_canvas').gmap({'center': yourStartLatLng});
		//$('#map_canvas').gmap('addMarker', {'position': '57.7973333,12.0502107', 'bounds': true}).click(function() {
     	//$('#map_canvas').gmap('openInfoWindow', {'content': 'Hello World!'}, this);
        //});
        //navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }

    // onSuccess Geolocation
    //
    function onSuccess(position) {
        var element = document.getElementById('geolocation');
        element.innerHTML = 'Latitude: '           + position.coords.latitude              + '<br />' +
                            'Longitude: '          + position.coords.longitude             + '<br />' +
                            'Altitude: '           + position.coords.altitude              + '<br />' +
                            'Accuracy: '           + position.coords.accuracy              + '<br />' +
                            'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
                            'Heading: '            + position.coords.heading               + '<br />' +
                            'Speed: '              + position.coords.speed                 + '<br />' +
                            'Timestamp: '          +                                   position.timestamp          + '<br />';
        
        
//	      $('#map_canvas').gmap('addMarker', {'position': position.coords.latitude+","+position.coords.longitude, 'bounds': true}).click(function() {
//	    	$('#map_canvas').gmap('openInfoWindow', {'content': 'Hello World!'}, this);
//	      });        
//        $('#map_canvas').gmap('addMarker', {'position': '57.7973333,12.0502107', 'bounds': true}).click(function() {
//        	$('#map_canvas').gmap('openInfoWindow', {'content': 'Hello World!'}, this);
//        });
    }

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
                'message: ' + error.message + '\n');
    }