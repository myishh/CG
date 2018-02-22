//This js file define how to draw a ellipse
/*

Titile:	COMP.5460 Programming Assignment 1
Author:	Yang Meng
Email: 	Yang_Meng@student.uml.edu

*/
function drawMidpointEllipsePoints(xCenter, yCenter, x , y) {
	drawPixel(xCenter + x, yCenter + y);
	drawPixel(xCenter - x, yCenter + y);
	drawPixel(xCenter + x, yCenter - y);
	drawPixel(xCenter - x, yCenter - y);
}

function midpointEllipse(xCenter, yCenter, rx, ry) {
	var rx2 = rx * rx;
	var ry2 = ry * ry;
	var tworx2 = 2 * rx2;
	var twory2 = 2 * ry2;

	var x = 0;
	var y = ry;
	var px = 0;
	var py = tworx2 * y;

	drawMidpointEllipsePoints(xCenter, yCenter, x, y);

	// region 1
	var p = Math.round(ry2 - (rx2 * ry) + (0.25 * rx2));
	while (px < py) {
		x++;
		px += twory2;
		if (p < 0) {
			p += ry2 + px;
		}
		else {
			y--;
			py -= tworx2;
			p += ry2 + px - py;
		}
		drawMidpointEllipsePoints(xCenter, yCenter, x, y);
	}

	// region 2
	p = Math.round(ry2 * (x+0.5) * (x+0.5) + rx2 * (y-1) * (y-1) - rx2 * ry2);
	while (y > 0) {
		y--;
		py -= tworx2;
		if (p > 0) {
			p += rx2 - py;
		}
		else {
			x++;
			px += twory2;
			p += rx2 - py + px;
		}
		drawMidpointEllipsePoints(xCenter, yCenter, x, y);
	}
}
