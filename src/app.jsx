'use strict';

var React = require('react'),
    controller = require('./controller.js'),
    Layout = require('./views/layout.jsx');

React.render(<Layout />, document.getElementById('container'));

module.exports = {
  controller: controller
};
