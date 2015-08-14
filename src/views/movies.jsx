'use strict';

var React = require('react'),
    utils = require('../utils.js'),
    controller = require('../controller.js'),
    BaobabBranchMixin = require('baobab-react/mixins').branch;

module.exports = React.createClass({
  displayName: 'views/movies',
  mixins: [ BaobabBranchMixin ],
  cursors: {
    currentMovie: [ 'state', 'currentMovie' ],
    data: [ 'state', 'data' ],
    meta: [ 'state', 'meta' ]
  },

  getMovie: function(e) {
    var attr = e.currentTarget.parentNode.attributes;

    controller.downloadMovie(
      attr['data-movie'].value,
      e.currentTarget.attributes['data-action'].value === 'stream'
    );
  },

  render: function() {
    var movies = this.state.data,
        meta = this.state.meta;

    return (
      <div className="movies">{
        movies.map(function(movie, i) {
          var m = ( meta[movie.title] || {} ),
              current,
              streamable = (
                movie.videoCodec !== 'XviD' &&
                movie.audioCodec !== 'DTS'
              );

          return (
            <div  className="movie"
                  key={ i }>
              <div className="movie-content">
                <div className="movie-img">
                  <img src={ m.Poster || './assets/no-poster.png' } />
                </div>
                <div className="movie-meta">
                  <div className="movie-title">{
                    m.Title || utils.formatTitle(movie.title)
                  }</div>
                  <div className="movie-metascore">
                    <div>{
                      m.Metascore ?
                        'Metascore : ' + m.Metascore : ''
                    }</div>
                  </div>
                  <div  className="movie-rating"
                        title={
                          'IMDb Rating : ' + ( m.imdbRating || '-' )
                        }>
                    <div  className={
                            m.imdbRating ?
                              'rating-mask' :
                              'rating-hide'
                          }
                          style={{
                            width: (
                              m.imdbRating ?
                                ( 10 - m.imdbRating ) * 10 :
                                100
                            ) + '%'
                          }}></div>
                  </div>
                  <div className="movie-year">
                    <div>{
                      m.Year || ''
                    }</div>
                  </div>
                </div>


                <div  className="movie-file"
                      data-movie={ movie.title }>
                  <div className="picto">
                    <img  src={
                            './assets/' +
                            movie.extension + '.png'
                          } />
                  </div>
                  <div className="picto">
                    <div className="picto-txt">{
                      movie.videoCodec
                    }</div>
                  </div>
                  <div className="picto">
                    <div className="picto-txt">{
                      movie.audioCodec
                    }</div>
                  </div>
                  <div className="picto"></div>
                  <div className="picto">{
                    movie.definition === 'sd' ?
                      '' :
                      <img  src={
                              './assets/' +
                              movie.definition + '.png'
                            } />
                  }</div>
                  <div className="picto"></div>
                  <div  className="picto button"
                        data-action="download"
                        title="Download"
                        onClick={
                          this.getMovie
                        }>
                    <img src="./assets/download.png" />
                  </div>
                  <div  className="picto button"
                        data-action="stream"
                        title="Stream"
                        onClick={
                          streamable ?
                            this.getMovie :
                            undefined
                        }>{
                    !streamable ?
                      '' :
                      <img src="./assets/stream.png" />
                  }</div>
                </div>
              </div>
            </div>
          );
        }, this)
      }</div>
    );
  }
});
