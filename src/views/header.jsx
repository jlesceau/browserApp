'use strict';

var React = require('react'),
    utils = require('../utils.js'),
    BaobabBranchMixin = require('baobab-react/mixins').branch;

module.exports = React.createClass({
  displayName: 'views/header',
  mixins: [ BaobabBranchMixin ],
  cursors: {
    currentView: [ 'state', 'currentView' ],
    sideBar: [ 'state', 'sideBar' ]
  },

  // Handlers
  toggleSideBar: function() {
    this.cursors.sideBar.set(!this.state.sideBar);
  },

  render: function() {
    return (
      <div className="header">
        <div  className="toggleButton"
              onClick={ this.toggleSideBar }>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <span className="title">
          <span className="titleView">{
            utils.formatTitle(this.state.currentView)
          }</span>
        </span>
      </div>
    );
  }
});
