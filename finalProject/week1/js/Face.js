/*

Titile:	COMP.5460 Final Project
Author:	Yang Meng
StuID: 	01679623
Email: 	Yang_Meng@student.uml.edu

*/

class Face extends Transformable {
	constructor(vertices) {
		super();

		this.vertices3D = [];
		this.vertices = [];
		if (vertices) {
			this._addVertices(vertices);
		}
	}

	_addVertex(vertex3D) {
		this.vertices3D.push(vertex3D);
		this.vertices = this.vertices.concat(vertex3D.toArray());
	}

	_addVertices(vertices3D) {
		let _this = this;
		vertices3D.forEach(function (vertex3D) {
			_this._addVertex(vertex3D);
		});
	}

	_getTransformation(extraTransformation) {
		let transformation = this.transformation;
		if (extraTransformation) {
			transformation = Matrix.multiply(transformation, extraTransformation);
		}
		return transformation;
	}

	toSVGPoints(transformation) {
		let inArray = this.vertices3D.map(function (vertex3D) {
			let copy = vertex3D.copy().transform(transformation);
			return copy.x + " " + copy.y;
		});
		return inArray.join(", ");
	}

	draw(canvas, extraTransformation) {
		let transformation = this._getTransformation(extraTransformation);

		let points = this.toSVGPoints(transformation);

		let polygon = document.createElementNS("http://www.w3.org/2000/svg", 'polygon');
		polygon.setAttributeNS(null, "fill", "white");
		polygon.setAttributeNS(null, "stroke", "black");
		polygon.setAttributeNS(null, "stroke-width", "1");
		polygon.setAttributeNS(null, "points", points);

		canvas.appendChild(polygon);

	}

	static drawAll(all, canvas, extraTransformation) {
		all.forEach(function (face) {
			face.draw(canvas, extraTransformation);
		});
	}

	copy() {
		let f = new Face();
		f.vertices3D = this.vertices3D.slice();
		f.vertices = this.vertices.slice();
		f.transformation = this.transformation.slice();
		return f;
	}
}
