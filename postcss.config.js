/* eslint-disable */
// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  plugins: {
    // https://github.com/postcss/postcss-import
    'postcss-import': {},

    // https://github.com/mantoni/postcss-nesting
    'tailwindcss/nesting': {},

    // https://github.com/tailwindlabs/tailwindcss
    tailwindcss: {},

    // https://github.com/postcss/autoprefixer
    autoprefixer: {
      overrideBrowserslist: [
        'last 4 Chrome versions',
        'last 4 Firefox versions',
        'last 4 Edge versions',
        'last 4 Safari versions',
        'last 4 Android versions',
        'last 4 ChromeAndroid versions',
        'last 4 FirefoxAndroid versions',
        'last 4 iOS versions',
      ],
    },
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        loader: 'postcss-loader',
        options: {
          ident: 'postcss',
          syntax: 'postcss-scss',
          plugins: () => [
            require('postcss-import'),
            require('tailwindcss'),
            require('postcss-nested'),
            require('postcss-custom-properties'),
            require('autoprefixer'),
          ],
        },
      },
    ],
  },
};
