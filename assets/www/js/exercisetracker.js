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
	var myTrackID = 0;
	myTrack.save({
			success: function(myTrack) {
				myTrackID = myTrack.get("_id");
				if(myTrackID != 0){
					//alert("test");
					trackPosition(myTrackID);
				
				}else{
					alert("Unable to save!");
				}
			},
			error: function(e) {
				alert("Unable to save!");
			}
	});
	// Start tracking the User

    
    

});

function trackPosition(myTrackID){
	watchID = navigator.geolocation.watchPosition(
    
    	// Success
        function(position){
        		if(position.coords.accuracy<20){
			var myPosition = new Position({
					trackid: myTrackID,
			        latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    altitude: position.coords.altitude,
                    accuracy: position.coords.accuracy,
                    altitudeAccuracy: position.coords.altitudeAccuracy,
                    heading: position.coords.heading,
                    speed: position.coords.speed,
                    timestamp: position.timestamp
			});

			myPosition.save({
				success: function(t) {
					
				},
				error: function(e) {
					alert("Unable to save!");
				}
			});
/*
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
			*/
        		}
        },
        
        // Error
        function(error){
            console.log(error);
        },
        
        // Settings
        { frequency: 4000, enableHighAccuracy: true }
	);
	
	$("#track_id").hide();
	$("#tracklbl_id").hide();
    
    $("#startTracking_status").html("Tracking workout: <strong>" + track_id + "</strong>");
}



$("#startTracking_stop").live('click', function(){
	
	// Stop tracking the user
	if (watchID != null) {
		navigator.geolocation.clearWatch(watchID);
		watchID = null;
	}

	// Tidy up the UI
	$("#track_id").val("").show();
	$("#tracklbl_id").show();
	$("#startTracking_status").html("Stopped tracking workout: <strong>" + track_id + "</strong>");

});


$('#workout_history_ui').live('pageshow',function(){

	//$('#busy').hide();
	$('#workoutList').empty();
	
	var myQuery = new Kinvey.Query();
	myQuery.on('timestamp').sort(Kinvey.Query.DESC);
	var myTracks = new Kinvey.Collection('track');
	myTracks.setQuery(myQuery);
	
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

/*
$("#workout_detail_ui").live("pagebeforeshow", function(e, data){
    if ($.mobile.pageData && $.mobile.pageData.id){
        console.log("Parameter id=" + $.mobile.pageData.id);
    }
});
*/
$('#workout_detail_ui').live('pageshow',function(){

	//alert($.mobile.pageData.id);
	var myTrack = new Track();
	var myTrackID = $.mobile.pageData.id;
	myTrack.load(myTrackID,{
	
		success: function(myTrack){
			$("#trackdetail_lbl").text(myTrack.get("label"));
			var starttime = new Date(myTrack.get("timestamp"));
			var starttimeStr = starttime.toLocaleDateString() + "  " + starttime.getHours()+":"+starttime.getMinutes()+":"+starttime.getSeconds();
			$("#trackdetail_starttime").text(starttimeStr);
		},
		error: function(e){
			alert("Unable to Load Trackdetail");
		}
	
	});
	
	var myQuery = new Kinvey.Query();
	myQuery.on('trackid').equal(myTrackID);
	myQuery.on('timestamp').sort(Kinvey.Query.ASC);
	var myTrackPositions = new Kinvey.Collection('position');
	myTrackPositions.setQuery(myQuery);

	
	myTrackPositions.fetch({
		success: function(list) {
			
			// Calculate the total distance travelled
			total_km = 0;
			var t1 = list[0].get("timestamp");
			var t2 = list[(list.length - 1)].get("timestamp");
			var duration =  msToTime(t2 - t1);
			var myPath =[];
			$("#trackdetail_duration").text(duration);
			
			for(var n=0; n<list.length; n++){
				
				//$("#trackdetail_temp").append( n + " time: "+ list[n].get("timestamp") + "<br>"+n + " Lat: "+ list[n].get("latitude") + "<br>"+ n+" Long: " + list[n].get("longitude") + "<br>");
				myPath.push(new google.maps.LatLng(list[n].get("latitude"), list[n].get("longitude")));
	    		if(n < (list.length-1)){
					total_km += gps_distance(list[n].get("latitude"), list[n].get("longitude"), list[n+1].get("latitude"), list[n+1].get("longitude"));
				}
				
			}
			total_km_rounded = total_km.toFixed(3);
			$("#trackdetail_distance").text(total_km_rounded + " km");
			//$('#workoutList').listview('refresh');
			
			
			// Set the initial Lat and Long of the Google Map
			var myFirstPosition = new google.maps.LatLng(list[0].get("latitude"), list[0].get("longitude"));

			// Google Map options
			var myOptions = {
				streetViewControl: false,
				zoom: 17,
				center: myFirstPosition,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			
			
			// Create the Google Map, set options
			var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
			
			// Plot the GPS entries as a line on the Google Map
			var trackPath = new google.maps.Polyline({
			  path: myPath,
			  strokeColor: "#FF0000",
			  strokeOpacity: 1.0,
			  strokeWeight: 3
			});

			// Apply the line to the map
			trackPath.setMap(map);
			
		},
		
		error: function(e) {
			alert("Unable to load the list!")

		}
	
	});
	
	

});

function msToTime(s) {
  var ms = s % 1000;
  s = (s - ms) / 1000;
  var secs = s % 60;
  s = (s - secs) / 60;
  var mins = s % 60;
  var hrs = (s - mins) / 60;
  // + '.' + ms
  return hrs + 'h ' + mins + 'min' + secs +'sec';
}
