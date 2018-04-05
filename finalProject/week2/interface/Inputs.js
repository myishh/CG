 /*

Titile:	COMP.5460 Final Project
Author:	Yang Meng
StuID: 	01679623
Email: 	Yang_Meng@student.uml.edu

*/

class Inputs {
	static floatValues(container) {
		let inputs = container.getElementsByTagName("input");
		return Array.prototype.map.call(inputs, function (input) {
			return parseFloat(input.value);
		});
	}
}