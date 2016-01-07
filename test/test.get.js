'use strict';

// MODULES //

var test = require( 'tape' );
var assert = require( 'chai' ).assert;
var proxyquire = require( 'proxyquire' );
var get = require( './../lib/get.js' );


// FIXTURES //

var data = require( './fixtures/data.json' );
var results = require( './fixtures/results.json' );
var getOpts = require( './fixtures/opts.js' );


// TESTS //

test( 'file exports a function', function test( t ) {
	t.ok( typeof get === 'function', 'export is a function' );
	t.end();
});

test( 'function returns an error to a provided callback if an error is encountered when fetching package download counts', function test( t ) {
	var opts;
	var get;

	get = proxyquire( './../lib/get.js', {
		'./request.js': request
	});

	opts = getOpts();
	get( opts, done );

	function request( opts, clbk ) {
		setTimeout( onTimeout, 0 );
		function onTimeout() {
			clbk( new Error( 'beep' ) );
		}
	}

	function done( error ) {
		t.ok( error instanceof Error, 'error instance' );
		t.equal( error.message, 'beep' );
		t.end();
	}
});

test( 'function returns results to a provided callback', function test( t ) {
	var expected;
	var opts;
	var get;

	get = proxyquire( './../lib/get.js', {
		'./request.js': request
	});

	expected = results;

	opts = getOpts();
	get( opts, done );

	function request( opts, clbk ) {
		setTimeout( onTimeout, 0 );
		function onTimeout() {
			clbk( null, data );
		}
	}

	function done( error, data ) {
		assert.deepEqual( data, expected );
		t.ok( true, 'deep equal' );
		t.end();
	}
});

test( 'function can split packages across multiple requests', function test( t ) {
	var count;
	var pkgs;
	var opts;
	var get;

	pkgs = [
		['beep'],
		['boop'],
		['unknown_package_name']
	];

	get = proxyquire( './../lib/get.js', {
		'./request.js': request,
		'chunk-string-array': chunk
	});

	count = 0;

	opts = getOpts();
	get( opts, done );

	function chunk() {
		return pkgs;
	}

	function request( opts, clbk ) {
		var idx;

		count += 1;
		idx = count - 1;

		t.equal( opts.packages, pkgs[ idx ][ 0 ], 'chunk packages are equal' );
		setTimeout( onTimeout, 0 );

		function onTimeout() {
			var pkg;
			var d;
			pkg = pkgs[ idx ][ 0 ];
			d = {};
			d[ pkg ] = data[ pkg ];
			clbk( null, d );
		}
	}

	function done( error, data ) {
		t.ok( !error, 'no error' );
		t.equal( count, pkgs.length, 'split packages across multiple requests' );
		assert.deepEqual( data, results );
		t.ok( true, 'deep equal' );
		t.end();
	}
});

test( 'function returns the first error and should not invoke a callback multiple times', function test( t ) {
	var count;
	var pkgs;
	var opts;
	var get;

	pkgs = [
		['beep'],
		['boop'],
		['unknown_package_name']
	];

	get = proxyquire( './../lib/get.js', {
		'./request.js': request,
		'chunk-string-array': chunk
	});

	count = 0;

	opts = getOpts();
	get( opts, done );

	function chunk() {
		return pkgs;
	}

	function request( opts, clbk ) {
		var cnt;
		count += 1;
		cnt = count;
		setTimeout( onTimeout, 0 );
		function onTimeout() {
			clbk( new Error( 'beep'+cnt ) );
		}
	}

	function done( error ) {
		t.ok( error instanceof Error, 'error instance' );
		t.equal( error.message, 'beep1', 'equal error messages' );
		t.end();
	}
});

test( 'a package without download counts returns a data response where the counts value is `null`', function test( t ) {
	var expected;
	var opts;
	var get;

	get = proxyquire( './../lib/get.js', {
		'./request.js': request
	});

	expected = [
		{
			'package': 'unknown_package_name',
			'data': null
		}
	];

	opts = getOpts();
	opts.packages = [ 'unknown_package_name' ];
	get( opts, done );

	function request( opts, clbk ) {
		setTimeout( onTimeout, 0 );
		function onTimeout() {
			clbk({
				'status': 404,
				'message': 'Not Found'
			});
		}
	}

	function done( error, data ) {
		assert.deepEqual( data, expected );
		t.ok( true, 'deep equal' );
		t.end();
	}
});
