require.config({

    deps: ['main'],

    wrapShim: true,

    paths: {
        tmpl: '../templates',
        tuna: './vendor/tuna',
        jquery: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.4/jquery.min',
        'backbone.marionette': './vendor/backbone.marionette',
        'backbone.wreqr': './vendor/backbone.wreqr',
        backbone: 'https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.3.3/backbone-min',
        hbs: './vendor/hbs',
        requireLib: './vendor/require',
        underscore: 'https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.9.1/underscore-min',
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
