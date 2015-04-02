'use strict';

var React = require('react'),
    state = require('../controller.js').state,
    data = require('../controller.js').data,
    SideBar = require('./sideBar.jsx'),
    ContentView = {
      series: require('./series.jsx'),
      movies: require('./movies.jsx')
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
  titleViewClick: function(e) {
    this.cursor.set('currentSerie', null);
    this.cursor.set('currentSeason', null);
    state.commit();
  },
  titleSerieClick: function() {
    this.cursor.set('currentSeason', null);
    state.commit();
  },

  render: function() {
    var View = ContentView[this.cursor.get('currentView')],
        dataView = data[this.cursor.get('currentView')];

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
          <span className="title">
            <span
              className="titleView"
              onClick={ this.titleViewClick }>{
              this.cursor.get('currentView')
            }</span>
            {
              (this.cursor.get('currentView') === 'series' &&
                  this.cursor.get('currentSerie') !== null) ?
                <span
                  className="titleSerie"
                  onClick={ this.titleSerieClick }>{
                  ' > ' + this.cursor.get('currentSerie')
                }</span> :
                ''
            }
            {
              (this.cursor.get('currentView') === 'series' &&
                  this.cursor.get('currentSerie') !== null &&
                  this.cursor.get('currentSeason') !== null) ?
                <span className="titleSeason">{
                  ' > Season ' + this.cursor.get('currentSeason')
                }</span> :
                ''
            }
          </span>
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
