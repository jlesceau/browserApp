'use strict';

var React = require('react'),
    state = require('../controller.js').state,
    data = require('../controller.js').data,
    SideBar = require('./sideBar.jsx'),
    ContentView = {
      Series: require('./series.jsx'),
      Movies: require('./movies.jsx')
    };

module.exports = React.createClass({
  displayName: 'layout',
  mixins: [ state.mixin ],
  cursor: [ 'state' ],

  // Handlers
  toggleSideBar: function() {
    this.cursor.set('sideBar', !this.cursor.get('sideBar'));
    state.commit();
  },

  render: function() {
    var View = ContentView[this.cursor.get('currentView')],
        dataView = data[this.cursor.get('currentView').toLowerCase()];

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
      	<div
          className={
            this.cursor.get('sideBar') ?
              'contentView share' :
              'contentView full'
          }>
          <View data={ dataView } />
        </div>
      </div>
    );
  }
});
