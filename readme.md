Tasks generator for ESLint
==========================

[![build status](https://img.shields.io/travis/runner/generator-eslint.svg?style=flat-square)](https://travis-ci.org/runner/generator-eslint)
[![npm version](https://img.shields.io/npm/v/runner-generator-eslint.svg?style=flat-square)](https://www.npmjs.com/package/runner-generator-eslint)
[![dependencies status](https://img.shields.io/david/runner/generator-eslint.svg?style=flat-square)](https://david-dm.org/runner/generator-eslint)
[![devDependencies status](https://img.shields.io/david/dev/runner/generator-eslint.svg?style=flat-square)](https://david-dm.org/runner/generator-eslint?type=dev)
[![Gitter](https://img.shields.io/badge/gitter-join%20chat-blue.svg?style=flat-square)](https://gitter.im/DarkPark/runner)
[![RunKit](https://img.shields.io/badge/RunKit-try-yellow.svg?style=flat-square)](https://npm.runkit.com/runner-generator-eslint)


## Installation ##

```bash
npm install runner-generator-eslint
```


## Usage ##

Add to the scope:

```js
const generator = require('runner-generator-eslint');
```

Generate tasks according to the given config:

```js
const tasks = generator({
    watch: ['src/js/**/*.js']
});
```

Add generated tasks to the `runner` instance:

```js
const runner = require('runner');

Object.assign(runner.tasks, tasks);
```

The following tasks will become available:

 Task name        | Description
------------------|-------------
 `eslint:config`  | prints the current configuration used for generated tasks
 `eslint:watch`   | starts file changes monitoring, prints warnings on errors
 `eslint:unwatch` | stops monitoring

Generator accepts two arguments: base configuration and additional options.


### Base configuration ###

It's an object with the following properties:

 Name         | Description
--------------|-------------
 watch        | file, dir, glob, or array passed to `watch` in [chokidar](https://www.npmjs.com/package/chokidar#api)
 watchOptions | optional watcher [options](https://www.npmjs.com/package/chokidar#api)
 options      | optional config object passed to [ESLint CLIEngine](https://eslint.org/docs/developer-guide/nodejs-api#cliengine)


### Additional options ###

It's an object with the following properties:

 Name   | Description
--------|-------------
 prefix | an affix placed before a task name (default is `eslint:`)  
 suffix | a string added at the end of a task name (empty by default)
 
So it's possible to change generated tasks names: 

```js
Object.assign(runner.tasks,
    generator(config, {
        prefix: 'lint:',
        suffix: ':develop'
    })
);
```

It will add the following tasks:

* `lint:config:develop`  
* `lint:watch:develop`
* `lint:unwatch:develop` 
 

## Contribution ##

If you have any problems or suggestions please open an [issue](https://github.com/runner/generator-eslint/issues)
according to the contribution [rules](.github/contributing.md).


## License ##

`runner-generator-eslint` is released under the [GPL-3.0 License](http://opensource.org/licenses/GPL-3.0).
