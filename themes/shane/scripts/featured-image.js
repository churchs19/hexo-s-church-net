/**
 * Resolve a post's `featured_image` front matter to a full URL.
 *
 * Relative names are looked up in `image_dir` (for example
 * `featured_image: 2016/photo.jpg` becomes
 * `https://www.s-church.net/journal_images/2016/photo.jpg`). Absolute URLs and
 * root-relative paths are left alone. Replaces the unmaintained
 * hexo-featured-image plugin.
 */

hexo.extend.filter.register('before_post_render', function(data) {
  var image = data.featured_image;
  if (!image || typeof image !== 'string') return data;

  if (image.indexOf('http') !== 0 && image.indexOf('/') !== 0) {
    var config = hexo.config;
    image = config.url + config.root + (config.image_dir || 'images') + '/' + image;
  }

  data.featured_image = image;
  return data;
});
