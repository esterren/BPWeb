var watchID = null;
var track_id = ''; 

var Position = Kinvey.Entity.extend({
	// Overwrite the constructor to automatically link all instances to the events collection.
	constructor: function(attributes) {
		Kinvey.Entity.prototype.constructor.call(this, attributes, 'position');
	},
	// Returns the latitude
	getLatitude: function() {
		return this.get('latitude');
	},
	// Returns the longitude
	getLongitude: function() {
		return this.get('longitude');
	},
	
	// Returns the altitude
	getAltitude: function() {
		return this.get('altitude');
	},
	// Returns the accuracy
	getAccuracy: function() {
		return this.get('accuracy');
	},
	// Returns the altitudeAccuracy
	getAltitudeAccuracy: function() {
		return this.get('altitudeAccuracy');
	},
	// Returns the heading
	getHeading: function() {
		return this.get('heading');
	},
	// Returns the speed
	getSpeed: function() {
		return this.get('speed');
	},
	// Returns the timestamp
	getTimestamp: function() {
		return this.get('timestamp');
	}

});
	

var Track = Kinvey.Entity.extend({
	// Overwrite the constructor to automatically link all instances to the events collection.
	constructor: function(attributes) {
		Kinvey.Entity.prototype.constructor.call(this, attributes, 'track');
	},
	// Returns the Track label
	getLabel: function() {
		return this.get('label');
	},
	// Returns the timestamp
	getLabel: function() {
		return this.get('timestamp');
	}
});

function gps_distance(lat1, lon1, lat2, lon2)
{
	// http://www.movable-type.co.uk/scripts/latlong.html
    var R = 6371; // km
    var dLat = (lat2-lat1) * (Math.PI / 180);
    var dLon = (lon2-lon1) * (Math.PI / 180);
    var lat1 = lat1 * (Math.PI / 180);
    var lat2 = lat2 * (Math.PI / 180);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c;
    
    return d;
}

$("#startTracking_start").live('click', function(){
    
	// Tidy up the UI
    track_id = $("#track_id").val();
	if(track_id === ""){
		track_id= "T_"+new Date().getTime();
	}
	
	var timestamp = new Date().toISOString();
	var myTrack = new Track({label: track_id,timestamp: timestamp});
		
	// Start tracking the User
    watchID = navigator.geolocation.watchPosition(
    
    	// Success
        function(position){
			var myPosition = new Position({
				
			        latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    altitude: position.coords.altitude,
                    accuracy: position.coords.accuracy,
                    altitudeAccuracy: position.coords.altitudeAccuracy,
                    heading: position.coords.heading,
                    speed: position.coords.speed,
                    timestamp: position.timestamp
			});

			// 

			var myRelTrackPos = new Kinvey.Entity({
				track: myTrack,
				position: myPosition
			}, 'rel-track-pos');
			
			
			myRelTrackPos.save({
			success: function(weight) {
				//alert("success");
			},
			error: function(e) {
				alert("Unable to save!");
			}
		});
            //tracking_data.push(position);
        },
        
        // Error
        function(error){
            console.log(error);
        },
        
        // Settings
        { frequency: 3000, enableHighAccuracy: true });
    
    
    $("#track_id").hide();
	$("#tracklbl_id").hide();
    
    $("#startTracking_status").html("Tracking workout: <strong>" + track_id + "</strong>");
});


$("#startTracking_stop").live('click', function(){
	
	// Stop tracking the user
	if (watchID != null) {
		alert("test");
		navigator.geolocation.clearWatch(watchID);
		watchID = null;
	}
	
	// Save the tracking data
	//window.localStorage.setItem(track_id, JSON.stringify(tracking_data));

	// Reset watchID and tracking_data 
	var watchID = null;
	//var tracking_data = null;

	// Tidy up the UI
	$("#track_id").val("").show();
	$("#tracklbl_id").show();
	$("#startTracking_status").html("Stopped tracking workout: <strong>" + track_id + "</strong>");

});


$('#workout_history_ui').live('pageshow',function(){

	//$('#busy').hide();
	$('#workoutList').empty();
	
	var myTracks = new Kinvey.Collection('track');
	myTracks.fetch({
		success: function(list) {
		var lastDate;
		
		for(var n=0; n<list.length; n++){
			
			var label = list[n].get("label");
			var newDate = new Date(list[n].get("timestamp"));
			if(!lastDate || (newDate.getFullYear() != lastDate.getFullYear() || newDate.getMonth() != lastDate.getMonth() || newDate.getDate() != lastDate.getDate() )){
				lastDate = newDate;
				$('#workoutList').append($('<li/>',{'data-role': "list-divider",'text': lastDate.toLocaleDateString()}));
			}
			
			//$('#workoutList').append($('<li/>',{'text': label}));
			
			$('#workoutList').append($('<li/>', {}).append($('<a/>', {    //here appending `<a>` into `<li>`
					'href': "#workout_detail_ui?id="+list[n].get("_id"),
					'text': label
				})));
			
		}
		$('#workoutList').listview('refresh');
		
		
		},
		
		error: function(e) {
			alert("Unable to load the list!")

		}
	
	});
	
	
});




$("#workout_detail_ui").live("pagebeforeshow", function(e, data){
    if ($.mobile.pageData && $.mobile.pageData.id){
        console.log("Parameter id=" + $.mobile.pageData.id);
    }
});




//###############################################################

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
    function onSuccessTracking(position) {
		
        var element = document.getElementById('geolocation');
        element.innerHTML = 'Latitude: '           + position.coords.latitude              + '<br />' +
                            'Longitude: '          + position.coords.longitude             + '<br />' +
                            'Altitude: '           + position.coords.altitude              + '<br />' +
                            'Accuracy: '           + position.coords.accuracy              + '<br />' +
                            'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
                            'Heading: '            + position.coords.heading               + '<br />' +
                            'Speed: '              + position.coords.speed                 + '<br />' +
                            'Timestamp: '          + position.timestamp						+ '<br />';
        /* var myOptions = {
                zoom: 12,
                center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                mapTypeId: google.maps.MapTypeId.ROADMAP
        }; */
		$('#map_canvas').gmap({'center': new google.maps.LatLng(position.coords.latitude, position.coords.longitude), 'zoom': 20, 'disableDefaultUI':true, 'callback': function() {
			var self = this;
			/* self.addMarker({'position': this.get('map').getCenter() }).click(function() {
				self.openInfoWindow({ 'content': 'Hello World!' }, this);
			}); */
		}}); 
		
//	      $('#map_canvas').gmap('addMarker', {'position': position.coords.latitude+","+position.coords.longitude, 'bounds': true}).click(function() {
//	    	$('#map_canvas').gmap('openInfoWindow', {'content': 'Hello World!'}, this);
//	      });        
//        $('#map_canvas').gmap('addMarker', {'position': '57.7973333,12.0502107', 'bounds': true}).click(function() {
//        	$('#map_canvas').gmap('openInfoWindow', {'content': 'Hello World!'}, this);
//        });
    }

    // onError Callback receives a PositionError object
    //
    function onErrorTracking(error) {
        alert('code: '    + error.code    + '\n' +
                'message: ' + error.message + '\n');
    }