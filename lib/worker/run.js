'use strict';

// MODULES //

var series = require( './series.js' ),
	context = require( './context.js' );


// RUN //

/**
* FUNCTION: run()
*	Runs a single test.
*
* @private
*/
function run() {
	var len = series.length,
		ctx = context(),
		i = 0;

	series[ i ].call( ctx, next );

	function next() {
		i += 1;
		if ( i < len ) {
			series[ i ].call( ctx, next );
		}
	}
} // end FUNCTION run()


// EXPORTS //

module.exports = run;
