const HtmlWebpackPlugin = require('html-webpack-plugin');
const AngularCompilerPlugin = require('@ngtools/webpack').AngularCompilerPlugin;

module.exports = {
  entry: './src/main.ts',
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['@ngtools/webpack']
      },
      {
        test: /\.(scss|sass)$/,
        use: ['sass-loader']
      }]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: 'src/index.html' }),
    new AngularCompilerPlugin({
      tsConfigPath: './tsconfig.json',
      entryModule: './src/main.ts'
    })
  ]
};

