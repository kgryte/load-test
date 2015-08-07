'use strict';

// MODULES //

var run = require( './run.js' );


// ARGUMENTS //

var args = process.argv,
	len = parseInt( args[ 4 ], 10 );


// LISTENERS //

var evt = require( './listeners' );
process.on( 'message', evt.message );
process.on( 'disconnect', evt.disconnect );
process.on( 'error', evt.error );
process.on( 'close', evt.close );
process.on( 'exit', evt.exit );


// RUN //

for ( var i = 0; i < len; i++ ) {
	run();
}


