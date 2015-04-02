'use strict';

var React = require('react'),
    state = require('../controller.js').state;

module.exports = React.createClass({
  displayName: 'views/series',
  mixins: [ state.mixin ],
  cursor: [ 'state' ],

  // Handlers
  serieClick: function(e) {
    this.cursor.set(
      'currentSerie',
      e.currentTarget.attributes['data-id'].value
    );
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
                    className={
                      this.cursor.get('currentSerie') === serie.title ?
                        'serie currentSerie' :
                        'serie'
                    }
                    style={{
                      top: top + 'em'
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

                    <div
                      className={
                        this.cursor.get('currentSerie') === serie.title ?
                          'seasonsContent visible' :
                          'seasonsContent'
                      }>
                      <ul>{
                        serie.seasons.map(function(season, is) {
                          return (
                            <li
                              key={ is }>
                              <div>{ 'Season' + season.number }</div>
                            </li>
                          );
                        }, this)
                      }</ul>
                    </div>
                  </div>;

          top += (i % 2) * 8;

          return s;
        }, this)
      }</div>
    );
  }
});
