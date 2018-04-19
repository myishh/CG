/*

Titile:	COMP.5460 Final Project Week 1
Author:	Yang Meng
StuID: 	01679623
Email: 	Yang_Meng@student.uml.edu

*/

class RadioButton {
	static checkedIndex(containerId) {
		let all = document.getElementById(containerId).querySelectorAll("input");
		let checked = Array.prototype.map.call(all, function (input) {
			return input.checked;
		});
		return checked.indexOf(true);
	}
}
