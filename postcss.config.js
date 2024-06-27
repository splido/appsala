// postcss.config.js
module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    require('postcss-modules')({
      generateScopedName: '[name]__[local]___[hash:base64:5]',
    }),
  ],
}
