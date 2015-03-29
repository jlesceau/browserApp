'use strict';

var React = require('react'),
    data = require('./data.js'),
    Layout = require('./views/layout.jsx');

React.render(<Layout />, document.getElementById('container'));

module.exports = {
  data: data
};
