			
			
			//$('#home').live('pageinit',function(){initDB();});
			//$('#weight_list').on('pageinit',function(){getWeightList();});
			//$('#weight_list').live('pageshow',function(){getWeightList();});
			$("#weight_add").live('pageinit', function() {
				$("#changeWeightForm").submit(function(event){
				
				//changeWeight();});
				//document.changeWeightForm.submit.click(changeWeightForm());
				
				//$('#changeWeightForm').submit.click(changeWeightForm());
			});
			
			
			//$(document).on('pageinit', '#trackRoute', function(){
			//	onTrackRoute();	
			//});

			var mobileDemo = { 'center': '57.7973333,12.0502107', 'zoom': 10 };
				
			////////////////////////////////////////////////////////////
			
			$('#basic_map').live('pageinit', function() {
				var options = { timeout: 1500, enableHighAccuracy: true };
				watchID = navigator.geolocation.watchPosition(onSuccessTracking, onErrorTracking, options);
				/*
				$('#map_canvas').gmap({'center': mobileDemo.center, 'zoom': mobileDemo.zoom, 'disableDefaultUI':true, 'callback': function() {
					var self = this;
					self.addMarker({'position': this.get('map').getCenter() }).click(function() {
						self.openInfoWindow({ 'content': 'Hello World!' }, this);
					});
				}}); 
				*/
			});
			$('#test').live('pageinit', function(){
				var options = { timeout: 1500, enableHighAccuracy: true };
				watchID = navigator.geolocation.watchPosition(onSuccessTracking, onErrorTracking, options);
			});
			
			$('#basic_map').live('pageshow', function() {
				$('#map_canvas').gmap('refresh');
			});
			
			//$('#basic_map').live('pagebeforeshow',function(e,data){ 
			//	$('#map_canvas').height($(window).height() - (10 + $('[data-role=header]').height() - $('[data-role=footer]').height())); 
			//});

			
			
			
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