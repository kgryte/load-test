'use strict';

// VARIABLES //

var cnt = 0;


// START //

/**
* FUNCTION: start( clbk )
*	Performs start tasks.
*
* @private
* @param {Function} clbk - callback to invoke after completing start tasks
*/
function start( next ) {
	/* jshint validthis:true */
	cnt += 1;

	this.rid = process.pid + ':' + cnt;

	this.start = null;
	this.end = null;
	this.timer = null;

	this.req = {
		'opts': this._opts,
		'body': this._body
	};
	this.res = {
		'status': null,
		'headers': null,
		'body': null
	};

	next();
} // end FUNCTION start()


// EXPORTS //

module.exports = start;
