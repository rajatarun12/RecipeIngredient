const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/main.ts',
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['ts-loader', 'angular2-template-loader']
      },
      {
        test: /\.(scss|sass)$/,
        use: ['sass-loader']
      }]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' })
  ]
};

