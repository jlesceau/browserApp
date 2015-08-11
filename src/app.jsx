'use strict';

var React = require('react'),
    state = require('./state.js'),
    Layout = require('./views/layout.jsx'),
    controller = require('./controller.js');

controller.loadData();

React.render(
  <Layout tree={ state } />,
  document.getElementById('container')
);

module.exports = {
  state: state,
  controller: controller
};
