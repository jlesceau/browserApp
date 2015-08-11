'use strict';

var controller = {},
    djax = require('djax'),
    state = require('./state.js'),
    api = state.get('config', 'api') + '/';

controller.getSeries = function() {
  djax({
    type: 'GET',
    url: api + 'series'
  }).then(
    function(res) {
      state.select('state').set('data', res.result);
      state.select('state').set('meta', {});
      state.commit();
      res.result.forEach(function(serie) {
        djax({
          type: 'GET',
          url: 'http://www.omdbapi.com/?plot=short&r=json&t=' + serie.title
        }).then(
          function(res) {
            state.select('state', 'meta').set(serie.title, res);
          },
          function(xhr, status, err) {

          }
        );
      });
    },
    function(xhr, status, err) {

    }
  )
};

controller.getMovies = function() {
  djax({
    type: 'GET',
    url: api + 'movies'
  }).then(
    function(res) {
      state.select('state').set('data', res.result);
    },
    function(xhr, status, err) {

    }
  )
};

controller.loadData = function() {
  switch (state.get('state', 'currentView')) {
    case 'series':
      controller.getSeries();
      break;
    case 'movies':
      controller.getMovies();
      break;
  }
};

module.exports = controller;
