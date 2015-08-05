Load Test
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][codecov-image]][codecov-url] [![Dependencies][dependencies-image]][dependencies-url]

> Load test.


## Installation

``` bash
$ npm install load-test
```


## Usage

``` javascript
var lt = require( 'load-test' );
```

#### lt()


``` javascript

```


## Examples

``` javascript
var lt = require( 'load-test' );
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2015. Athan Reines.


[npm-image]: http://img.shields.io/npm/v/load-test.svg
[npm-url]: https://npmjs.org/package/load-test

[travis-image]: http://img.shields.io/travis/kgryte/load-test/master.svg
[travis-url]: https://travis-ci.org/kgryte/load-test

[codecov-image]: https://img.shields.io/codecov/c/github/kgryte/load-test/master.svg
[codecov-url]: https://codecov.io/github/kgryte/load-test?branch=master

[dependencies-image]: http://img.shields.io/david/kgryte/load-test.svg
[dependencies-url]: https://david-dm.org/kgryte/load-test

[dev-dependencies-image]: http://img.shields.io/david/dev/kgryte/load-test.svg
[dev-dependencies-url]: https://david-dm.org/dev/kgryte/load-test

[github-issues-image]: http://img.shields.io/github/issues/kgryte/load-test.svg
[github-issues-url]: https://github.com/kgryte/load-test/issues
