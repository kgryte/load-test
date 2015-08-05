'use strict';

// MODULES //

var http = require( 'http' );


// ARGUMENTS //

var args = process.argv,
	opts = JSON.parse( args[ 2 ] ),
	body = args[ 3 ],
	len = parseInt( args[ 4 ], 10 );


// VARIABLES //

var pid = process.pid,
	cnt = 0;


// SERIES //

var series = [
	start,
	request,
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
		body = msg;
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

	this.start = null;
	this.end = null;
	this.timer = null;

	this.req = {
		'opts': opts,
		'body': body
	};
	this.res = {
		'status': null,
		'headers': null,
		'body': null
	};

	next();
} // end FUNCTION start()

/**
* FUNCTION: request( clbk )
*	Makes a request.
*
* @private
* @param {Function} clbk - callback to invoke after receiving a response
*/
function request( next ) {
	/* jshint validthis: true */
	var self = this,
		body = '',
		req;

	req = http.request( this.req.opts, onResponse );

	req.on( 'error', onError );

	this.start = Date.now();
	this.timer = process.hrtime();

	if ( this.req.body ) {
		req.write( this.req.body );
	}
	req.end();

	/**
	* FUNCTION: onResponse( response )
	*	Callback invoked upon receiving an HTTP response.
	*
	* @private
	* @param {Object} response - HTTP response object
	*/
	function onResponse( res ) {
		self.res.status = res.statusCode;
		self.res.headers = res.headers;
		res.setEncoding( 'utf8' );
		res.on( 'data', onData );
		res.on( 'end', onEnd );
	}

	/**
	* FUNCTION: onError( error )
	*	Callback invoked if an error is encountered while making a request.
	*
	* @private
	* @param {Error} error - error object
	*/
	function onError( error ) {
		self.req.error = error;
		console.error( error );
	}

	/**
	* FUNCTION: onData( chunk )
	*	Callback invoked after receiving a chunk of response data.
	*
	* @private
	* @param {String} chunk - response data
	*/
	function onData( chunk ) {
		body += chunk;
	}

	/**
	* FUNCTION: onEnd()
	*	Callback invoked after a response ends.
	*
	* @private
	*/
	function onEnd() {
		self.elapsed = process.hrtime( self.timer );
		self.end = Date.now();
		self.res.body = body;
		next();
	}
} // end FUNCTION request()

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
			'elapsed': convertTime( this.elapsed ),
			'end': this.end,
			'req': this.req,
			'res': this.res
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


