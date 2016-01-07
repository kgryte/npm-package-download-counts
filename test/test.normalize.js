'use strict';

// MODULES //

var test = require( 'tape' );
var assert = require( 'chai' ).assert;
var normalize = require( './../lib/normalize.js' );


// TESTS //

test( 'file exports a function', function test( t ) {
	t.ok( typeof normalize === 'function', 'export is a function' );
	t.end();
});

test( 'if a desired package has an error message, the function sets the data value to `null`', function test( t ) {
	var expected;
	var actual;
	var data;
	var pkgs;

	data = {
		'error': 'Not Found'
	};
	pkgs = [ 'beep' ];

	expected = {
		'beep': null
	};
	actual = normalize( pkgs, data );

	assert.deepEqual( actual, expected );
	t.ok( true, 'deep equal' );
	t.end();
});

test( 'if a desired package is not found, the function sets the data value to `null`', function test( t ) {
	var expected;
	var actual;
	var data;
	var pkgs;

	data = {
		'status': 404,
		'message': 'Not Found'
	};
	pkgs = [ 'beep' ];

	expected = {
		'beep': null
	};
	actual = normalize( pkgs, data );

	assert.deepEqual( actual, expected );
	t.ok( true, 'deep equal' );
	t.end();
});

test( 'the function maps raw response data for a single package to an equivalent data structure for multiple packages', function test( t ) {
	var expected;
	var actual;
	var data;
	var pkgs;

	data = {
		'package': 'beep',
		'downloads': [],
		'start': '2015-12-01',
		'end': '2016-01-01'
	};
	pkgs = [ 'beep' ];

	expected = {
		'beep': data
	};
	actual = normalize( pkgs, data );

	assert.deepEqual( actual, expected );
	t.ok( true, 'deep equal' );
	t.end();
});

test( 'for multiple package results, the function maps missing packages to an equivalent data structure found for single package results', function test( t ) {
	var expected;
	var actual;
	var data;
	var pkgs;

	data = {
		'beep': {
			'package': 'beep',
			'downloads': [],
			'start': '2015-12-01',
			'end': '2016-01-01'
		}
	};
	pkgs = [ 'beep', 'boop' ];

	expected = {
		'beep': data.beep,
		'boop': null
	};
	actual = normalize( pkgs, data );

	assert.deepEqual( actual, expected );
	t.ok( true, 'deep equal' );
	t.end();
});
