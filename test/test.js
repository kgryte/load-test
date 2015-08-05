/* global require, describe, it */
'use strict';

// MODULES //

var chai = require( 'chai' ),
	lt = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'load-test', function tests() {

	it( 'should export a function', function test() {
		expect( lt ).to.be.a( 'function' );
	});

});
