'use strict';

var React = require('react'),
    Header = require('./header.jsx'),
    SideBar = require('./sideBar.jsx'),
    Content = require('./content.jsx'),
    BaobabRootMixin = require('baobab-react/mixins').root;

module.exports = React.createClass({
  displayName: 'layout',
  mixins: [ BaobabRootMixin ],

  render: function() {
    return (
      <div className="layout">
        <Header />
        <SideBar />
        <Content />
      </div>
    );
  }
});
