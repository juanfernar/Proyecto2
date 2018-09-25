 "use strict"; 
/*****Ready function start*****/
$(document).ready(function(){
	

	var firstName = getCookie("firstName");
	var lastName = getCookie("lastName");
	var img = getCookie("img");

	$("#userName").html(firstName);
	$("#userImgP").attr("src","../img/"+img);
	




});