'use strict';

var React = require('react'),
    state = require('../controller.js').state;

module.exports = React.createClass({
  displayName: 'views/series',
  mixins: [ state.mixin ],
  cursor: [ 'state' ],

  // Handlers
  serieClick: function(e) {
  },

  render: function() {
    var series = this.props.data || [],
        top = 5;

    return (
      <div className="seriesContent">{
        series.map(function(serie, i) {
          var s = <div
                    key={ i }
                    data-id={ serie.title }
                    className="serie"
                    style={{
                      top: top + 'em',
                      left: (15 + (i % 2) * 40) + '%'
                    }}
                    onClick={ this.serieClick }>
                    <div className="title">{ serie.title }</div>
                    <div className="nbEpisodes">{
                      serie.seasons.reduce(function(globalSum, season) {
                        return (
                          globalSum +
                          season.episodes.reduce(function(sum, epi) {
                            return sum + 1;
                          }, 0)
                        );
                      }, 0) + ' episodes'
                    }</div>
                  </div>;

          top += (i % 2) * 8;

          return s;
        }, this)
      }</div>
    );
  }
});
