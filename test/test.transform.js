'use strict';

// MODULES //

var test = require( 'tape' );
var assert = require( 'chai' ).assert;
var transform = require( './../lib/transform.js' );


// FIXTURES //

var data = require( './fixtures/data.json' );
var results = require( './fixtures/results.json' );


// TESTS //

test( 'file exports a function', function test( t ) {
	t.ok( typeof transform === 'function', 'export is a function' );
	t.end();
});

test( 'the transform maps a JSON object data structure to a JSON object array where missing time values are zero-filled, each datum is a two-element array, and, for packages without download counts, the data value is set to `null`', function test( t ) {
	var actual;
	var pkgs;

	pkgs = [
		'beep',
		'boop',
		'unknown_package_name'
	];
	actual = transform( pkgs, data );

	assert.deepEqual( actual, results );
	t.ok( true, 'deep equal' );

	t.end();
});
