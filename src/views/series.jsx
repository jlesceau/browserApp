'use strict';

var React = require('react'),
    BaobabBranchMixin = require('baobab-react/mixins').branch;

module.exports = React.createClass({
  displayName: 'views/series',
  mixins: [ BaobabBranchMixin ],
  cursors: {
    currentSerie: [ 'state', 'currentSerie' ],
    data: [ 'state', 'data' ]
  },

  render: function() {
    var series = this.state.data;

    return (
      <div className="seriesContent">Series</div>
    );
  }
});
