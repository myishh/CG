/*

Titile:	COMP.5460 Final Project
Author:	Yang Meng
StuID: 	01679623
Email: 	Yang_Meng@student.uml.edu


*/

//define the class of house
class House extends Transformable {
	//the house constructor of this class
	constructor(width, height, depth, roofHeight) {
		super();

		this.width = width;
		this.height = height;
		this.depth = depth;

		this.roofHeight = roofHeight;

		this.totalHeight = height + roofHeight;
	}

	//draw method
	draw(canvas) {
		this._drawBody(canvas);
		this._drawWindows(canvas);
		this._drawDoor(canvas);
		this._drawRoof(canvas);
		this._drawChimney(canvas);
	}

	_drawBody(canvas) {

		/** vertices **/

		let frontBottomLeft = new Vertex3D(-this.width/2, this.totalHeight/2, -this.depth/2);

		let backBottomLeft = frontBottomLeft.copy().translateZ(this.depth);

		let frontBottomRight = frontBottomLeft.copy().translateX(this.width);
		// let backBottomRight = frontBottomRight.copy().translateZ(this.depth);

		let frontTopLeft = frontBottomLeft.copy().translateY(-this.height);
		let backTopLeft = frontTopLeft.copy().translateZ(this.depth);

		let frontTopRight = frontTopLeft.copy().translateX(this.width);
		// let backTopRight = frontTopRight.copy().translateX(this.width);

		// let tiptop = frontTopLeft.copy().translate(this.width/2, this.roofHeight, 0);
		let tiptop = frontTopLeft.copy().translate(this.width/2, -this.roofHeight, 0);

		/** faces **/

		let frontFace = new Face(
			[frontBottomLeft, frontTopLeft, tiptop, frontTopRight, frontBottomRight]
		);

		let backFace = frontFace.copy().translateZ(this.depth);

		let leftFace = new Face([frontBottomLeft, frontTopLeft, backTopLeft, backBottomLeft]);

		let rightFace = leftFace.copy().translateX(this.width);

		Face.drawAll([frontFace, backFace, leftFace, rightFace],
			canvas, this.transformation);

		/** set members  **/

		this.frontBottomLeft = frontBottomLeft;
		this.tiptop = tiptop;
		this.frontTopLeft = frontTopLeft;
		this.frontTopRight = frontTopRight;
	}

	_drawRoof(canvas) {
		let frontLeft = this.frontTopLeft.copy().translate(-this.width/4, this.height/4, -this.depth/4);
		let frontTiptop = this.tiptop.copy().translateZ(-this.depth/4);
		let backTiptop = frontTiptop.copy().translateZ(this.depth + this.depth/2);
		let backLeft = frontLeft.copy().translateZ(this.depth + this.depth/2);
		let leftRoof = new Face([backLeft, backTiptop, frontTiptop, frontLeft]);

		let frontRight = frontLeft.copy().translateX(this.width/4*6);
		let backRight = frontRight.copy().translateZ(this.depth + this.depth/2);
		let rightRoof = new Face([frontTiptop, frontRight, backRight, backTiptop]);

		Face.drawAll([leftRoof, rightRoof],
			canvas, this.transformation);
	}

	_drawWindows(canvas) {

		let leftOffsetRatio = 1 / 8;
		let topOffsetRatio = 1 / 8;
		let widthRatio = 1 / 4;
		let heightRatio = 1 / 4;

		this._drawFrontWindow(canvas, leftOffsetRatio, topOffsetRatio, widthRatio, heightRatio);
		this._drawSideWindows(canvas, leftOffsetRatio, topOffsetRatio, widthRatio, heightRatio);
	}

	_drawFrontWindow(canvas, leftOffsetRatio, topOffsetRatio, widthRatio, heightRatio) {
		let leftOffset = this.width * leftOffsetRatio;
		let topOffset = this.height * topOffsetRatio;

		let width = this.width * widthRatio;
		let height = this.height * heightRatio;

		let spaceBtw = this.width - leftOffset * 2 - width;

		let topLeft = this.frontTopLeft.copy().translate(leftOffset, topOffset, 0);
		let bottomLeft = topLeft.copy().translateY(height);
		let topRight = topLeft.copy().translateX(width);
		let bottomRight = bottomLeft.copy().translateX(width);

		let leftWindow = new Face([bottomLeft, topLeft, topRight, bottomRight]);
		let rightWindow = leftWindow.copy().translateX(spaceBtw);

		leftWindow.draw(canvas, this.transformation);
		rightWindow.draw(canvas, this.transformation);
	}

	_drawSideWindows(canvas, leftOffsetRatio, topOffsetRatio, widthRatio, heightRatio) {
		let leftOffset = this.depth * leftOffsetRatio;
		let topOffset = this.height * topOffsetRatio;

		let depth = this.depth * widthRatio;
		let height = this.height * heightRatio;

		let spaceBtw = this.depth - leftOffset * 2 - depth;

		let topLeft = this.frontTopRight.copy().translate(0, topOffset, leftOffset);
		let bottomLeft = topLeft.copy().translateY(height);
		let topRight = topLeft.copy().translateZ(depth);
		let bottomRight = bottomLeft.copy().translateZ(depth);

		let leftWindow = new Face([bottomLeft, topLeft, topRight, bottomRight]);
		let rightWindow = leftWindow.copy().translateZ(spaceBtw);

		leftWindow.draw(canvas, this.transformation);
		rightWindow.draw(canvas, this.transformation);
	}

	_drawDoor(canvas) {
		let height = this.height / 8 * 3;
		let width = this.width / 4;

		let bottomLeft = new Vertex3D(-width/2, this.frontBottomLeft.y, this.frontBottomLeft.z);
		let topLeft = bottomLeft.copy().translateY(-height);
		let topRight = topLeft.copy().translateX(width);
		let bottomRight = bottomLeft.copy().translateX(width);

		let door = new Face([bottomLeft, topLeft, topRight, bottomRight]);
		door.draw(canvas, this.transformation);
	}

	_drawChimney(canvas) {
		let height = this.height / 8 * 3;
		let width = this.width / 8;
		let depth = this.depth / 8;

		let frontDepth = (this.depth - depth) / 2;

		let bottomLeft = this.tiptop.copy().translate(this.width/8*2, this.height/8*2, frontDepth);
		let bottomRight = bottomLeft.copy().translate(width, this.height/8, 0);
		let topLeft = bottomLeft.copy().translateY(-height);
		let topRight = topLeft.copy().translateX(width);

		let front = new Face([bottomLeft, topLeft, topRight, bottomRight]);
		let back = front.copy().translateZ(depth);

		let backTopLeft = topLeft.copy().translateZ(depth);
		let backBottomLeft = bottomLeft.copy().translateZ(depth);
		let left = new Face([bottomLeft, topLeft, backTopLeft, backBottomLeft]);

		let backTopRight = topRight.copy().translateZ(depth);
		let backBottomRight = bottomRight.copy().translateZ(depth);
		let right = new Face([bottomRight, topRight, backTopRight, backBottomRight]);

		Face.drawAll([front, back, left, right], canvas, this.transformation);
	}
}
