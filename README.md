# node-glob-tail
Return the tail of all files matching a glob pattern.

## Usage
    var globTail = require('glob-tail');
  
    globTail('**/*.log', { limit: 50 }, function (results) {
      results.forEach(function(result) {
				console.log(Array(result.value.filename.length + 1).join('*'));
				console.log(result.value.filename);
				console.log(Array(result.value.filename.length + 1).join('*'));
				console.log();
				console.log(result.value.tail.join('\n'));
				console.log();
				console.log();
      });
    });
