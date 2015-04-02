'use strict';

var Baobab = require('baobab');

module.exports = new Baobab({
  state: {
    sideBar: false,
    currentView: 'series',
    currentSerie: null,
    currentSeason: null
  }
});
