const TerserPlugin = require('terser-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const path = require('path')

module.exports = {
  cache: true,
  performance: {
    hints: false
  },
  entry: {
    main: path.join(__dirname, 'src/scripts/main.js'),
    content_scripts: path.join(__dirname, 'src/content_scripts.js')
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env'
              ]
            }
          }
        ]
      }
    ]
  },
  optimization: {
    minimizer: [new TerserPlugin({
      extractComments: false
    })]
  },
  plugins: [
    new ESLintPlugin({
      extensions: ['.js'],
      exclude: 'node_modules'
    })
  ]
}
