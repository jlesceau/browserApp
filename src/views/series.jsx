'use strict';

var React = require('react'),
    utils = require('../utils.js'),
    controller = require('../controller.js'),
    BaobabBranchMixin = require('baobab-react/mixins').branch;

module.exports = React.createClass({
  displayName: 'views/series',
  mixins: [ BaobabBranchMixin ],
  cursors: {
    currentSerie: [ 'state', 'currentSerie' ],
    currentSeason: [ 'state', 'currentSeason' ],
    data: [ 'state', 'data' ],
    meta: [ 'state', 'meta' ]
  },

  // Handlers
  seasonClick: function(e) {
    var attr = e.currentTarget.attributes;

    if (
      this.state.currentSerie === attr['data-serie'].value &&
      this.state.currentSeason === parseInt(attr['data-season'].value)
    ) {
      this.cursors.currentSerie.set(null);
      this.cursors.currentSeason.set(null);
    }
    else {
      this.cursors.currentSerie.set(attr['data-serie'].value);
      this.cursors.currentSeason.set(parseInt(attr['data-season'].value));
    }
  },
  getEpisode: function(e) {
    var attr = e.currentTarget.parentNode.attributes;

    controller.downloadEpisode(
      [
        attr['data-serie'].value,
        attr['data-season'].value,
        attr['data-episode'].value,
        attr['data-file'].value
      ].join('/'),
      e.currentTarget.attributes['data-action'].value === 'stream'
    );
  },

  render: function() {
    var series = this.state.data,
        meta = this.state.meta;

    return (
      <div className="series">{
        series.map(function(serie, i) {
          var m = ( meta[serie.title] || {} ),
              current;

          return (
            <div  className="serie"
                  key={ i }>
              <div className="serie-content">
                <div className="serie-img">
                  <img src={ m.Poster } />
                </div>
                <div className="serie-meta">
                  <div className="serie-title">{
                    m.Title || utils.formatTitle(serie.title)
                  }</div>
                  <div className="serie-year">{
                    m.Year || '-'
                  }</div>
                </div>
                <div className="serie-seasons">{
                  serie.seasons.map(function(season, j) {
                    current = this.state.currentSerie === serie.title &&
                              this.state.currentSeason === season.number;
                    return (
                      <div  className="serie-season"
                            key={ j }
                            style={{
                              width: current ?
                                '100%' : undefined
                            }}
                            data-serie={ serie.title }
                            data-season={ season.number }
                            onClick={ this.seasonClick }>
                        <div  className={
                                'season-title button' + (
                                  current ?
                                    ' underlined' : ''
                                )
                              }>{
                          'Season ' + season.number
                        }</div>
                        <div className="season-episodes">{
                          !current ?
                            '' :
                            season.episodes.sort(function(a, b) {
                              return a.number - b.number;
                            }).map(function(episode, k) {
                              return (
                                <div  className="episode"
                                      key={ k }>
                                  <div className="episode-title">{
                                    'S' +
                                    utils.formatSeriesNumber(season.number) +
                                    'E' +
                                    utils.formatSeriesNumber(episode.number)
                                  }</div>
                                  {
                                    episode.files.map(function(file, l) {
                                      var streamable = (
                                        file.audioCodec !== 'DTS' &&
                                        file.videoCodec !== 'XviD'
                                      );

                                      return (
                                        <div  className="episode-file"
                                              key={ l }
                                              data-serie={ serie.title }
                                              data-season={ season.number }
                                              data-episode={ episode.number }
                                              data-file={ l }>
                                          <div className="picto">
                                            <img  src={
                                                    './assets/' +
                                                    file.extension + '.png'
                                                  } />
                                          </div>
                                          <div className="picto">
                                            <div className="picto-txt">{
                                              file.videoCodec
                                            }</div>
                                          </div>
                                          <div className="picto">
                                            <div className="picto-txt">{
                                              file.audioCodec
                                            }</div>
                                          </div>
                                          <div className="picto"></div>
                                          <div className="picto">{
                                            file.definition === 'sd' ?
                                              '' :
                                              <img  src={
                                                      './assets/' +
                                                      file.definition + '.png'
                                                    } />
                                          }</div>
                                          <div className="picto"></div>
                                          <div  className="picto button"
                                                data-action="download"
                                                title="Download"
                                                onClick={
                                                  this.getEpisode
                                                }>
                                            <img src="./assets/download.png" />
                                          </div>
                                          <div  className="picto button"
                                                data-action="stream"
                                                title="Stream"
                                                onClick={
                                                  streamable ?
                                                    this.getEpisode :
                                                    undefined
                                                }>{
                                            !streamable ?
                                              '' :
                                              <img src="./assets/stream.png" />
                                          }</div>
                                        </div>
                                      );
                                    }, this)
                                  }
                                </div>
                              )
                            }, this)
                        }</div>
                      </div>
                    );
                  }, this)
                }</div>
              </div>
            </div>
          );
        }, this)
      }</div>
    );
  }
});
