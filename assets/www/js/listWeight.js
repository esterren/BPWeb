var db;
var dbCreated = false;


document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    db = window.openDatabase("BodyPerformer", "1.0", "Body Performer DB", 5242880);
    if (dbCreated)
    	db.transaction(getWeightList, transaction_error);
    else
    	db.transaction(populateDB, transaction_error, populateDB_success);
}

function transaction_error(tx, error) {
	$('#busy').hide();
    alert("Database Error: " + error);
}

function populateDB_success() {
	dbCreated = true;
    db.transaction(getWeightList, transaction_error);
}

function getWeightList(tx) {
	var sql = "select w.id, w.value from weight w order by e.id";
//	var sql = "select e.id, e.firstName, e.lastName, e.title, e.picture, count(r.id) reportCount " + 
//				"from employee e left join employee r on r.managerId = e.id " +
//				"group by e.id order by e.lastName, e.firstName";
	tx.executeSql(sql, [], getWeightList_success);
}

function getWeightList_success(tx, results) {
	$('#busy').hide();
    var len = results.rows.length;
    for (var i=0; i<len; i++) {
    	var weight = results.rows.item(i);
		$('#WeightList').append('<li>'+weight.value'</li>');
//		<a href="employeedetails.html?id=' + employee.id + '">' +
//		'<img src="pics/' + employee.picture + '" class="list-icon"/>' +
//		'<p class="line1">' + employee.firstName + ' ' + employee.lastName + '</p>' +
//		'<p class="line2">' + employee.title + '</p>' +
//		'<span class="bubble">' + employee.reportCount + '</span></a>
    }
	db = null;
}

function populateDB(tx) {
	$('#busy').show();
	//tx.executeSql('DROP TABLE IF EXISTS employee');
	var sql = 
		"CREATE TABLE IF NOT EXISTS weight ( "+
		"id INTEGER PRIMARY KEY AUTOINCREMENT, " +
		"value FLOAT)";
    tx.executeSql(sql);
    tx.executeSql("INSERT INTO weight(value) VALUES(81.4)");
    tx.executeSql("INSERT INTO weight(value) VALUES(80.9)");
    tx.executeSql("INSERT INTO weight(value) VALUES(80.4)");
 }
