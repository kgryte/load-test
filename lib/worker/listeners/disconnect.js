'use strict';

// MODULES //

var cache = require( './../cache.js' );


// ON DISCONNECT //

/**
* FUNCTION: onDisconnect()
*	Callback invoked after the process is disconnected.
*/
function onDisconnect() {
	var rids = Object.keys( cache ),
		len = rids.length,
		i;

	// TODO: log
	console.log( process.pid, 'disconnected' );

	// Abort any pending requests...
	for ( i = 0; i < len; i++ ) {
		cache[ rids[i] ].abort();

		// TODO: log
		console.log( process.pid, 'aborting request: ', rids[ i ] );
	}
} // end FUNCTION onDisconnect()


// EXPORTS //

module.exports = onDisconnect;
