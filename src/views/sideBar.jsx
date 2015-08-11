'use strict';

var React = require('react'),
    controller = require('../controller.js'),
    BaobabBranchMixin = require('baobab-react/mixins').branch;

module.exports = React.createClass({
  displayName: 'views/sideBar',
  mixins: [ BaobabBranchMixin ],
  cursors: {
    sideBar: [ 'state', 'sideBar' ],
    currentView: [ 'state', 'currentView' ]
  },

  // Handlers
  buttonClick: function(e) {
    this.cursors.currentView.set(e.currentTarget.attributes["data-id"].value);
    controller.loadData();
  },

  render: function() {
    return (
      <div  className={
              this.state.sideBar ?
                'sideBar on' :
                'sideBar off'
            }>
        <div  className="sideBar-button button"
              onClick={
                this.buttonClick
              }
              data-id="series">Series</div>
        <div  className="sideBar-button button"
              onClick={
                this.buttonClick
              }
              data-id="movies">Movies</div>
      </div>
    );
  }
});
