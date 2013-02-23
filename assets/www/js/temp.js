			
			
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
