'use strict';

// MODULES //

var request = require( 'request' );


// ARGUMENTS //

var args = process.argv,
	blob = JSON.parse( args[ 2 ] ),
	len = parseInt( args[ 3 ], 10 );


// VARIABLES //

var pid = process.pid,
	cnt = 0;


// SERIES //

var series = [
	start,
	send,
	print
];


// FUNCTIONS //

/**
* FUNCTION: onMessage( msg )
*	Callback invoked upon receiving a message from the parent process.
*
* @private
* @param {*} msg - message
*/
function onMessage( msg ) {
	if ( msg !== null ) {
		blob = msg;
	}
	run();
} // end FUNCTION onMessage()

/**
* FUNCTION: convertTime( time )
*	Converts a high resolution time array to milliseconds.
*
* @private
* @param {Number[]} time - high resolution time
* @returns {Number} time in milliseconds
*/
function convertTime( time ) {
	return time[ 0 ]*1e3 + time[ 1 ]*1e-6;
} // end FUNCTION convertTime()

/**
* FUNCTION: run()
*	Runs a single test.
*
* @private
*/
function run() {
	var len = series.length,
		ctx = {},
		i = 0;

	series[ i ].call( ctx, next );

	function next() {
		i += 1;
		if ( i < len ) {
			series[ i ].call( ctx, next );
		}
	}
} // end FUNCTION run()

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

	this.rid = pid + ':' + cnt;
	this.start = Date.now();
	this.timer = process.hrtime();
	this.blob = blob;

	next();
} // end FUNCTION start()

/**
* FUNCTION: send( clbk )
*	Makes a request.
*
* @private
* @param {Function} clbk - callback to invoke after receiving a response
*/
function send( next ) {
	/* jshint validthis: true */
	var self = this;
	request( this.blob, onResponse );

	/**
	* FUNCTION: onResponse( error, response, body )
	*	Callback invoked upon receiving an HTTP response.
	*
	* @private
	* @param {Error|Null} error - error object
	* @param {Object} response - HTTP response object
	* @param {*} body - response body
	*/
	function onResponse( error, response, body ) {
		self.elapsed = process.hrtime( self.timer );
		self.end = Date.now();
		if ( error ) {
			self.error = error;
			return;
		}
		self.body = body;
		self.status = response.statusCode;
		// self.headers = response.headers;

		next();
	} // end FUNCTION onResponse()
} // end FUNCTION send()

/**
* FUNCTION: print( clbk )
*	Prints response results.
*
* @private
* @param {Function} clbk - callback to invoke after printing test results
*/
function print( next ) {
	/* jshint validthis:true */
	if ( process.connected ) {
		process.send({
			'rid': this.rid,
			'start': this.start,
			'elapsed': convertTime( this.end ),
			'end': this.end,
			'status': this.status,
			'body': this.body,
			'req': this.blob
		});
	}
	next();
} // end FUNCTION print()


// LISTENERS //

process.on( 'message', onMessage );


// RUN //

for ( var i = 0; i < len; i++ ) {
	run();
}


