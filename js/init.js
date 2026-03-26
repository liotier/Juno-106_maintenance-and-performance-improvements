require.config({

    deps: ['main'],

    wrapShim: true,

    paths: {
        tmpl: '../templates',
        tuna: './vendor/tuna',
        jquery: './vendor/jquery',
        'backbone.marionette': './vendor/backbone.marionette',
        'backbone.wreqr': './vendor/backbone.wreqr',
        // backbone.js 1.6.1 in vendor is incompatible with Backbone.Marionette 2.4.1
        // (silent white page — no error). Marionette 2.x requires Backbone ~1.3.x.
        // Upgrading Marionette would need significant app code changes.
        backbone: 'https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.3.3/backbone-min',
        hbs: './vendor/hbs',
        requireLib: './vendor/require',
        underscore: './vendor/underscore',
        'backbone.modal': './vendor/backbone.modal',
        'handlebars-v4.7.8': './vendor/handlebars-v4.7.8'
    },

    shim: {
        'backbone.modal': {
            deps: ['backbone', 'backbone.marionette'],
            exports: 'backbone.modal'
        },

        'tuna': {
            deps: [],
            'exports': 'Tuna'
        }
    }
});

requirejs.onError = function(err) {
    document.body.style.background = 'white';
    document.body.style.color = 'black';
    document.body.style.fontFamily = 'monospace';
    document.body.style.padding = '20px';
    document.body.innerHTML =
        '<h2>RequireJS Error: ' + err.requireType + '</h2>' +
        '<p>Failed modules: ' + (err.requireModules || []).join(', ') + '</p>' +
        '<pre>' + err.stack + '</pre>';
};

window.onerror = function(msg, src, line, col, err) {
    document.body.style.background = 'white';
    document.body.style.color = 'black';
    document.body.style.fontFamily = 'monospace';
    document.body.style.padding = '20px';
    document.body.innerHTML =
        '<h2>JavaScript Error</h2>' +
        '<p>' + msg + '</p>' +
        '<p>at ' + src + ':' + line + ':' + col + '</p>' +
        '<pre>' + (err && err.stack ? err.stack : '') + '</pre>';
    return false;
};
