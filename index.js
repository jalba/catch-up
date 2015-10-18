var argv = require('yargs')
    .usage('Usage: $0 <command> [options]')
    .options({'test': {
                    alias: 't',
                    describe: 'a file path or command against which to test the updates',
                    demand: true,
                    type: 'array'
              },
              'only': {
              	    alias: 'o',
              	    describe: 'the name of a module or a list (separated by a space) of modules to update',
              	    demand: false,
              	    type: 'array'
              }
    })
    .help('h')
    .alias('h', 'help')
    .argv,
    child_process = require('child_process'),
    test = argv.test.shift(),
    testOptions = argv.test, 
    only = argv.only;


if(only) {
	console.log(only);
	process.exit(0);
}

if(test.substr(test.length-3) === '.js') {
	console.log('this is a js file');
} else {
    child_process.execFile(test, testOptions, function(error, stdout, stderr){
    	if(error) {
    		console.log('OOOPPPS, updating this module will break your app');
    		process.exit(1);
    	} else {
    		console.log('All good!!!');
    		process.exit(0);
    	}
    });
}