var Q = require('q')
	, glob = require('glob')
	, fsr = require('fs-reverse');

function retrieveTails(pattern, opts, cb) {
	opts = opts || {};

	glob(pattern, {}, function(err, filenames) {
		if (err) {
			cb(err);
		}

		Q.allSettled(filenames.map(function(filename) {
			return tail(filename, opts.limit || 100);
		})).then(function(results) {
			cb(null, results.filter(function(result) {
				return result.state === 'fulfilled';
			}).map(function(result) {
				return result.value;
			}));
		});

		function tail(filename, limit) {
			var stream = fsr(filename, {})
				, deferred = Q.defer()
				, lines = [];

			stream.on('data', function(data) {
				if (data && lines.length < limit) {
					lines.unshift(data);
				}
			}).on('end', function() {
				console.log(lines);
				deferred.resolve({filename: filename, tail: lines});
			}).on('error', function(err) {
				deferred.reject(err);
			});

			return deferred.promise;
		}
	});
}

module.exports = retrieveTails;
