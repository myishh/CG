//Thie is the convas js definition file
/*

Titile:	COMP.5460 Programming Assignment 1
Author:	Yang Meng
StuID: 	01679623
Email: 	Yang_Meng@student.uml.edu

*/
var side_length = 500;

var canvas = document.getElementById("c");
canvas.width = side_length + 1;
canvas.height = side_length + 1;

var context = canvas.getContext("2d");

function clearCanvas() {
	context.clearRect(0, 0, canvas.width, canvas.height);
}

var pixel = context.createImageData(1, 1);
pixel.data[3] = 255; // [0,0,0,255] is black

function drawPixel(x, y) {
	context.putImageData(pixel, x, y);
}
