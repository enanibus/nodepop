'use strict';


let tags = { tags: ['work', 'lifestyle', 'motor', 'mobile'] };

let listTags = function(callback) {
    callback(null, tags);
};

module.exports = listTags;