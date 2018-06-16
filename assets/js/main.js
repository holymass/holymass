'use strict';

(function() {
  var metadata = {};
  if (location.search) {
    var search = location.search.substr(1, location.search.length);
    search.split('&').forEach(function(item) {
      var pair = item.split('=');
      metadata[pair[0]] = pair[1];
    });
  }
  var sourceUrl = 'mass/template.md';
  if (metadata.s) {
    sourceUrl = 'mass/' + metadata.s.replace(/\./g, '/') + '.md';
  }
  var slideshow = remark.create({
    ratio: '4:3',
    sourceUrl: sourceUrl,
    navigation: {
      click: true
    }
  });
})();
