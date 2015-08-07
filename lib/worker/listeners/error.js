'use strict';

/**
* FUNCTION: onError( error )
*	Callback invoked upon encountering an error.
*
* @param {Error} error - error object
*/
function onError( error ) {
	// TODO: log
	console.error( process.pid, error );
} // end FUNCTION onError()


// EXPORTS //

module.exports = onError;
