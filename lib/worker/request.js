'use strict';

// MODULES //

var http = require( 'http' ),
	cache = require( './cache.js' );


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
		delete cache[ self.rid ];
		next();
	}
} // end FUNCTION request()


// EXPORTS //

module.exports = request;
