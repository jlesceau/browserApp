'use strict';

var React = require('react'),
    BaobabBranchMixin = require('baobab-react/mixins').branch;

module.exports = React.createClass({
  displayName: 'views/movies',
  mixins: [ BaobabBranchMixin ],
  cursors: {
    currentSerie: [ 'state', 'currentSerie' ],
    data: [ 'state', 'data' ]
  },

  render: function() {
    var movies = this.state.data;

    return (
      <div className="moviesContent">Movies</div>
    );
  }
});
