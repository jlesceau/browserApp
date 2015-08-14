'use strict';

var React = require('react'),
    controller = require('../controller.js'),
    BaobabBranchMixin = require('baobab-react/mixins').branch;

function formatSpace(n) {
  var display;

  if (n > 1e12)
    display = Math.round(n / 1e12) + ' To';
  else if (n > 1e9)
    display = Math.round(n / 1e9) + ' Go';
  else if (n > 1e6)
    display = Math.round(n / 1e6) + ' Mo';
  else if (n > 1e3)
    display = Math.round(n / 1e3) + ' Ko';
  else
    display = n + ' o'

  return display;
}

module.exports = React.createClass({
  displayName: 'views/sideBar',
  mixins: [ BaobabBranchMixin ],
  cursors: {
    sideBar: [ 'state', 'sideBar' ],
    currentView: [ 'state', 'currentView' ],
    disk: [ 'state', 'disk' ]
  },

  // Handlers
  buttonClick: function(e) {
    this.cursors.currentView.set(e.currentTarget.attributes["data-id"].value);
    controller.clearState();
    controller.loadData();
  },

  render: function() {
    var total = formatSpace(this.state.disk.total),
        used = formatSpace(this.state.disk.total - this.state.disk.free);

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
        <div className="diskspace">
          <div className="diskspace-status">{
            used + ' / ' + total
          }</div>
          <div className="diskspace-viz">
            <div className="disk-background"></div>
            <div  className="disk-bar"
                  style={{
                    width: ( this.state.disk.total - this.state.disk.free ) /
                      this.state.disk.total * 100 + '%'
                  }}></div>
          </div>
        </div>
      </div>
    );
  }
});
