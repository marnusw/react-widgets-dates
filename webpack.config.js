const { join } = require('path')
const { name } = require('./package.json');

module.exports = {
  entry: './index',
  output: {
    path: join(__dirname, 'dist'),
    filename: `${name}.js`
  },
  devtool: 'source-map',
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', include: join(__dirname) }
    ]
  }
}
