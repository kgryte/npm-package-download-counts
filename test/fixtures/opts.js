'use strict';

function getOpts() {
	var opts = {
		'packages': [
			'beep',
			'boop',
			'unknown_package_name'
		],
		'period': 'last-week',
		'hostname': 'api.npmjs.org',
		'port': 443,
		'protocol': 'https'
	};
	return opts;
}


// EXPORTS //

module.exports = getOpts;
