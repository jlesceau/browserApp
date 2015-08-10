'use strict';

var Baobab = require('baobab');

module.exports = new Baobab({
  state: {
    sideBar: false,
    data: [],
    currentView: 'series',
    currentSerie: null,
    currentSeason: null,
    currentMovie: null
  },
  config: {}
});
