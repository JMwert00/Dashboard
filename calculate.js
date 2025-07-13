"use strict";
document.addEventListener("DOMContentLoaded", function () {
	if (!Array.prototype.includes) {
		Array.prototype.includes = function includes(searchElement) {
			if (this == null) {
				throw new TypeError('this is null or undefined');
			}
			var object = Object(this),
				length = object.length >>> 0;
			if (length === 0) {
				return false;
			}
			var start = arguments[1] >> 0,
				key = start < 0 ? Math.max(start + length, 0) : start,
				currentElement;
			while (key < length) {
				currentElement = object[key];
				if (searchElement === currentElement || (searchElement !== searchElement &&
						currentElement !== currentElement)) {
					return true
				}
				key++;
			}
			return false;
		};
	}
	if (!NodeList.prototype.forEach) NodeList.prototype.forEach = Array.prototype
		.forEach;
	var form = document.getElementById("calc"),
		out = document.querySelector("#calc output"),
		overwrite = true;

	function clear() {
		out.textContent = 0;
		overwrite = true;
	}

	function extra(type) {
		switch (type) {
		case "√":
			out.textContent = Math.sqrt(result(true));
			break;
		case "x²":
			out.textContent = Math.pow(result(true), 2);
			break;
		case "ln":
			out.textContent = Math.log(result(true));
			break;
		}
		overwrite = true;
	}

	function input(c) {
		// remove leading zero?
		if (overwrite) {
			out.textContent = (c == "." ? "0." : c);
		} else {
			out.textContent += c;
		}
		overwrite = false;
	}

	function operator(c) {
		out.textContent += " " + c + " ";
		overwrite = false;
	}

	function result(noDisplay) {
			var input = out.textContent,
				r = 0;
			// replace × with * and ÷ with / for eval()
			input = input.replace(/×/g, "*")
				.replace(/÷/g, "/");
			// remove anything else that is not allowed here
			input = input.replace(/[^0-9. +\-*\/]/g, "");
			try {
				r = eval(input);
			} catch (e) {
				r = 0;
			}
			if (noDisplay !== true) {
				out.textContent = r;
				overwrite = true;
			}
			return r;
		}
		// initialize only if <output> is found
	if (out) {
		form.addEventListener("submit", function (ev) {
			// prevent form submission and page reload
			ev.preventDefault();
			ev.stopPropagation();
			return false;
		});
		// button functionalities
		document.querySelectorAll("#calc button")
			.forEach(function (b) {
				var c = b.textContent;
				switch (c) {
				case "9":
				case "8":
				case "7":
				case "6":
				case "5":
				case "4":
				case "3":
				case "2":
				case "1":
				case "0":
				case ".":
					b.addEventListener("click", function () {
						input(c);
					});
					break;
				case "+":
				case "-":
				case "×":
				case "÷":
					b.addEventListener("click", function () {
						operator(c);
					});
					break;
				case "√":
				case "x²":
				case "ln":
					b.addEventListener("click", function () {
						extra(c);
					});
					break;
				case "=":
					b.addEventListener("click", result);
					break;
				case "C":
					b.addEventListener("click", clear);
					break;
				}
			});
		// keyboard support
		document.addEventListener("keypress", function (ev) {
			// decimal point
			if ([44, 46].includes(ev.charCode)) {
				// , .
				input(".");
			}
			// digits
			if ([48, 49, 50, 51, 52, 53, 54, 55, 56, 57].includes(ev.charCode)) {
				// 0-9
				input(ev.charCode - 48);
			}
			// operators
			if ([42, 43, 45, 47].includes(ev.charCode)) {
				// * + - /
				operator(
					["×", "+", "-", "÷"][
						[42, 43, 45, 47].indexOf(ev.charCode)
					]);
			}
			// result
			if (ev.charCode == 61) {
				// =
				result();
			}
			// clear
			if ([67, 99].includes(ev.charCode)) {
				// C, c
				clear();
			}
			// logarithm
			if ([76, 108].includes(ev.charCode)) {
				// L, l
				extra("ln");
			}
			// root
			if ([82, 114].includes(ev.charCode)) {
				// R, r
				extra("√");
			}
			// square
			if ([83, 115].includes(ev.charCode)) {
				// S, s
				extra("x²");
			}
			// additional clear and result keys
			switch (ev.code) {
				// <delete> and <backspace> to clear display
			case "Backspace":
			case "Delete":
				clear();
				break;
				// both <enter> keys to display result
			case "Enter":
			case "NumpadEnter":
				result();
				break;
			}
		});
	}
});