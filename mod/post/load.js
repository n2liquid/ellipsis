'use strict';

let fs = require('fs');

let readTextFileSync = require('read-text-file-sync');

let fm = require('front-matter');

let makeSlug = $require('mod/makeSlug');

module.exports = function(id) {
    let path = pathFromRoot('post/byId', id + '.md');

    if(!fs.existsSync(path)) {
        return null;
    }

    let parsed = fm(readTextFileSync(path));

    let post = parsed.attributes;

    post.id = id;

    post.slug = makeSlug(post.title);

    post.url = '/post/' + id + '/' + post.slug;

    post.body = parsed.body;

    return post;
};
