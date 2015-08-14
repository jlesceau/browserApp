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
          url: 'http://www.omdbapi.com/?plot=short&r=json&type=series&t=' +
            serie.title
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
      state.select('state').set('meta', {});
      state.commit();
      res.result.forEach(function(movie) {
        djax({
          type: 'GET',
          url: 'http://www.omdbapi.com/?plot=short&r=json&type=movie&t=' +
            movie.title + '&y=' + movie.year
        }).then(
          function(res) {
            state.select('state', 'meta').set(movie.title, res);
          },
          function(xhr, status, err) {

          }
        );
      });
    },
    function(xhr, status, err) {

    }
  );
};

controller.getDisk = function() {
  djax({
    type: 'GET',
    url: api + 'disk'
  }).then(
    function(res) {
      state.select('state').set('disk', res.result);
    },
    function(xhr, status, err) {
      state.select('state').set('disk', {
        total: 1,
        free: 1
      });
    }
  );
};

controller.downloadEpisode = function(path, stream) {
  var a = document.createElement('a');
  a.target = '_blank';
  a.href = api + 'series/' + path + ( stream ? '/stream' : '' );
  a.click();
};

controller.downloadMovie = function(path, stream) {
  var a = document.createElement('a');
  a.target = '_blank';
  a.href = api + 'movies/' + path + ( stream ? '/stream' : '/dl' );
  a.click();
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

controller.clearState = function() {
  state.select('state')
    .set('currentSerie', null)
    .set('currentSeason', null)
    .set('currentMovie', null)
    .set('data', [])
    .set('meta', {});
  state.commit();
};

module.exports = controller;
