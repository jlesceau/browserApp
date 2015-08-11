'use strict';

var Baobab = require('baobab'),
    config = require('../conf/default.json');

module.exports = new Baobab({
  state: {
    sideBar: false,
    disk: {
      total: 1,
      free: 1
    },
    data: [],
    meta: {},
    currentView: 'series',
    currentSerie: null,
    currentSeason: null,
    currentMovie: null
  },
  config: config
});
