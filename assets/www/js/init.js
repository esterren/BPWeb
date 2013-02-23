var cordovaLoaded = false;

			
document.addEventListener("deviceready", onDeviceReady, false);
	
function onDeviceReady(){
		cordovaLoaded = true;
		kinveyInit();

}

function kinveyInit(){
	/*Kinvey.init({
    'appKey': 'kid_VTySSTByAJ',
    'appSecret': 'f0398100e8254ddc8b35302d194ffcb2'
});*/
	Kinvey.init({
		'appKey': 'kid_eTZwsICgw5',
		'appSecret': 'f1ec3ec253af4daabf56b5eae3e88d5b'
	});
	/*
	Kinvey.ping({
  success: function(response) {
    alert('Kinvey Ping Success. Kinvey Service is alive, version: ' + response.version + ', response: ' + response.kinvey);
  },
  error: function(error) {
    alert('Kinvey Ping Failed. Response: ' + error.description);
  }*/
}
