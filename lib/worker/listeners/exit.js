'use strict';

/**
* FUNCTION: onExit( code, signal )
*	Callback invoked when the child process ends.
*
* @param {Number|Null} code - exit code
* @param {String|Null} signal - exit signal (if killed by parent)
*/
function onExit( code, signal ) {
	// TODO: log
	console.log( process.pid, 'exit', code, signal );
} // end FUNCTION onExit()


// EXPORTS //

module.exports = onExit;
