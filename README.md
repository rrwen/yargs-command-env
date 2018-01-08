# yargs-command-env

Richard Wen  
rrwen.dev@gmail.com  

* [Documentation](https://rrwen.github.io/yargs-command-env)

Yargs command for managing environment files

[![npm version](https://badge.fury.io/js/yargs-command-env.svg)](https://badge.fury.io/js/yargs-command-env)
[![Build Status](https://travis-ci.org/rrwen/yargs-command-env.svg?branch=master)](https://travis-ci.org/rrwen/yargs-command-env)
[![Coverage Status](https://coveralls.io/repos/github/rrwen/yargs-command-env/badge.svg?branch=master)](https://coveralls.io/github/rrwen/yargs-command-env?branch=master)
[![npm](https://img.shields.io/npm/dt/yargs-command-env.svg)](https://www.npmjs.com/package/yargs-command-env)
[![GitHub license](https://img.shields.io/github/license/rrwen/yargs-command-env.svg)](https://github.com/rrwen/yargs-command-env/blob/master/LICENSE)
[![Donate](https://img.shields.io/badge/donate-Donarbox-yellow.svg)](https://donorbox.org/rrwen)
[![Twitter](https://img.shields.io/twitter/url/https/github.com/rrwen/yargs-command-env.svg?style=social)](https://twitter.com/intent/tweet?text=Yargs%20command%20for%20managing%20environment%20files:%20https%3A%2F%2Fgithub.com%2Frrwen%2Fyargs-command-env%20%23nodejs%20%23npm)

## Install

1. Install [Node.js](https://nodejs.org/en/)
2. Install [yargs-command-env](https://www.npmjs.com/package/yargs-command-env) via `npm`

```
npm install --save yargs-command-env
```

For the latest developer version, see [Developer Install](#developer-install).

## Usage

An example usage of yargs-command-env:

```javascript
var yargscommandenv = require('yargs-command-env');
```

See [Documentation](https://rrwen.github.io/yargs-command-env) for more details.

## Contributions

### Report Contributions

Reports for issues and suggestions can be made using the [issue submission](https://github.com/rrwen/yargs-command-env/issues) interface.

When possible, ensure that your submission is:

* **Descriptive**: has informative title, explanations, and screenshots
* **Specific**: has details of environment (such as operating system and hardware) and software used
* **Reproducible**: has steps, code, and examples to reproduce the issue

### Code Contributions

Code contributions are submitted via [pull requests](https://help.github.com/articles/about-pull-requests/):

1. Ensure that you pass the [Tests](#tests)
2. Create a new [pull request](https://github.com/rrwen/yargs-command-env/pulls)
3. Provide an explanation of the changes

A template of the code contribution explanation is provided below:

```
## Purpose

The purpose can mention goals that include fixes to bugs, addition of features, and other improvements, etc.

## Description

The description is a short summary of the changes made such as improved speeds or features, and implementation details.

## Changes

The changes are a list of general edits made to the files and their respective components.
* `file_path1`:
	* `function_module_etc`: changed loop to map
	* `function_module_etc`: changed variable value
* `file_path2`:
	* `function_module_etc`: changed loop to map
	* `function_module_etc`: changed variable value

## Notes

The notes provide any additional text that do not fit into the above sections.
```

For more information, see [Developer Install](#developer-install) and [Implementation](#implementation).

## Developer Notes

### Developer Install

Install the latest developer version with `npm` from github:

```
npm install git+https://github.com/rrwen/yargs-command-env
```
  
Install from `git` cloned source:

1. Ensure [git](https://git-scm.com/) is installed
2. Clone into current path
3. Install via `npm`

```
git clone https://github.com/rrwen/yargs-command-env
cd yargs-command-env
npm install
```

### Tests

1. Clone into current path `git clone https://github.com/rrwen/yargs-command-env`
2. Enter into folder `cd yargs-command-env`
3. Ensure [devDependencies](https://docs.npmjs.com/files/package.json#devdependencies) are installed and available
4. Run tests
5. Results are saved to [tests/log](tests/log) with each file corresponding to a version tested

```
npm install
npm test
```

### Documentation

Use [documentationjs](https://www.npmjs.com/package/documentation) to generate html documentation in the `docs` folder:

```
npm run docs
```

See [JSDoc style](http://usejsdoc.org/) for formatting syntax.

### Upload to Github

1. Ensure [git](https://git-scm.com/) is installed
2. Inside the `yargs-command-env` folder, add all files and commit changes
3. Push to github

```
git add .
git commit -a -m "Generic update"
git push
```

### Upload to npm

1. Update the version in `package.json`
2. Run tests and check for OK status
3. Generate documentation
4. Login to npm
5. Publish to npm

```
npm test
npm run docs
npm login
npm publish
```

### Implementation

The module [yargs-command-env](https://www.npmjs.com/package/yargs-command-env) uses the following npm packages for its implementation:

npm | Purpose
--- | ---
[yargs](https://www.npmjs.com/package/yargs)| Manage command line arguments and options
[envfile](https://www.npmjs.com/package/envfile) | Parse and stringify [.env](https://www.npmjs.com/package/dotenv) files and objects 
[fs](https://nodejs.org/api/fs.html) | Read and write [.env](https://www.npmjs.com/package/dotenv) files

```
  yargs   <-- CLI arguments
    |
 envfile  <-- Parse and stringify .env files
    |
   fs     <-- Read and write .env files
```
