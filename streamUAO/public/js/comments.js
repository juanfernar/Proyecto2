var config = {
	apiKey: "AIzaSyD2qJyNopVGBiKe9bSHE0dO5aO8y2vCt0k",
	authDomain: "television-c5680.firebaseapp.com",
	databaseURL: "https://television-c5680.firebaseio.com",
	projectId: "television-c5680",
	storageBucket: "television-c5680.appspot.com",
	messagingSenderId: "1040452124602"
};

firebase.initializeApp(config);
var database = firebase.database();

var list = [];
var observer;
var cont = 0;

var leadsRef = database.ref('room01/comments');
leadsRef.once('value', function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
    cont++;
  });
	console.log(cont);
});



// ----------- INICIO FIREBASE ----------- //
function upload(name, comentario) {
	cont++;
	firebase.database().ref('room01/comments/'+ cont).set({
    name: name,
    comment: comentario
	});
}

function sendComment() {
  var c = { name: getCookie("firstName"),
  comment:document.getElementById("input_msg_send").value};

  this.list.push(c);
  //console.log(this.list);

  upload(getCookie("firstName"), document.getElementById("input_msg_send").value);

  read();
}

function read(){

  var leadsRef = database.ref('room01/comments');
  leadsRef.on('value', function(snapshot) {
		let report = " ";
    var i = 0;
    $("#mensajeChat  ul li").empty();
    snapshot.forEach(function(childSnapshot) {
      var childData = childSnapshot.val();

      
      
      
      if (i % 2 == 0)
        //$('<li class="self mb-10"><div class="self-msg-wrap"><div class="msg block pull-right">' + childData.comment + '<div class="msg-per-detail mt-5"><span class="msg-time txt-grey">' + childData.name + '</span></div></div></div><div class="clearfix"></div></li>').append("#mensajeChat  ul ");
        $("#mensajeChat  ul ").append('<li class="self mb-10"><div class="self-msg-wrap"><div class="msg block pull-right">' + childData.comment + '<div class="msg-per-detail mt-5"><span class="msg-time txt-grey">' + childData.name + '</span></div></div></div><div class="clearfix"></div></li>');
      else
        //$('<li class="friend mb-10"><div class="friend-msg-wrap"><div class="msg block pull-left">' + childData.comment + '<div class="msg-per-detail mt-5"><span class="msg-time txt-grey">' + childData.name + '</span></div></div></div><div class="clearfix"></div></li>').append("#mensajeChat  ul ");
        $("#mensajeChat  ul ").append('<li class="friend mb-10"><div class="friend-msg-wrap"><div class="msg block pull-left">' + childData.comment + '<div class="msg-per-detail mt-5"><span class="msg-time txt-grey">' + childData.name + '</span></div></div></div><div class="clearfix"></div></li>');

      i++;
      //report += "Nombre: " + childData.name + " Comentario: " + childData.comment + "<br>";
    });
		 //document.getElementById('box').innerHTML = report;
  });

}
