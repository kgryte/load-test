'use strict';

// MODULES //

var fork = require( 'child_process' ).fork,
	path = require( 'path' );


// VARIABLES //

var MPATH = path.join( __dirname, 'worker/index.js' );


// LOAD TEST //

/**
* FUNCTION: LoadTest( [options] )
*	Creates a new LoadTest instance.
*
* @constructor
* @param {Object} [options] - load test options
* @returns {LoadTest} new LoadTest instance
*/
function LoadTest( options ) {
	var opts;
	if ( arguments.length ) {
		opts = options;
	} else {
		opts = {};
	}
	if ( !(this instanceof LoadTest) ) {
		return new LoadTest( opts );
	}
	// TODO: options validation
	// num threads/processes/cpus/parallel
	// total number of requests / total time
	// total number of concurrent requests
	// whether to stream raw output (eg, line-by-line response csv data)
	this._cpus = 4;

	// Number of concurrent requests:
	this._c = 1000;

	// Test sequences:
	this._tests = [];

	// Worker processes:
	this._workers = {};

	return this;
} // end FUNCTION LoadTest()

/**
* METHOD: test( name, sequence )
*	Registers a test sequence.
*
* @param {String} name - test sequence name
* @param {Function|Function[]} sequence - test sequence
* @returns {LoadTest} LoadTest instance
*/
LoadTest.prototype.test = function test( name, seq ) {
	// TODO: validate name
	// TODO: validate fcn array

	this._tests.push({
		'name': name,
		'seq': seq
	});

	return this;
}; // end METHOD test()

/**
* METHOD: start()
*	Starts load testing.
*
* @returns {LoadTest} LoadTest instance
*/
LoadTest.prototype.start = function start() {
	var self = this,
		start = Date.now(),
		count = 0,
		sum = 0,
		len,
		num,
		c,
		w, i;


	var opts = JSON.stringify({
		'hostname': '127.0.0.1',
		'port': 7331,
		'method': 'GET',
		'headers': {
			'Content-type': 'text/plain',
			'Content-Length': 0
		},
		'keepAlive': true
	});

	c = this._c.toString();
	num = c / this._cpus;

	len = this._cpus;
	for ( i = 0; i < len; i++ ) {
		w = fork( MPATH, [ opts, '', num ] );
		w.on( 'error', onError );
		w.on( 'exit', onExit );
		w.on( 'close', onClose );
		w.on( 'disconnect', onDisconnect );
		w.on( 'message', onMessage );

		console.log( 'pid: %d', w.pid );

		self._workers[ w.pid ] = w;
	}

	setTimeout( end, 10000 );

	function end() {
		var pids = Object.keys( self._workers ),
			stop,
			diff;

		stop = Date.now();
		for ( var i = 0; i < pids.length; i++ ) {
			self._workers[ pids[i] ].disconnect();
		}
		diff = (stop-start)/1000;
		console.log( 'total time: %d', sum/1000 );
		console.log( 'num requests: %d', count );
		console.log( 'time per request: %d', sum/count );
		console.log( 'rps: %d', 1*self._c / (sum/count/1000) );
	}

	function onError( err ) {
		/* jshint validthis: true */

		// TODO: should probably shut down the process and create another.
		console.error( this.pid, err );
	}
	function onExit( code, signal ) {
		/* jshint validthis: true */
		console.log( this.pid, code, signal );
	}
	function onClose( code, signal ) {
		/* jshint validthis: true */
		console.log( this.pid, code, signal );
	}
	function onDisconnect() {
		/* jshint validthis: true */
		console.log( this.pid, 'disconnected' );
	}
	function onMessage( msg ) {
		/* jshint validthis: true */
		count += 1;
		sum += msg.elapsed;
		console.log( '%s,%d', msg.rid, msg.elapsed );
		this.send( null );
	}
}; // end METHOD start()



// EXPORTS //

module.exports = LoadTest;
