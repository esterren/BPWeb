function openDB(){
try {
    if (!window.openDatabase) {
        alert('not supported');
    } else {
        var shortName = 'tales';
        var version = '1.0';
        var displayName = 'Tall Tales Database';
        var maxSize = 65536; // in bytes
        db = openDatabase(shortName, version, displayName, maxSize); 
        // You should have a database instance in db.
    }
} catch(e) {
    // Error handling code goes here.
    if (e == 2) {
        // Version number mismatch.
        alert("Invalid database version.");
    } else {
        alert("Unknown error "+e+".");
    }
    return;
}

if (typeof(window.openDatabase)=='undefined') {
  alert(...)