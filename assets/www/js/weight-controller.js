/*var WeightValue = Kinvey.Entity.extend({
	// Overwrite the constructor to automatically link all instances to the events collection.
	constructor: function(attributes) {
		Kinvey.Entity.prototype.constructor.call(this, attributes, 'weight');
	},
	// Returns the weight
	getValue: function() {
		return this.get('value');
	},
	// Returns the date_added
	//getDateAdded: function() {
	//    return this.get('_kmd');
	//}

});*/


$("#weight_add").live('pageinit', function() {
	$("#changeWeightForm").submit(function(event){

		var timestamp = new Date().toISOString();
		var value = $('#weightValue').val();
		var weight = new Kinvey.Entity({
			value:     value,
			date_added: timestamp
		}, 'weight');
		/*new WeightValue({
			value:     value,
		}, 'weight');*/
		
		weight.save({
			success: function(weight) {
				//alert("success");
			},
			error: function(e) {
				alert("Unable to save! Please retry.");
			}
		});
		$('#weightValue').val("");
	});
});


$('#weight_list').live('pageshow',function(){

	//$('#busy').hide();
	$('#weightList').empty();
	
	var myQuery = new Kinvey.Query();
	myQuery.on('date_added').sort(Kinvey.Query.DESC);
	var myWeight = new Kinvey.Collection('weight');
	myWeight.setQuery(myQuery);
	
	myWeight.fetch({
    success: function(list) {
		var lastDate;
		
		for(var n=0; n<list.length; n++){
			
			var value = list[n].get("value");
			var newDate = new Date(list[n].get("date_added"));
			if(!lastDate || (newDate.getFullYear() != lastDate.getFullYear() || newDate.getMonth() != lastDate.getMonth() || newDate.getDate() != lastDate.getDate() )){
				lastDate = newDate;
				$('#weightList').append($('<li/>',{'data-role': "list-divider",'text': lastDate.toLocaleDateString()}));
			}
			
			$('#weightList').append($('<li/>',{'text': value+" kg"}));
		}
		$('#weightList').listview('refresh');
    },
    error: function(e) {
		alert("Unable to load the list!")

    }
	});
});