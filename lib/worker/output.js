'use strict';

// MODULES //

var convertTime = require( './convert_time.js' );


// OUTPUT //

/**
* FUNCTION: output( clbk )
*	Prints response results.
*
* @param {Function} clbk - callback to invoke after printing test results
*/
function output( next ) {
	/* jshint validthis:true */
	if ( process.connected ) {

		// TODO: send a message or log?
		process.send({
			'rid': this.rid,
			'start': this.start,
			'elapsed': convertTime( this.elapsed ),
			'end': this.end,
			'req': this.req,
			'res': this.res
		});
	}
	next();
} // end FUNCTION output()


// EXPORTS //

module.exports = output;
