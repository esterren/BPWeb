var db;
var dbCreated = false;
var dbShortName = 'BodyPerformerDB';
var dbVersion = '1.0';
var dbDisplayName = 'Body Performer DB';
var dbMaxSize = 5 * 1024 * 1024; //in bytes

function initDB() {
	try {
		if (!window.openDatabase) {
			alert('not supported');
		} else {
		//open the database
			db = window.openDatabase(dbShortName, dbVersion, dbDisplayName, dbMaxSize);
			//if (dbCreated){
			//	db.transaction(getWeightList, transaction_error);
			//} else{
			//	db.transaction(populateDB, transaction_error, populateDB_success);
			//}
			if(!dbCreated){
				db.transaction(populateDB, transaction_error, populateDB_success);
			}
		}
	} catch(e) {
		if ( e == 2 ) {
			alert('Invalid database version.');
		} else {
		//other errors
		alert("Unknown error "+e+".");
		}
	} //end

}

function populateDB(tx) {
	$('#busy').show();
	
	populateWeightTable(tx);
/* 	tx.executeSql('DROP TABLE IF EXISTS weight');
	var sql = 
		"CREATE TABLE IF NOT EXISTS weight ( "+
		"id INTEGER PRIMARY KEY AUTOINCREMENT, " +
		"value FLOAT)";
	
	//var sql = 
	//	"CREATE TABLE IF NOT EXISTS weight ( "+
	//	"id unique, " +
	//	"value)";
	tx.executeSql(sql);
	tx.executeSql("INSERT INTO weight(value) VALUES('81.4')");
	tx.executeSql("INSERT INTO weight(value) VALUES('80.9')");
	tx.executeSql("INSERT INTO weight(value) VALUES('80.4')"); */
 }

function transaction_error(tx, error) {
	$('#busy').hide();
	alert("Database Error: " + error);
}

function populateDB_success() {
	dbCreated = true;
	//db.transaction(getWeightList, transaction_error);
}

/* function test(){
	db.transaction(getWeightList, transaction_error);
} */






