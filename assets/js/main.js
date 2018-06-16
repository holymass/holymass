/*
 * Copyright (c) 2018 iannar.com. All rights reserved.
 */

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
  var sourceUrl = 'mass/index.md';
  if (metadata.s) {
    sourceUrl = 'mass/' + metadata.s.replace(/\./g, '/') + '.md';
  }
  var ratio = metadata.r || '4:3';
  var slideshow = remark.create({
    ratio: ratio,
    sourceUrl: sourceUrl,
    navigation: {
      click: true
    }
  });
})();
