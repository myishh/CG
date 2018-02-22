//This js file define how to draw a rectangle
/*

Titile:	COMP.5460 Programming Assignment 1
Author:	Yang Meng
StuID: 	01679623
Email: 	Yang_Meng@student.uml.edu

*/
function drawRectangle(x1, y1, x2, y2) {
	var minX = Math.min(x1, x2);
	var minY = Math.min(y1, y2);
	var dx = Math.abs(x1 - x2);
	var dy = Math.abs(y1 - y2);
	midpointLine(minX, minY,        minX + dx, minY);
	midpointLine(minX, minY,        minX, minY + dy);
	midpointLine(minX + dx, minY,   minX + dx, minY + dy);
	midpointLine(minX, minY + dy,   minX + dx, minY + dy);
}
