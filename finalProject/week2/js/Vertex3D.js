/*

Titile:	COMP.5460 Final Project
Author:	Yang Meng
StuID: 	01679623
Email: 	Yang_Meng@student.uml.edu


*/
class Vertex3D {
	constructor(x, y, z) {
		this.x = x;
		this.y = y;
		this.z = z;
	}
	translateX(dx) {
		return this.translate(dx, 0, 0);
	}
	translateY(dy) {
		return this.translate(0, dy, 0);
	}
	translateZ(dz) {
		return this.translate(0, 0, dz);
	}
	translate(dx, dy, dz) {
		this.x += dx;
		this.y += dy;
		this.z += dz;
		return this;
	}
	copy() {
		return new Vertex3D(this.x, this.y, this.z);
	}
	toArray() {
		return [this.x, this.y, this.z];
	}
	_toArray4() {
		return this.toArray().concat([1]);
	}
	transform(transformationMatrix) {
		let vec4 = Matrix.multiplyVec4(transformationMatrix, this._toArray4());
		this.x = vec4[0];
		this.y = vec4[1];
		this.z = vec4[2];
		return this;
	}
}

Vertex3D.origin = new Vertex3D(0,0,0);