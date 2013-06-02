define(['text', 'dust'], function(text, dust) {

    var buildCache = {};
    var buildCompileTemplate = 'define("{pluginName}!{moduleName}", ["dust"], function(dust){{fn|s}; return function(context, callback) { return dust.render("{moduleName}", context, callback)}});';

    var load = function(moduleName, parentRequire, load, config) {

        text.get(parentRequire.toUrl(moduleName), function(data) {

            if(config.isBuild) {
                buildCache[moduleName] = data;
                load();
            } else {
                dust.compileFn(data, moduleName);
                load(function(context, callback) {
                    return dust.render(moduleName, context, callback);
                });
            }
        });
    };

    var write = function(pluginName, moduleName, write) {

        dust.compileFn(buildCompileTemplate, '_buildCompileTemplate');

        if(moduleName in buildCache) {

            dust.render('_buildCompileTemplate', {
                pluginName: pluginName,
                moduleName: moduleName,
                fn: dust.compile(buildCache[moduleName], moduleName)
            }, function(error, output) {
                write(output);
            });
        }
    };

    return {
        load: load,
        write: write
    };

});