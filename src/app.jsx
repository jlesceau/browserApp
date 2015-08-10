'use strict';

var React = require('react'),
    state = require('./state.js'),
    Layout = require('./views/layout.jsx'),
    controller = require('./controller.js'),
    config = require('../conf/default.json');

    React.render(
  <Layout tree={ state } />,
  document.getElementById('container')
);

state.config = config;

module.exports = {
  state: state,
  controller: controller
};
