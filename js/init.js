require.config({

    deps: ['main'],

    wrapShim: true,

    paths: {
        tmpl: '../templates',
        tuna: './vendor/tuna',
        jquery: './vendor/jquery',
        'backbone.marionette': './vendor/backbone.marionette',
        'backbone.wreqr': './vendor/backbone.wreqr',
        backbone: './vendor/backbone',
        hbs: './vendor/hbs',
        requireLib: './vendor/require',
        underscore: './vendor/underscore',
        'backbone.modal': './vendor/backbone.modal'
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
