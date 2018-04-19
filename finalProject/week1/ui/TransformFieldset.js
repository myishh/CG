/*

Titile:	COMP.5460 Final Project Week 1
Author:	Yang Meng
StuID: 	01679623
Email: 	Yang_Meng@student.uml.edu

*/

class TransformFieldset {
	static current() {
		let checkedElevationIndex = RadioButton.checkedIndex("elevation-type");
		return new TransformFieldset(document.getElementById("transformations").querySelectorAll("fieldset")[checkedElevationIndex]);
	}

	constructor(fieldset) {
		this.fieldset = fieldset;
		this.inputs = fieldset.querySelectorAll("input");
	}

	translatePlus(dx, dy) {
		this._increaseValue(0, dx);
		this._increaseValue(1, dy);
	}

	rotatePlus(dx) {
		this._increaseValue(2, dx);
	}

	scalePlus(dx) {
		this._increaseValue(3, dx);
	}

	shearPlus(dx, dy) {
		this._increaseValue(4, dx);
		this._increaseValue(5, dy);
	}

	_increaseValue(index, value) {
		let currValue = parseFloat(this.inputs[index].value);
		this.inputs[index].value = currValue + value + "";
	}
}
