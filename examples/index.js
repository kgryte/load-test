'use strict';

var http = require( 'http' ),
	lt = require( './../lib' );

var PORT = 7331;

function onRequest( request, response ){
	response.writeHead( 200, {
		'Content-Type': 'text/plain'
	});
	response.end( 'Ok' );
}

function onListen(){
	var test = lt();
	setTimeout( delay, 5000 );
	function delay() {
		test.start();
	}
}

var server = http.createServer( onRequest );
server.listen( PORT, onListen );

