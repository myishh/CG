/*

Titile:	COMP.5460 Final Project Week 1
Author:	Yang Meng
StuID: 	01679623
Email: 	Yang_Meng@student.uml.edu

*/
class HouseDrawer {
	constructor() {
		this.canvasWidth = 400;
		this.canvasHeight = 400;

		this.canvas = this._setupCanvas();
		this.form = this._setupForm();

		new CanvasManipulation(this.canvas, this.form, this);
	}

	_setupCanvas() {
		let canvas = document.getElementById("canvas");
		canvas.setAttribute("height", this.canvasHeight+"");
		canvas.setAttribute("width", this.canvasWidth+"");
		canvas.setAttribute("viewBox", "-"+ this.canvasWidth/2 +" -" + this.canvasHeight/2 + " " + this.canvasWidth + " " + this.canvasHeight);
		return canvas;
	}

	_setupForm() {
		let form = document.forms[0];
		let _this = this;
		form.onsubmit = function(event) {
			event.preventDefault();
			_this.drawHouseFromUserInput();
		};
		return form;
	}

	drawHouseFromUserInput() {
		let values = {};
		values.all = Inputs.floatValues(this.form);
		values.houseSpec = values.all.slice(0, 3);
		values.frontTransformation = values.all.slice(3, 9);
		values.sideTransformation = values.all.slice(9, 15);
		values.topTransformation = values.all.slice(15, 21);

		// clear canvas
		while (this.canvas.lastChild) { this.canvas.removeChild(canvas.lastChild); }

		this._drawHouse(this.canvas, values.houseSpec,
			values.frontTransformation, values.sideTransformation, values.topTransformation);
	}

	_drawHouse(canvas, houseSpec, frontTransformation, sideTransformation, topTransformation) {
		// let width = canvas.clientWidth/2, height = canvas.clientHeight/2, depth = canvas.clientWidth/2;
		let width = houseSpec[0], height= houseSpec[1], depth = houseSpec[2];
		let roofHeight = height / 2;

		let house = new House(width, height, depth, roofHeight);

		/** front **/
		house.transformPlaneXY_array(frontTransformation);
		house.translate(new Vertex3D(-this.canvasWidth/4, -this.canvasHeight/4, 0));
		house.draw(canvas);

		/** side **/
		house.resetTransformation();
		house.rotateY(90);
		house.transformPlaneXY_array(sideTransformation);
		house.translate(new Vertex3D(this.canvasWidth/4, -this.canvasHeight/4, 0));
		house.draw(canvas);

		/** top **/
		house.resetTransformation();
		house.rotateX(-90);
		house.transformPlaneXY_array(topTransformation);
		house.translate(new Vertex3D(-this.canvasWidth/4, this.canvasHeight/4, 0));
		house.draw(canvas);
	}
}

new HouseDrawer().drawHouseFromUserInput();
