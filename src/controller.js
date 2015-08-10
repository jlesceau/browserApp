'use strict';

var controller = {},
    djax = require('djax'),
    state = require('./state.js'),
    api = state.get('config', 'api') + '/';


module.exports = controller;
