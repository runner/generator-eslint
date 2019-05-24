/**
 * @author Stanislav Kalashnik <darkpark.main@gmail.com>
 * @license GNU GENERAL PUBLIC LICENSE Version 3
 */

'use strict';

const
    name = 'eslint',
    log  = require('runner-logger').wrap(name);


function watch ( config, done ) {
    const
        path      = require('path'),
        chokidar  = require('chokidar'),
        CLIEngine = require('eslint').CLIEngine,
        failCount = {};

    let engine, watcher;

    function handler ( fileName ) {
        const report = engine.executeOnFiles([fileName]);

        report.results.forEach(function ( result ) {
            result.messages.forEach(function ( message ) {
                log.fail(
                    '%s %s [%s:%s] %s',
                    log.colors.bold(path.relative('.', result.filePath)),
                    message.message,
                    message.line,
                    message.column,
                    log.colors.grey(message.ruleId)
                );
            });

            // no more errors?
            if ( result.messages.length === 0 && failCount[result.filePath] > 0 ) {
                log.info('%s fixed', log.colors.bold(path.relative('.', result.filePath)));
            }

            // remember each check errors amount
            failCount[result.filePath] = result.messages.length;
        });
    }

    engine = new CLIEngine(config.options);

    watcher = chokidar.watch(config.watch, config.watchOptions);
    watcher
        .on('change', handler)
        .on('unlink', handler)
        .on('add',    handler);

    return {
        engine: engine,
        watcher: watcher,
        done: done
    };
}


function unwatch ( instance ) {
    if ( instance ) {
        instance.watcher.close();
        instance.done();
    }
}


function generator ( config = {}, options = {} ) {
    const
        tasks = {},
        {prefix = name + ':', suffix = ''} = options;

    let instance;

    // sanitize and extend defaults
    config = Object.assign({
        watchOptions: {
            ignoreInitial: true,
            awaitWriteFinish: {
                stabilityThreshold: 50
            }
        }
    }, config);

    tasks[prefix + 'config' + suffix] = function () {
        log.inspect(config, log);
    };

    tasks[prefix + 'watch' + suffix] = function ( done ) {
        instance = watch(config, done);
    };

    tasks[prefix + 'unwatch' + suffix] = function () {
        unwatch(instance);
        instance = null;
    };

    return tasks;
}


// export main actions
generator.methods = {
    watch: watch,
    unwatch: unwatch
};


// public
module.exports = generator;
