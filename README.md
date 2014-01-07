SafeBox-Lite
============
It is a micro JavaScript library. This is developed to give anonymous scope to 
functions with restored core JavaScript behaviour. This is aimed avoid collision 
among code snippets or plugins and provide anonymous function scope with default 
behaviour of Javascript.

## Example
	Object = null; //This overridden can not reflect inside to "SafeBox" scope
	
	SafeBox(function(){
		//Here you can use "Object" constructor to create new object
		var newObject = Object.create({foo:"bar"});
		//Note: In this anonymous scope default Javascript "Object" is restored.
		console.log(newObject);
	})();


## License
The MIT License (MIT)

Copyright (c) 2014 hilarudeens&lt;hilar.udeen@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
