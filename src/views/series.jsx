'use strict';

var React = require('react'),
    BaobabBranchMixin = require('baobab-react/mixins').branch;

module.exports = React.createClass({
  displayName: 'views/series',
  mixins: [ BaobabBranchMixin ],
  cursors: {
    currentSerie: [ 'state', 'currentSerie' ],
    data: [ 'state', 'data' ],
    meta: [ 'state', 'meta' ]
  },

  render: function() {
    var series = this.state.data,
        meta = this.state.meta;

    return (
      <div className="series">{
        series.map(function(serie) {
          var m = ( meta[serie.title] || {} );

          return (
            <div className="serie">
              <div className="serie-content">
                <div className="serie-img">
                  <img src={ m.Poster } />
                </div>
                <div className="serie-meta">
                  <div className="serie-title">{
                    serie.title
                  }</div>
                  <div className="serie-year">{
                    m.Year || '-'
                  }</div>
                </div>
                <div className="serie-seasons">{
                  serie.seasons.map(function(season) {
                    return (
                      <div className="serie-season">{
                        'Season ' + season.number
                      }</div>
                    );
                  })
                }</div>
              </div>
            </div>
          );
        }, this)
      }</div>
    );
  }
});
