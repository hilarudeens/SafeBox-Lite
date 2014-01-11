/**
 * NAME: SafeBox-Lite
 *
 * VERSION: 0.0.2
 *
 * AUTHOR: hilarudeens<hilar.udeen@gmail.com>
 *
 * ========================================
 * License
 * ========================================
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2014 hilarudeens<hilar.udeen@gmail.com>
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */

/**
 * SafeBox-Lite is a JavaScript library. This is developed to give anonymous scope to
 * functions with restored core JavaScript behaviour. This helps avoid collision
 * among code snippets or plugins and provide isolated execution context.
 *
 * ## Basic Usage Example
 *
 * Object = null; //This overridden can not reflect inside to "SafeBox" scope
 * SafeBox(function(){
 *	//Here you can use "Object" constructor to create new object
 *  var newObject = Object.create({foo:"bar"});
 *		//Note: In this anonymous scope default Javascript "Object" is restored.
 *		console.log(newObject);
 *	})();
 *
 * ## Creating class within SafeBox
 *
 * var Person = SafeBox(function Person() {
 *		function Person(name, age) {
 *			this.name = name;
 *			this.age = age;
 *		};
 *		Person.prototype.display = function() {
 *			console.log("Person name is " + this.name);
 *		};
 *		return Person;
 *	})();
 *
 * ## Restore Class from SafeBox as a local variable
 *
 *	(function() {
 *		// I am going to create "person" object and I assume that “Person” class
 *		// already digested by SafeBox-Lite.
 *		var Person = SafeBox("Person")();
 *		// Creating "person" object
 *		var person = new Person("foo",27);
 *	})();
 */
;(function(window) {
	"use strict";
	/**
	 * Restore Primary Data Types
	 * String, Number, Boolean
	 */

	// Restore "String"
	var String = (("").constructor);

	// Restore "Number"
	var Number = ((0).constructor);

	// Restore "Boolean"
	var Boolean = ((true).constructor);

	/**
	 * Restore Composite Data Types
	 * Object, Array
	 */
	// Restore "Object"
	var Object = (( {}).constructor);

	// Restore "Array"
	var Array = (([]).constructor);

	/**
	 * Restore Special Data Types
	 * null, undefined
	 */
	null;// null is non-writable datatype

	// Restore "undefined"
	var undefined = (function(undefined) {
		return undefined;
	})();

	/**
	 * Restore Hidden Data Types
	 */
	// Restore "Function"
	var Function = ((function() {
	}).constructor);

	// Restore "RegExp"
	var RegExp = ((/(?:)/).constructor);

	// Internal Cache
	var _cache = {};

	/**
	 * Function to generate scope with default javascript behaviour.
	 *
	 * @param {Function} fn
	 * @return {Function}
	 */
	var _compile = function(fn) {
		var functionName = fn.name || fn;
		var cachedFunction = _cache[functionName];

		// Skip compile and Provide function which is already compiled.
		if (!!cachedFunction) {
			return cachedFunction;
		}

		// Anonymous function parameters
		var compilerArguments = ['Function', 'String', 'Number', 'Boolean', 'Object', 'Array', 'RegExp', 'undefined'];

		// Copy of contructors prototype
		var fnPrototype = fn.prototype;
		var functionString = fn.toString();

		// Anonymous function definition
		var anonymousCore = "return " + functionString;

		// Anonymous function arguments
		compilerArguments.push(anonymousCore);

		// Generate restored anonymous function scope
		var compiledFunction = Function.apply({}, compilerArguments).apply({}, [Function, String, Number, Boolean, Object, Array, RegExp]);

		// Caching the function
		if (!!functionName) {
			_cache[functionName] = compiledFunction;
		}

		return compiledFunction;
	};

	/**
	 *	Function to validate SafeBox argument.
	 * 	@param {*} fn.
	 *  @return {Boolean}
	 */
	var _validate = function(fn) {
		return ( typeof (fn) === 'function') || ( typeof (fn) === 'string' && !!_cache[fn]) ? true : false;
	};

	/**
	 *	Function to provive core "SafeBox" context.
	 * 	@param {*} fn
	 *  @return {Function}
	 */
	var SafeBox = function(fn) {
		return _validate(fn) ? _compile.call(this, fn) : fn;
	};

	// Create a global
	window.SafeBox = SafeBox;

})(window);
