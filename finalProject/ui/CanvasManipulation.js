/*

Titile:	COMP.5460 Final Project Week 1
Author:	Yang Meng
StuID: 	01679623
Email: 	Yang_Meng@student.uml.edu

*/

class CanvasManipulation {
	constructor(canvas, form, houseDrawer) {
		this.form = form;
		this.houseDrawer = houseDrawer;

		this._resetPosition();

		function getRelX(event) {
			return event.clientX - canvas.getBoundingClientRect().left;
		}
		function getRelY(event) {
			return event.clientY - canvas.getBoundingClientRect().top;
		}

		let isMouseDown = false;
		let _this = this;

		canvas.onmousedown = function (event) {
			_this.x.last = getRelX(event);
			_this.y.last = getRelY(event);

			isMouseDown = true;
		};

		canvas.onmousemove = function (event) {
			if (isMouseDown) {
				_this.x.moving = getRelX(event);
				_this.y.moving = getRelY(event);

				let dx = _this.x.moving - _this.x.last;
				let dy = _this.y.moving - _this.y.last;

				let transformFieldset = TransformFieldset.current();
				let transformIndex = RadioButton.checkedIndex("transformation-type");
				if (transformIndex === 0) {
					transformFieldset.translatePlus(dx, dy);
				}
				else if (transformIndex === 1) {
					transformFieldset.rotatePlus(dx);
				}
				else if (transformIndex === 2) {
					transformFieldset.scalePlus(dx/50);
				}
				else if (transformIndex === 3) {
					transformFieldset.shearPlus(dx/100, dy/100);
				}
				_this.houseDrawer.drawHouseFromUserInput();


				_this.x.last = _this.x.moving;
				_this.y.last = _this.y.moving;
			}
		};

		canvas.onmouseup = function (event) {
			_this._resetPosition();
			isMouseDown = false;
		};
	}

	_resetPosition() {
		this.x = {};
		this.y = {};
	}
}