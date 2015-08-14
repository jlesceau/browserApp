var utils = {};

utils.formatDiskSpace = function(n) {
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
};

utils.formatSeriesNumber = function(num) {
  return ('' + num).length === 1 ? '0' + num : num;
};

utils.formatTitle = function(title) {
  return title
    .split(' ')
    .map(function(w) {
      return w.charAt(0).toUpperCase() + w.substr(1);
    })
    .join(' ');
};

module.exports = utils;
