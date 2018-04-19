/*

Titile:	COMP.5460 Final Project Week 1
Author:	Yang Meng
StuID: 	01679623
Email: 	Yang_Meng@student.uml.edu

*/
class Matrix {

	static get identity() {
		return [
			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1
		];
	}

	static multiplyVec4(m, v) {
		let c = [];
	
		c[0] = v[0]*m[0] + v[1]*m[4] + v[2]*m[8] + v[3]*m[12];
		c[1] = v[0]*m[1] + v[1]*m[5] + v[2]*m[9] + v[3]*m[13];
		c[2] = v[0]*m[2] + v[1]*m[6] + v[2]*m[10] + v[3]*m[14];
		c[3] = v[0]*m[3] + v[1]*m[7] + v[2]*m[11] + v[3]*m[15];

		return c;
	}

	static multiply(b, a) {
		let c = [];

		let a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
			a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
			a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
			a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],
			b00  = b[0], b01 = b[1], b02 = b[2], b03 = b[3],
			b10 = b[4], b11 = b[5], b12 = b[6], b13 = b[7],
			b20 = b[8], b21 = b[9], b22 = b[10], b23 = b[11],
			b30 = b[12], b31 = b[13], b32 = b[14], b33 = b[15];

		c[0] = b00*a00 + b01*a10 + b02*a20 + b03*a30;
		c[1] = b00*a01 + b01*a11 + b02*a21 + b03*a31;
		c[2] = b00*a02 + b01*a12 + b02*a22 + b03*a32;
		c[3] = b00*a03 + b01*a13 + b02*a23 + b03*a33;
		c[4] = b10*a00 + b11*a10 + b12*a20 + b13*a30;
		c[5] = b10*a01 + b11*a11 + b12*a21 + b13*a31;
		c[6] = b10*a02 + b11*a12 + b12*a22 + b13*a32;
		c[7] = b10*a03 + b11*a13 + b12*a23 + b13*a33;
		c[8] = b20*a00 + b21*a10 + b22*a20 + b23*a30;
		c[9] = b20*a01 + b21*a11 + b22*a21 + b23*a31;
		c[10] = b20*a02 + b21*a12 + b22*a22 + b23*a32;
		c[11] = b20*a03 + b21*a13 + b22*a23 + b23*a33;
		c[12] = b30*a00 + b31*a10 + b32*a20 + b33*a30;
		c[13] = b30*a01 + b31*a11 + b32*a21 + b33*a31;
		c[14] = b30*a02 + b31*a12 + b32*a22 + b33*a32;
		c[15] = b30*a03 + b31*a13 + b32*a23 + b33*a33;
		return c;
	}

	static translation(x, y, z) {
		return [
			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			x, y, z, 1,
		];
	}

	static translate(matrix, vertex3D) {
		let translationMatrix = Matrix.translation(vertex3D.x, vertex3D.y, vertex3D.z);
		return Matrix.multiply(matrix, translationMatrix);
	}

	static rotationX(radians) {
		let c = Math.cos(radians);
		let s = Math.sin(radians);

		return [
			1, 0, 0, 0,
			0, c, s, 0,
			0, -s, c, 0,
			0, 0, 0, 1,
		];
	}

	static rotateX(matrix, degrees) {
		let radians = Angle.degreesToRadians(degrees);
		let rotationMatrix = Matrix.rotationX(radians);
		return Matrix.multiply(matrix, rotationMatrix);
	}

	static rotationY(radians) {
		let c = Math.cos(radians);
		let s = Math.sin(radians);

		return [
			c, 0, -s, 0,
			0, 1, 0,  0,
			s, 0, c,  0,
			0, 0, 0,  1,
		];
	}

	static rotateY(matrix, degrees) {
		let radians = Angle.degreesToRadians(degrees);
		let rotationMatrix = Matrix.rotationY(radians);
		return Matrix.multiply(matrix, rotationMatrix);
	}

	static rotationZ(radians) {
		let c = Math.cos(radians);
		let s = Math.sin(radians);

		return [
			c, s, 0, 0,
			-s, c, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1,
		];
	}

	static rotateZ(matrix, degrees) {
		let radians = Angle.degreesToRadians(degrees);
		let rotationMatrix = Matrix.rotationZ(radians);
		return Matrix.multiply(matrix, rotationMatrix);
	}

	static scale(matrix, factor) {
		let f = factor;
		let scaleMatrix = [
			f, 0, 0, 0,
			0, f, 0, 0,
			0, 0, f, 0,
			0, 0, 0, 1
		];
		return Matrix.multiply(matrix, scaleMatrix);
	}

	static shearXY(matrix, shearX, shearY) {
		let sx = shearX;
		let sy = shearY;
		let shearMatrix = [
			1, sy, 0, 0,
			sx, 1, 0, 0,
			0,  0, 1, 0,
			0,  0, 0, 1
		]
		return Matrix.multiply(matrix, shearMatrix);
	}
}
