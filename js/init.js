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
