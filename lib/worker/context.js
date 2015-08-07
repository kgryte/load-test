'use strict';

// MODULES //

var topical = require( 'topical' );


// VARIABLES //

var args = process.argv,
	opts = JSON.parse( args[ 2 ] ),
	body = args[ 3 ];


// FUNCTIONS //

/**
* FUNCTION: onOpts( msg )
*	Callback invoked upon a worker receiving new options.
*
* @param {Object} msg
*/
function onOpts( msg ) {
	opts = msg;
} // end FUNCTION onOpts()

/**
* FUNCTION: onBody( msg )
*	Callback invoked upon a worker receiving a new request body.
*
* @param {String} body
*/
function onBody( msg ) {
	body = msg;
} // end FUNCTION onBody()


// PUBSUB //

topical
	.add( 'opts' )
	.add( 'body' );

topical
	.subscribe( 'opts', onOpts )
	.subscribe( 'body', onBody );


// CONTEXT //

/**
* FUNCTION: context()
*	Returns a new worker context.
*
* @returns {Object} worker context
*/
function context() {
	return {
		'_opts': opts,
		'_body': body
	};
} // end FUNCTION context()


// EXPORTS //

module.exports = context;
