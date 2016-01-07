'use strict';

var ls = require( 'npm-list-author-packages' );
var counts = require( './../lib' );

// Get download counts for all author packages...
var opts = {
	'username': 'kgryte'
};

ls( opts, onList );

function onList( error, list ) {
	var opts;
	if ( error ) {
		throw error;
	}
	if ( !list.length ) {
		return;
	}
	opts = {
		'packages': list
	};
	counts( opts, onUrls );
}

function onUrls( error, data ) {
	if ( error ) {
		throw error;
	}
	console.dir( data );
}
