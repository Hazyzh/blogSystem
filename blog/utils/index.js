	export function htmlDecode(input){
	    var e = document.createElement('div');
	    e.innerHTML = input;
	    return e.childNodes.length === 0 ? "" : [...e.childNodes].reduce((pre, d) => pre + (d.nodeValue || d.innerText), '');
	}
