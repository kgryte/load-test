'use strict';

/**
* FUNCTION: onClose( code, signal )
*	Callback invoked when all process stdio streams have terminated.
*
* @param {Number} code - exit code
* @param {String} signal - exit signal (if killed by parent)
*/
function onClose( code, signal ) {
	// TODO: log
	console.log( process.pid, 'closed', code, signal );
} // end FUNCTION onClose()


// EXPORTS //

module.exports = onClose;
