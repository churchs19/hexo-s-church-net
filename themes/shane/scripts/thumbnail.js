/**
 * Resolve a smaller "-thumb.jpg" version of an image when one exists in the
 * source folder, falling back to the original URL.
 *
 * Usage:
 *   <%- thumbnail_url(post.featured_image) %>
 */

var fs = require('fs');
var path = require('path');

hexo.extend.helper.register('thumbnail_url', function(url) {
  if (!url) return url;

  var pathname = url;
  if (/^https?:\/\//.test(pathname)) {
    pathname = new URL(pathname).pathname;
  }
  pathname = decodeURI(pathname);

  var ext = path.extname(pathname);
  var thumbPath = pathname.slice(0, pathname.length - ext.length) + '-thumb.jpg';

  if (fs.existsSync(path.join(hexo.source_dir, thumbPath))) {
    return this.url_for(thumbPath);
  }
  return url;
});
