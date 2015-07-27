describe('glob-tail', function() {
	var globTail;

	beforeEach(function() {
		globTail = require('../index.js');
	});

	it('should return 100 lines by default', function(done) {
		globTail('spec/files/one-hundred-lines.txt', null, function(err, results) {
			expect(results.length).toEqual(1);
			expect(results[0].tail.length).toEqual(100);
			done();
		});
	});

	it('should return only number of lines specified in options', function(done) {
		globTail('spec/files/ten-lines.txt', {limit: 5}, function(err, results) {
			expect(results.length).toEqual(1);
			expect(results[0].tail.length).toEqual(5);
			done();
		});
	});
});
