const plugins = [];

plugins.push(require('autoprefixer'));

if (process.env.NODE_ENV === 'production') {
  plugins.push(require('@fullhuman/postcss-purgecss')({
    content: [
      './resources/html-scrape/*.html',
      './resources/js/**/*.js',
      './src/**/*.liquid',
    ],
  }));

  plugins.push(require('cssnano'));

  plugins.push(require('postcss-discard-comments')({
    removeAll: false,
  }));
}

module.exports = {
  plugins,
};
