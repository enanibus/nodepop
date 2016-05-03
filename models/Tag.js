'use strict';

let tags = [ 'work', 'lifestyle', 'motor', 'mobile' ];

let listTags = function(callback) {
    callback(null, tags);
};

module.exports = listTags;