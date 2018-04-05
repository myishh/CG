/*

Titile:	COMP.5460 Final Project
Author:	Yang Meng
StuID: 	01679623
Email: 	Yang_Meng@student.uml.edu


*/
class Transformable {
	constructor() {
		this.resetTransformation();
	}

	resetTransformation() {
		this.transformation = Matrix.identity;
	}

	translate(vertex3D) {
		this.transformation = Matrix.translate(this.transformation, vertex3D);
		return this;
	}
	translateX(x) { return this.translate(new Vertex3D(x,0,0)); }
	translateY(y) { return this.translate(new Vertex3D(0,y,0)); }
	translateZ(z) { return this.translate(new Vertex3D(0,0,z)); }

	rotateX(degrees) {
		this.transformation = Matrix.rotateX(this.transformation, degrees);
		return this;
	}

	rotateY(degrees) {
		this.transformation = Matrix.rotateY(this.transformation, degrees);
		return this;
	}

	rotateZ(degrees) {
		this.transformation = Matrix.rotateZ(this.transformation, degrees);
		return this;
	}

	scale(factor) {
		this.transformation = Matrix.scale(this.transformation, factor);
		return this;
	}

	shearXY(shearX, shearY) {
		this.transformation = Matrix.shearXY(this.transformation, shearX, shearY);
		return this;
	}

	transformPlaneXY_array(t) {
		let dx = t[0], dy = t[1], rotation = t[2], scale = t[3], shearX = t[4], shearY = t[5];
		this.transformPlaneXY(dx, dy, rotation, scale, shearX, shearY)
	}
	transformPlaneXY(dx, dy, rotation, scale, shearX, shearY) {
		this.scale(scale);
		this.shearXY(shearX, shearY);
		this.rotateZ(rotation);
		this.translate(new Vertex3D(dx, dy, 0));
	}
}