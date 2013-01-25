[AngularStrap](http://mgcrea.github.com/angular-strap) [![Build Status](https://secure.travis-ci.org/mgcrea/angular-strap.png?branch=master)](http://travis-ci.org/#!/mgcrea/angular-strap)
=================

AngularStrap is a set of directives that enables seamless integration of [Twitter Bootstrap](https://twitter.github.com/bootstrap) into your [AngularJS](https://github.com/angular/angular.js) app.

Documentation and examples
--------------------------

+ Check the [documentation](http://mgcrea.github.com/angular-strap) and [changelog](https://github.com/mgcrea/angular-strap/wiki/Changelog).

+ Use & fork the available [plunkers](https://github.com/mgcrea/angular-strap/wiki/Plunkers) to test a directive or report an issue.

Quick start
-----------

Clone the repo, `git clone git://github.com/mgcrea/angular-strap.git`, or [download the latest release](https://github.com/mgcrea/angular-strap/zipball/master).

In order to use AngularStrap, you have to:

1. Include the required libraries (cdn/local)

>
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/2.2.2/bootstrap.min.js"></script>
    <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.0.3/angular.min.js"></script>
    <script src="//mgcrea.github.com/angular-strap/js/angular-strap.js"></script>

2. Inject the `$strap.directives` into your app module

>
    var app = angular.module('angularjs-starter', ['$strap.directives']);

Testing
-------

AngularStrap is tested with `testacular` against the latest available release of jQuery & Bootstrap.

>
	sudo npm install testacular -g
	npm test

Contributing
------------

Please submit all pull requests the against master branch. If your unit test contains javascript patches or features, you should include relevant unit tests. Thanks!

Authors
-------

**Olivier Louvignes**

+ http://olouv.com
+ http://github.com/mgcrea

Copyright and license
---------------------

	The MIT License

	Copyright (c) 2012 Olivier Louvignes

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.
