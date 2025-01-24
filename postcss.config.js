module.exports = {
  plugins: [
    require('postcss-import')(),
    require('tailwindcss/nesting'),
    require('postcss-nesting'),
    require('postcss-custom-properties')(),
    require('postcss-apply'),
    require('postcss-simple-vars')({ silent: true }),
    require('postcss-mixins'),
    require('postcss-custom-media')(),
    require('autoprefixer'),
    require('tailwindcss'),
    require('cssnano')({ preset: 'default' })
  ]
}
