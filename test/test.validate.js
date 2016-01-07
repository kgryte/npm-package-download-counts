'use strict';

// MODULES //

var test = require( 'tape' );
var validate = require( './../lib/validate.js' );


// TESTS //

test( 'file exports a validation function', function test( t ) {
	t.ok( typeof validate === 'function', 'file exports a function' );
	t.end();
});

test( 'if an options argument is not an object, the function returns a type error', function test( t ) {
	var values;
	var err;
	var i;

	values = [
		'5',
		5,
		NaN,
		null,
		undefined,
		true,
		[],
		function(){}
	];

	for ( i = 0; i < values.length; i++ ) {
		err = validate( {}, values[i] );
		t.ok( err instanceof TypeError, 'returns type error when provided ' + values[i] );
	}
	t.end();
});

test( 'a packages option is required', function test( t ) {
	var err = validate( {}, {} );
	t.ok( err instanceof TypeError, 'packages required' );
	t.end();
});

test( 'if provided a packages option which is not an array of primitive strings, the function returns a type error', function test( t ) {
	var values;
	var err;
	var i;

	values = [
		'5',
		5,
		NaN,
		null,
		undefined,
		true,
		[],
		['1',2],
		['1',null],
		{},
		function(){}
	];

	for ( i = 0; i < values.length; i++ ) {
		err = validate( {}, {
			'packages': values[i]
		});
		t.ok( err instanceof TypeError, 'returns type error when provided ' + values[i] );
	}
	t.end();
});

test( 'if provided a period option which is not a primitive string, the function returns a type error', function test( t ) {
	var values;
	var err;
	var i;

	values = [
		5,
		NaN,
		null,
		undefined,
		true,
		[],
		{},
		function(){}
	];

	for ( i = 0; i < values.length; i++ ) {
		err = validate( {}, {
			'packages': ['beep'],
			'period': values[i]
		});
		t.ok( err instanceof TypeError, 'returns type error when provided ' + values[i] );
	}
	t.end();
});

test( 'if provided a hostname option which is not a primitive string, the function returns a type error', function test( t ) {
	var values;
	var err;
	var i;

	values = [
		5,
		NaN,
		null,
		undefined,
		true,
		[],
		{},
		function(){}
	];

	for ( i = 0; i < values.length; i++ ) {
		err = validate( {}, {
			'packages': ['beep'],
			'hostname': values[i]
		});
		t.ok( err instanceof TypeError, 'returns type error when provided ' + values[i] );
	}
	t.end();
});

test( 'if provided a port option which is not a nonnegative integer, the function returns a type error', function test( t ) {
	var values;
	var err;
	var i;

	values = [
		'5',
		Math.PI,
		-5,
		NaN,
		null,
		undefined,
		true,
		[],
		{},
		function(){}
	];

	for ( i = 0; i < values.length; i++ ) {
		err = validate( {}, {
			'packages': ['beep'],
			'port': values[i]
		});
		t.ok( err instanceof TypeError, 'returns type error when provided ' + values[i] );
	}
	t.end();
});

test( 'if provided a protocol option which is not a supported protocol, the function returns a type error', function test( t ) {
	var values;
	var err;
	var i;

	values = [
		'5',
		'beep',
		'ftp',
		'smtp',
		5,
		NaN,
		null,
		undefined,
		true,
		[],
		{},
		function(){}
	];

	for ( i = 0; i < values.length; i++ ) {
		err = validate( {}, {
			'packages': ['beep'],
			'protocol': values[i]
		});
		t.ok( err instanceof TypeError, 'returns type error when provided ' + values[i] );
	}
	t.end();
});

test( 'the function returns `null` if all options are valid', function test( t ) {
	var err;

	err = validate( {}, {
		'packages': ['beep'],
		'period': '2015-12-01:2016-01-01',
		'hostname': 'api.npmjs.org',
		'port': 443,
		'protocol': 'https'
	});
	t.equal( err, null );

	t.end();
});

test( 'the function will ignore unrecognized options', function test( t ) {
	var err;

	err = validate( {}, {
		'packages': ['beep'],
		'beep': 'boop',
		'a': [1,2,3]
	});
	t.equal( err, null );

	t.end();
});
