//This js file define how to draw a line
/*

Titile:	COMP.5460 Programming Assignment 1
Author:	Yang Meng
StuID: 	01679623
Email: 	Yang_Meng@student.uml.edu

*/
function drawHorizontalLine(xa, ya, xb, yb) {
	if (xa > xb) {
		var x = xb;
		var y = yb;
		var xEnd = xa;
	}
	else {
		var x = xa;
		var y = ya;
		var xEnd = xb;
	}

	drawPixel(x, y);
	while (x < xEnd) {
		x++;
		drawPixel(x, y);
	}
}

function drawVerticalLine(xa, ya, xb, yb) {
	if (ya > yb) {
		var x = xb;
		var y = yb;
		var yEnd = ya;
	}
	else {
		var x = xa;
		var y = ya;
		var yEnd = yb;
	}

	drawPixel(x, y);
	while (y < yEnd) {
		y++;
		drawPixel(x, y);
	}
}

function midpointLine(xa, ya, xb, yb) {
	var dx = Math.abs(xa - xb);
	var dy = Math.abs(ya - yb);

	if (dy == 0) {
		drawHorizontalLine(xa, ya, xb, yb);
	}
	else if (dx == 0) {
		drawVerticalLine(xa, ya, xb, yb);
	}
	else {

		var slope = -1;

		if (dy <= dx) { //slope=[-1,1]
			if (xa > xb) {
				var x = xb;
				var y = yb;
				var xEnd = xa;
				if (ya > yb) {
					slope = 1;
				}
			}
			else {
				var x = xa;
				var y = ya;
				var xEnd = xb;
				if (yb > ya) {
					slope = 1;
				}
			}

			var px = 2 * dy - dx;
			var twoDy = 2 * dy;
			var twoDyDx = 2 * (dy - dx);

			drawPixel(x, y);
			while (x < xEnd) {
				x++;
				if (px < 0) {
					px += twoDy;
				}
				else {
					y += slope;
					px += twoDyDx;
				}
				drawPixel(x, y);
			}
		}
		else {
			if (ya > yb) {
				var x = xb;
				var y = yb;
				yEnd = ya;
				if (xa > xb) {
					slope = 1;
				}
			}
			else {
				var x = xa;
				var y = ya;
				yEnd = yb;
				if (xb > xa) {
					slope = 1;
				}
			}

			var py = 2 * dx - dy;
			var twoDx = 2 * dx;
			var twoDxDy = 2 * (dx - dy);

			drawPixel(x, y);
			while (y < yEnd) {
				y++;
				if (py < 0) {
					py += twoDx;
				}
				else {
					x += slope;
					py += twoDxDy;
				}
				drawPixel(x, y);
			}

		}
	}
}

// function midpointLine(xa, ya, xb, yb) {
// 	var dx = abs(xa - xb);
// 	var dy = abs(ya - yb);
// 	var p = 2 * dy - dx;
// 	var twoDy = 2 * dy;
// 	var twoDyDx = 2 * (dy - dx);

// 	if (xa > xb) {
// 		var x = xb;
// 		var y = yb;
// 		var xEnd = xa;
// 	}
// 	else {
// 		var x = xa;
// 		var y = ya;
// 		var xEnd = xb;
// 	}

// 	drawPixel(x, y);
// 	while (x < xEnd) {
// 		x++;
// 		if (p < 0) {
// 			p += twoDy;
// 		}
// 		else {
// 			y++;
// 			p += twoDyDx;
// 		}
// 		drawPixel(x, y);
// 	}
// }
