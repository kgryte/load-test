'use strict';

/**
* FUNCTION: convertTime( time )
*	Converts a high resolution time array to milliseconds.
*
* @param {Number[]} time - high resolution time
* @returns {Number} time in milliseconds
*/
function convertTime( time ) {
	return time[ 0 ]*1e3 + time[ 1 ]*1e-6;
} // end FUNCTION convertTime()


// EXPORTS //

module.exports = convertTime;
