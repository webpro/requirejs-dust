# requirejs-dust

Simple Dust plugin for RequireJS.

* Requires the official `text!` plugin.
* Like the offical `text!` plugin, include the file extension in the module id.
* Make sure to include `dust-core.js` from Dust in your build instead of `dust-full.js`.

## Example usage

    define(['dst!myTemplate.tpl'], function(myTemplate) {

        myTemplate({name:'John Doe'}, function(error, html){
            //
        });
    });

## Example config

    require.config({
        paths: {
            'text': 'lib/requirejs-text/text',
            'dust': 'lib/dustjs-linkedin-amd/dust-full',
            'dst': 'lib/requirejs-dust/dst'
        }
    });
