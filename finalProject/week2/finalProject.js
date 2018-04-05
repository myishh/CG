/*

Titile:	COMP.5460 Final Project
Author:	Yang Meng
Email: 	Yang_Meng@student.uml.edu

*/

//this is the main js file of all the js files, which
//defines a house drawer to show out the house
class HouseDrawer {
	constructor() {
		this.canvasWidth = 400;
		this.canvasHeight = 300;
		this.fill = "#FF4500";

		this.canvas = this._setupCanvas();
		this.form = this._setupForm();

		// implement transformation by dragging mouse on canvas
		new CanvasManipulation(this.canvas, this.form, this);
	}

	_setupCanvas() {
		let canvas = document.getElementById("canvas");
		canvas.setAttribute("height", this.canvasHeight+"");
		canvas.setAttribute("width", this.canvasWidth+"");
		canvas.setAttribute("viewBox", "-"+ this.canvasWidth/2 +" -" + this.canvasHeight/2 + " " + this.canvasWidth + " " + this.canvasHeight);
		return canvas;
	}



	drawHouseFromUserInput() {
		let values = {};
		values.all = Inputs.floatValues(this.form);
		values.houseSpec = values.all.slice(0, 3);
		values.frontTransformation = values.all.slice(3, 9);
		values.sideTransformation = values.all.slice(9, 15);
		values.topTransformation = values.all.slice(15, 21);

		// clear the whole canvas
		while (this.canvas.lastChild) { 
			this.canvas.removeChild(canvas.lastChild); 
		}

		this._drawHouse(this.canvas, values.houseSpec,
			values.frontTransformation, values.sideTransformation, values.topTransformation);
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

	_drawHouse(canvas, houseSpec, frontTransformation, sideTransformation, topTransformation) {
		
		let width = houseSpec[0], height= houseSpec[1], depth = houseSpec[2];
		let roofHeight = height / 2;

		let house = new House(width, height, depth, roofHeight);

		/** front elevation**/
		house.transformPlaneXY_array(frontTransformation);
		house.translate(new Vertex3D(-this.canvasWidth/4, -this.canvasHeight/4, 0));
		house.draw(canvas);

		/** side elevation**/
		house.resetTransformation();
		house.rotateY(90);
		house.transformPlaneXY_array(sideTransformation);
		house.translate(new Vertex3D(this.canvasWidth/4, -this.canvasHeight/4, 0));
		house.draw(canvas);

		/** top elevation**/
		house.resetTransformation();
		house.rotateX(-90);
		house.transformPlaneXY_array(topTransformation);
		house.translate(new Vertex3D(-this.canvasWidth/4, this.canvasHeight/4, 0));
		house.draw(canvas);
	}
}

new HouseDrawer().drawHouseFromUserInput();


//reset all data of all from
var initial_value = [];

function get_initial_value() {
    var all_Input = document.getElementsByTagName("input");
    for(var i = 0; i < 27; i++){
		initial_value[i] = all_Input[i].value;
		console.log("input_" + i + " = " + all_Input[i].value);
	}
}
function reset() {
	var all_Input = document.getElementsByTagName("input");
	// window.alert("form.length" + all_Input.elements);
    for(var j = 0 ; i < 27; j++){

	}
}