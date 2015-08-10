'use strict';

var React = require('react'),
    BaobabBranchMixin = require('baobab-react/mixins').branch,
    ContentView = {
      series: require('./series.jsx'),
      movies: require('./movies.jsx')
    };

module.exports = React.createClass({
  displayName: 'views/content',
  mixins: [ BaobabBranchMixin ],
  cursors: {
    currentView: [ 'state', 'currentView' ],
    sideBar: [ 'state', 'sideBar' ]
  },

  render: function() {
    var View = ContentView[this.state.currentView];

    return (
      <div  className={
              this.state.sideBar ?
                'content-view share' :
                'content-view full'
            }>
        <View />
      </div>
    );
  }
});
