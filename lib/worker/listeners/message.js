'use strict';

// MODULES //

var topical = require( 'topical' ),
	run = require( './../run.js' );


// ON MESSAGE //

/**
* FUNCTION: onMessage( msg )
*	Callback invoked upon receiving a message from the parent process.
*
* @param {*} msg - message
*/
function onMessage( msg ) {
	// TODO: log
	if ( msg !== null ) {
		if ( msg.opts ) {
			topical.publish( 'opts', msg.opts );
		}
		if ( msg.body ) {
			topical.publish( 'body', msg.body );
		}
	}
	run();
} // end FUNCTION onMessage()


// EXPORTS //

module.exports = onMessage;
