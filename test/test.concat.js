'use strict';

// MODULES //

var test = require( 'tape' );
var concat = require( './../lib/concat.js' );


// TESTS //

test( 'file exports a function', function test( t ) {
	t.ok( typeof concat === 'function', 'export is a function' );
	t.end();
});

test( 'concatenates an array of arrays', function test( t ) {
	var actual = concat( [[1],[2,3],[4]] );
	var expected = [1,2,3,4];
	t.deepEqual( actual, expected );
	t.end();
});

test( 'case: only 1 sub-array', function test( t ) {
	var actual = concat( [[1]] );
	var expected = [ 1 ];
	t.deepEqual( actual, expected );
	t.end();
});

test( 'case: only 1 empty sub-array', function test( t ) {
	var actual = concat( [[]] );
	var expected = [];
	t.deepEqual( actual, expected );
	t.end();
});
