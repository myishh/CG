//This js file define how to draw a polygon
/*

Titile:	COMP.5460 Programming Assignment 1
Author:	Yang Meng
Email: 	Yang_Meng@student.uml.edu

*/
function drawPolygon(xys) {
	drawPolylines(xys)
	midpointLine(xys[xys.length-2], xys[xys.length-1], xys[0], xys[0]);
}

function drawPolylines(xys) {
	for (var i = 0; i < xys.length - 2; i += 2) {
		var x = xys[i];
		var y = xys[i+1]
		var xTo = xys[i+2];
		var yTo = xys[i+3];
		midpointLine(x,y,xTo,yTo);
	}
}
