'use strict';

// MODULES //

var http = require( 'http' ),
	Agent = require( 'agentkeepalive' ),
	cache = require( './cache.js' );


// AGENT //

var agent = new Agent({
	'keepAlive': true,
	'maxSockets': Number.POSITIVE_INFINITY,
	'maxFreeSockets': 256,
	'timeout': 60000,
	'keepAliveTimeout': 30000
});


// REQUEST //

/**
* FUNCTION: request( clbk )
*	Makes a request.
*
* @param {Function} clbk - callback to invoke after receiving a response
*/
function request( next ) {
	/* jshint validthis: true */
	var self = this,
		body = '',
		req;

	this.req.opts.agent = agent;

	// TODO: record request headers
	// TODO: record request header length
	// TODO: record request body length

	req = http.request( this.req.opts, onResponse );
	req.on( 'error', onError );

	this.start = Date.now();
	this.timer = process.hrtime();

	if ( this.req.body ) {
		req.write( this.req.body );
	}
	req.end();

	cache[ this.rid ] = req;

	/**
	* FUNCTION: onConnect( response, socket, head )
	*	Callback invoked upon connecting to a server.
	*
	* @private
	* @param {Object} response - HTTP response object
	* @param {Socket} socket - TCP socket
	* @param {Object} head - HTTP response head
	*/
	function onConnect( response, socket, head ) {
		// Do something...
	}

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

		// TODO: record headers length

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
		if ( process.connected ) {
			// TODO: log (or not; serialize in output message?)
			console.error( process.pid, 'request', error );
		}
	}

	/**
	* FUNCTION: onData( chunk )
	*	Callback invoked after receiving a chunk of response data.
	*
	* @private
	* @param {Buffer} chunk - response data
	*/
	function onData( chunk ) {
		self.res.bytes += chunk.length;
		body += chunk.toString();
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
		delete cache[ self.rid ];
		delete self.req.opts[ 'agent' ];
		next();
	}
} // end FUNCTION request()


// EXPORTS //

module.exports = request;
