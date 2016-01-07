'use strict';

function getOpts() {
	var opts = {
		'packages': [
			'beep',
			'boop',
			'unknown_package_name'
		],
		'period': 'last-month'
	};
	return opts;
}


// EXPORTS //

module.exports = getOpts;
