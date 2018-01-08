// Richard Wen
// rrwen.dev@gmail.com

var envfile = require('envfile');
var fs = require('fs');

/**
 * Yargs command for managing env files.
 *
 * * {@link https://www.npmjs.com/package/yargs Yargs npm Package}
 * * {@link https://www.npmjs.com/package/dotenv dotenv npm Package}
 *
 * @module env
 * @param {Object} [options={}] options for this function.
 * @param {string} options.file default path to env file for yargs.
 *
 * * The command line argument `[--env]` will take priority over `options.file` 
 *
 * @param {string} [options.command='env'] name of base `<env>` command.
 *
 * 1. **Original**: `env <task> [key] [value] [--env]`
 * 2. **options.command='newenv':** `newenv <task> [key] [value] [--env]`
 *
 * @param {Object} [options.defaults={}] default env object to be used.
 *
 *  * If `options.defaults` is undefined, the object `argv.env` will be used before defaulting to `{}` 
 *
 * @param {string} options.describe description for base `<env>` command.
 * @param {Object} [options.task={}] options for `<task>` commands.
 * @param {Object} [options.task.command='task'] name of `<task>` command.
 *
 * 1. **Original**: `env <task> [key] [value] [--env]`
 * 2. **options.task.command='newtask':** `env <newtask> [key] [value] [--env]`
 *
 * @param {string} [options.task.key='key'] name of optional `[key]` argument.
 *
 * 1. **Original**: `env <task> [key] [value] [--env]`
 * 2. **options.task.key='newkey':** `env <task> [newkey] [value] [--env]`
 *
 * @param {string} [options.task.value='value'] name of optional `[value]` argument.
 *
 * 1. **Original**: `env <task> [key] [value] [--env]`
 * 2. **options.task.value='newvalue':** `env <task> [key] [newvalue] [--env]`
 *
 * @param {string} [options.task.env='env'] name of optional `[--env]` argument.
 *
 * 1. **Original**: `env <task> [key] [value] [--env]`
 * 2. **options.task.env='newenv':** `env <task> [key] [value] [--newenv]`
 *
 * @param {Object} [options.task.reset='reset'] name of `<task`> command for `reset`.
 *
 * 1. **Original**: `env reset [--env]`
 * 2. **options.task.reset='newreset':** `env newreset [--env]`
 *
 * @param {Object} [options.task.clear='clear'] name of `<task`> command for `clear`.
 *
 * 1. **Original**: `env clear [--env]`
 * 2. **options.task.reset='newclear':** `env newclear [--env]`
 *
 * @param {Object} [options.task.view='view'] name of `<task`> command for `view`.
 *
 * 1. **Original**: `env view [--env]`
 * 2. **options.task.view='newview':** `env newview [--env]`
 *
 * @param {Object} [options.task.delete='delete'] name of `<task`> command for `delete`.
 *
 * 1. **Original**: `env delete [--env]`
 * 2. **options.task.delete='newdelete':** `env newdelete [key] [--env]`
 *
 * @param {Object} [options.task.set='set'] name of `<task`> command for `set`.
 *
 * 1. **Original**: `env set [--env]`
 * 2. **options.task.set='newset':** `env newset [key] [value] [--env]`
 *
 * @returns {Object} Yargs {@link https://github.com/yargs/yargs/blob/master/docs/advanced.md#providing-a-command-module Command Module} with the following properties (`out` is the returned Object):
 *
 * * `out.command`: the command string in the form of `options.command <options.task.command> [options.task.key] [options.task.value] [--options.task.env]`
 * * `out.describe`: the description string for `out.command`
 * * `out.handler`: the function that manages the env file and returns an `argv` Object containing command line arguments
 *
 * @example
 * // *** DEFAULT ***
 *
 * var yargs = require('yargs');
 *
 * // (env) Load command with path to env file
 * var env = require('yargs-command-env')({file: 'path/to/.env'});
 *
 * // (yargs) Add command to manage env file
 * var argv = yargs.command(env).argv;
 *
 * // *** CUSTOM ***
 *
 * var yargs = require('yargs');
 *
 * // (options_command) Setup command options
 * options = {};
 * options.file = 'path/to/.env';
 * options.command = 'env2';
 * options.defaults = {field: 'value'};
 * options.describe = 'Description';
 *
 * // (options_task) Setup task options
 * options.task = {};
 * options.task.command = 'task2';
 * options.task.key = 'key2';
 * options.task.value = 'value2';
 * options.task.env = 'env2';
 * options.task.reset = 'reset2';
 * options.task.clear = 'clear2';
 * options.task.view = 'view2';
 * options.task.delete = 'delete2';
 * options.task.set = 'set2';
 *
 * // (env) Load command with options
 * var env = require('yargs-command-env')(options);
 *
 * // (yargs) Add command to manage env file
 * var argv = yargs.command(env).argv;
 *
 */
module.exports = options => {
	options = options || {};
	
	// (default_task) Default task options
	options.task = options.task || {};
	options.task.command = options.task.command || 'task' ;
	options.task.key = options.task.key || 'key';
	options.task.value = options.task.value || 'value';
	options.task.env = options.task.env || 'env';
	options.task.reset = options.task.reset || 'reset';
	options.task.clear = options.task.clear || 'clear';
	options.task.view = options.task.view || 'view';
	options.task.delete = options.task.delete || 'delete';
	options.task.set = options.task.set || 'set';
	
	// (default) Default options
	options.command = options.command || 'env';
	options.describe = options.describe || 
		'manage default env' +
		'\n\n<' + options.task.command + '> is one of:' +
		'\n\n* ' + options.task.set +
		'\n* ' + options.task.delete +
		'\n* ' + options.task.view +
		'\n* ' + options.task.clear +
		'\n* ' + options.task.reset +
		'\n\nSet variable to value' +
		'\n> ' +  options.task.set + ' [' + options.task.key + '] [' + options.task.value + ']' +
		'\n\nRemove default variable' +
		'\n> ' + options.task.delete + ' [' + options.task.key + ']' +
		'\n\nView default variable' +
		'\n> ' + options.task.view +
		'\n\nClear default variable' +
		'\n> ' + options.task.clear +
		'\n\nReset default variable' +
		'\n> ' + options.task.reset +
		'\n\nManage other env file' +
		'\n> ' +  options.task.set + ' [' + options.task.key + '] [' + options.task.value + ']' + ' --' + options.task.env + ' other.env' +
		'\n> ' + options.task.delete + ' [' + options.task.key + ']' +  ' --' + options.task.env + ' other.env' +
		'\n> ' + options.task.view + ' --' + options.task.env + ' other.env' +
		'\n> ' + options.task.clear + ' --' + options.task.env + ' other.env' +
		'\n> ' + options.task.reset + ' --' + options.task.env + ' other.env';
		
	// (command_module) Create yargs command module
	var out = {};
	out.command = options.command + ' <' + options.task.command + '> [' + options.task.key + '] [' + options.task.value + '] [--' + options.task.env +  ']';
	out.describe = options.describe;
	out.handler = function(argv) {
		var task = argv[options.task.command];
		var file = argv[options.task.env] || options.file;
		var defaults =  options.defaults || {};
		
		// (env_read) Read env file or create if not exists
		if (!fs.existsSync(file)) {
			fs.writeFileSync(file, envfile.stringifySync(defaults));
		}
		var env = envfile.parseFileSync(file);
		
		// (env_reset) Reset env file to defaults
		if (task == options.task.reset) {
			env = defaults;
			fs.writeFileSync(file, envfile.stringifySync(env));
			console.log('Reset defaults');
		}
		
		// (env_clear) Clear env file
		if (task == options.task.clear) {
			env = {};
			fs.writeFileSync(file, envfile.stringifySync(env));
			console.log('Empty defaults');
		}
		
		// (env_view) View defaults
		if (task == options.task.view) {
			console.log(envfile.stringifySync(env, null, 2));
		}
		
		// (env_delete) Delete key from env file
		if (task == options.task.delete) {
			delete env[argv[options.task.key]];
			delete process.env[argv[options.task.key]];
			fs.writeFileSync(file, envfile.stringifySync(env));
			console.log('Delete default', argv[options.task.key]);
		}
		
		// (env_set) Set key to value for env file
		if (task == options.task.set) {
			env[argv[options.task.key]] = argv[options.task.value];
			fs.writeFileSync(file, envfile.stringifySync(env));
			console.log('Set default', argv[options.task.key], 'to', argv[options.task.value]);
		}
		
		// (argv_return) Update argv with env
		Object.assign(process.env, env);
		return argv;
	};
	return(out);
};
