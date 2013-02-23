var tblWeightName = 'tbl_weight';

// Populate the database 
//
function populateWeightTable(tx) {
	tx.executeSql('DROP TABLE IF EXISTS '+tblWeightName);
	var sql = 
		"CREATE TABLE IF NOT EXISTS "+tblWeightName+" ( "+
		"id INTEGER PRIMARY KEY AUTOINCREMENT, " +
		"value FLOAT, " +
		"date_added TIMESTAMP DEFAULT (datetime('now','localtime')))";
	
	//var sql = 
	//	"CREATE TABLE IF NOT EXISTS weight ( "+
	//	"id unique, " +
	//	"value)";
	tx.executeSql(sql);
/* 	tx.executeSql("INSERT INTO "+tblWeightName+"(value) VALUES('81.4')");
	tx.executeSql("INSERT INTO "+tblWeightName+"(value) VALUES('80.9')");
	tx.executeSql("INSERT INTO "+tblWeightName+"(value) VALUES('80.4')");
 */
}

// Query the database
//
/* function queryDB(tx) {
	tx.executeSql('SELECT * FROM weight', [], querySuccess, errorCB);
} */

// Query the success callback
//
/* function querySuccess(tx, results) {
	var len = results.rows.length;
	console.log("WEIGHT table: " + len + " rows found.");
	for (var i=0; i<len; i++){
		console.log("Row = " + i + " ID = " + results.rows.item(i).id + " Data =  " + results.rows.item(i).data);
	}
} */
function changeWeight(){
	db.transaction(_changeWeight, transaction_error);
}

function getWeightList(){
	db.transaction(_getWeightList, transaction_error);
}

function _changeWeight(tx) {
	tx.executeSql("INSERT INTO "+tblWeightName+"(value) VALUES("+$('#weightValue').val()+")");
//	var sql = "select e.id, e.firstName, e.lastName, e.title, e.picture, count(r.id) reportCount " + 
//				"from employee e left join employee r on r.managerId = e.id " +
//				"group by e.id order by e.lastName, e.firstName";
}

function _getWeightList(tx) {
	var sql = "select w.id, w.value, w.date_added from "+tblWeightName+" w order by w.date_added";
//	var sql = "select e.id, e.firstName, e.lastName, e.title, e.picture, count(r.id) reportCount " + 
//				"from employee e left join employee r on r.managerId = e.id " +
//				"group by e.id order by e.lastName, e.firstName";
	tx.executeSql(sql, [], getWeightList_success);
}

function getWeightList_success(tx, results) {
	$('#busy').hide();
	$('#weightList').empty();
	var len = results.rows.length;
	var lastDate;
	for (var i=0; i<len; i++) {
		var weight = results.rows.item(i);

/*		$('#weightList').append($('<li/>', {    //here appending `<li>`
			//'data-role': "list-divider"
				}).append($('<a/>', {    //here appending `<a>` into `<li>`
					'href': '#',
				//    'data-transition': 'slide',
					'text': weight.value
				})));
*/
		var newDate = new Date(weight.date_added);
		
		if(!lastDate || (newDate.getFullYear() != lastDate.getFullYear() && newDate.getMonth() != lastDate.getMonth() && newDate.getDate() != lastDate.getDate() )){
			lastDate = newDate;
			$('#weightList').append($('<li/>',{'data-role': "list-divider",'text': lastDate.toLocaleDateString()}));
		}
		
		$('#weightList').append($('<li/>',{'text': weight.value+" kg"}));
		//$('#weightList').append('<li>'+weight.value+'</li>');
//		<a href="employeedetails.html?id=' + employee.id + '">' +
//		'<img src="pics/' + employee.picture + '" class="list-icon"/>' +
//		'<p class="line1">' + employee.firstName + ' ' + employee.lastName + '</p>' +
//		'<p class="line2">' + employee.title + '</p>' +
//		'<span class="bubble">' + employee.reportCount + '</span></a>
	}
	$('#weightList').listview('refresh');
	db = null;
}


// Transaction error callback
//
/*  function errorCB(err) {
	console.log("Error processing SQL: "+err.code);
}  */

// Transaction success callback
//
/* function successCB() {
	var db = window.openDatabase("BodyPerformer", "1.0", "Body Performer DB", 5242880);
	db.transaction(queryDB, errorCB);
} */
