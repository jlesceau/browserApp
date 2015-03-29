'use strict';

var React = require('react'),
    data = require('../data.js'),
    SideBar = require('./sideBar.jsx'),
    ContentView = {
      Series: require('./series.jsx'),
      Movies: require('./movies.jsx')
    };

module.exports = React.createClass({
  displayName: 'layout',
  mixins: [ data.mixin ],
  cursor: [ 'state' ],
  
  // Handlers
  toggleSideBar: function() {
    this.cursor.set('sideBar', !this.cursor.get('sideBar'));
    data.commit();
  },

  render: function() {
    var View = ContentView[this.cursor.get('currentView')];

    return (
      <div className="layout">
        <div className="header">
          <div
            className="toggleButton"
            onClick={ this.toggleSideBar }>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <span className="title">{
            this.cursor.get('currentView')
          }</span>
        </div>
        <div
          className={
            this.cursor.get('sideBar') ?
              'sideBar on' :
              'sideBar off'
          }>
          <SideBar />
        </div>
      	<div className="contentView">
          <View />
        </div>
      </div>
    );
  }
});
