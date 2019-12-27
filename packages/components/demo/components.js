(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = global || self, factory(global.JSAmpComponents = {}));
}(this, function (exports) { 'use strict';

	class JSAMPElement extends HTMLElement {
	    constructor() {
	        super();
	        this.pProps = {};
	        this.pState = {};
	    }
	    get props() { return Object.assign({}, this.pProps); }
	    get state() { return Object.assign({}, this.pState); }
	    pUpdateProps() {
	        this.pProps = {};
	        for (let i = 0; i < this.attributes.length; i += 1) {
	            this.pProps[this.attributes[i].name
	                .split('-')
	                .map((item, index) => {
	                if (index === 0) {
	                    return item;
	                }
	                return `${item.charAt(0).toUpperCase()}${item.substring(1)}`;
	            })
	                .join('')] = this.attributes[i].value;
	        }
	    }
	    connectedCallback() {
	        this.pUpdateProps();
	        console.log(this.props);
	        this.innerHTML = this.render();
	    }
	    render() {
	        const { data } = this.props;
	        return (`<div>${data}</div>`);
	    }
	}
	customElements.define('jsamp-element', JSAMPElement);

	exports.JSAMPElement = JSAMPElement;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
