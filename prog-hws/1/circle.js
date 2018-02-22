//This js file define how to draw a circle
/*

Titile:	COMP.5460 Programming Assignment 1
Author:	Yang Meng
Email: 	Yang_Meng@student.uml.edu

*/
function drawMidpointCirclePoints(x,y,x0,y0) {
	drawPixel(x+x0, y+y0);
	drawPixel(x+x0, -y+y0);
	drawPixel(-x+x0, y+y0);
	drawPixel(-x+x0, -y+y0);
	drawPixel(y+x0, x+y0);
	drawPixel(y+x0, -x+y0);
	drawPixel(-y+x0, x+y0);
	drawPixel(-y+x0, -x+y0);
}

function midpointCircle(x0, y0, r) {
	var x = 0;
	var y = r;

	var p = 1 - r;

	drawMidpointCirclePoints(x,y,x0,y0);
	for ( ; x < y; x++) {
		if (p < 0)
			p += 2 * x + 1;
		else {
			y--;
			p += 2 * (x - y) + 1;
		}
		drawMidpointCirclePoints(x,y,x0,y0);
	}
}
