'use strict';

var React = require('react'),
    state = require('./state.js'),
    utils = require('./utils.js'),
    Layout = require('./views/layout.jsx'),
    controller = require('./controller.js');

controller.loadData();
controller.getDisk();

React.render(
  <Layout tree={ state } />,
  document.getElementById('container')
);

module.exports = {
  state: state,
  utils: utils,
  controller: controller
};
