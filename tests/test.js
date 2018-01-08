// Richard Wen
// rrwen.dev@gmail.com

// (packages) Package dependencies
var fs = require('fs');
var moment = require('moment');
var test = require('tape');
var yargs = require('yargs');

// (test_info) Get package metadata
var json = JSON.parse(fs.readFileSync('package.json', 'utf8'));
var testedPackages = [];
for (var k in json.dependencies) {
	testedPackages.push(k + ' (' + json.dependencies[k] + ')');
}
var devPackages = [];
for (var k in json.devDependencies) {
	devPackages.push(k + ' (' + json.devDependencies[k] + ')');
}

// (test_log) Pipe tests to file and output
if (!fs.existsSync('./tests/log')){
	fs.mkdirSync('./tests/log');
}
if (!fs.existsSync('./tests/out')){
	fs.mkdirSync('./tests/out');
}
var testFile = './tests/log/test_' + json.version.split('.').join('_') + '.txt';
test.createStream().pipe(fs.createWriteStream(testFile));
test.createStream().pipe(process.stdout);

// (test) Run tests
console.log = function(){};
test('Tests for ' + json.name + ' (' + json.version + ')', t => {
	t.comment('Node.js (' + process.version + ')');
	t.comment('Description: ' + json.description);
	t.comment('Date: ' + moment().format('YYYY-MM-DD hh:mm:ss'));
	t.comment('Dependencies: ' + testedPackages.join(', '));
	t.comment('Developer: ' + devPackages.join(', '));

	// (test_variables) Test variables used for all tests
	var actual, expected;
	
	// (test_default) Tests on default options
	t.comment('(A) tests on default options');
	var env = require('../index.js');
	var defaultHandler = env().handler;
	
	// (test_default_clear) Test default clear command
	actual = defaultHandler({_: ['env'], task: 'clear', env: './tests/out/env.env', key: {option: 'value'}});
	expected = {_: ['env'], task: 'clear', env: './tests/out/env.env', key: {option: 'value'}};
	t.deepEquals(actual, expected, '(A) env clear');
	
	// (test_default_reset) Test default reset command
	actual = defaultHandler({_: ['env'], task: 'reset', env: './tests/out/env.env'});
	expected = {_: ['env'], task: 'reset', env: './tests/out/env.env'};
	t.deepEquals(actual, expected, '(A) env reset');
	
	// (test_default_view) Test default view command
	actual = defaultHandler({_: ['env'], env: './tests/out/env.env', task: 'view'});
	expected = {_: ['env'], env: './tests/out/env.env', task: 'view'};
	t.deepEquals(actual, expected, '(A) env view');
	
	// (test_default_set) Test default set command
	actual = defaultHandler({_: ['env'], task: 'set', env: './tests/out/env.env', key: 'field', value: 'value'});
	expected = {_: ['env'], task: 'set', env: './tests/out/env.env', key: 'field', value: 'value'};
	t.deepEquals(actual, expected, '(A) env set');
	
	// (test_default_set_env) Test default set command in process.env
	actual = process.env.field;
	expected = 'value';
	t.equals(actual, expected, '(A) process.env set')
	
	// (test_default_delete) Test default delete command
	actual = defaultHandler({_: ['env'], task: 'delete', env: './tests/out/env.env', key: 'field'});
	expected = {_: ['env'], task: 'delete', env: './tests/out/env.env', key: 'field'};
	t.deepEquals(actual, expected, '(A) env delete');
	
	// (test_default_delete_env) Test default delete command in process.env
	actual = process.env.field;
	expected = undefined;
	t.equals(actual, expected, '(A) process.env delete')
	
	// (test_custom) Tests on custom options
	t.comment('(B) tests on custom options');
	env = require('../index.js')({
		file: './tests/out/env2.env',
		command: 'env2',
		defaults: {field: 'value'},
		describe: 'Description',
		task: {
			command: 'task2',
			key: 'key2',
			value: 'value2',
			env: 'env2',
			reset: 'reset2',
			clear: 'clear2',
			view: 'view2',
			delete: 'delete2',
			set: 'set2'
		}
	});
	var customHandler = env.handler;
	
	// (test_custom_clear) Test custom clear command
	actual = customHandler({_: ['env2'], task2: 'clear2', env: {option: 'value'}});
	expected = {_: ['env2'], task2: 'clear2', env: {option: 'value'}};
	t.deepEquals(actual, expected, '(B) env2 clear2');
	
	// (test_custom_reset) Test custom reset command
	actual = customHandler({_: ['env2'], task2: 'reset2'});
	expected = {_: ['env2'], task2: 'reset2'};
	t.deepEquals(actual, expected, '(B) env2 reset2');
	
	// (test_custom_view) Test custom view command
	actual = customHandler({_: ['env2'], env2: './tests/out/env2.env', task2: 'view2'});
	expected = {_: ['env2'], env2: './tests/out/env2.env', task2: 'view2'};
	t.deepEquals(actual, expected, '(B) env2 view2');
	
	// (test_custom_set) Test custom set command
	actual = customHandler({_: ['env2'], task2: 'set2', key2: 'field', value2: 'value2'});
	expected = {_: ['env2'], task2: 'set2', key2: 'field', value2: 'value2'};
	t.deepEquals(actual, expected, '(B) env2 set2');
	
	// (test_custom_set_env) Test custom set command in process.env
	var setSecond = customHandler({_: ['env2'], task2: 'set2', key2: 'field2', value2: 'value3'});
	actual = {field: process.env.field, field2: process.env.field2};
	expected = {field: 'value2', field2: 'value3'};
	t.deepEquals(actual, expected, '(A) process.env set2')
	
	// (test_custom_delete) Test custom delete command
	actual = customHandler({_: ['env2'], task2: 'delete2', key2: 'field'});
	expected = {_: ['env2'], task2: 'delete2', key2: 'field'};
	t.deepEquals(actual, expected, '(B) env2 delete2');
	
	// (test_end) End tests and cleanup files
	fs.unlinkSync('./tests/out/env.env');
	fs.unlinkSync('./tests/out/env2.env');
	t.end();
});
