'use strict';

// MODULES //

var test = require( 'tape' );
var isNumberArray = require( 'validate.io-number-primitive-array' );
var time = require( './../lib/time.js' );


// TESTS //

test( 'file exports a function', function test( t ) {
	t.ok( typeof time === 'function', 'export is a function' );
	t.end();
});

test( 'function returns a numeric array', function test( t ) {
	var arr = time( '2015-12-01', '2016-01-01' );
	t.ok( isNumberArray( arr ), 'numeric array' );
	t.end();
});

test( 'function returns an array of linearly spaced JavaScript timestamps (each separated by a day and start/end inclusive)', function test( t ) {
	var expected;
	var actual;
	var i;

	// 7 days...
	actual = time( '2015-12-01', '2015-12-07' );

	expected = new Array( 7 );
	expected[ 0 ] = (new Date( '2015-12-01' )).getTime();
	for ( i = 1; i < expected.length; i++ ) {
		expected[ i ] = expected[ 0 ] + i*86400000; // 1000*60*60*24
	}
	t.deepEqual( actual, expected );
	t.end();
});
