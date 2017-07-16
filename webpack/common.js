var _ = require('lodash');
var webpack = require('webpack');
var pkg = require('../package.json');

function concatArrays(objValue, srcValue) {
  if (_.isArray(objValue)) {
    return _.uniq(objValue.concat(srcValue));
  }
}

module.exports = function(cfg) {
  var common = {
    stats: {
      colors: true,
      reasons: true
    },
    entry: {
      'dist/formly-material': './src/index'
    },
    output: {
      libraryTarget: 'umd',
      library: 'ngFormlyMaterial'
    },
    resolve: {
      extensions: ['.js', '.html']
    },
    externals: {
      'angular': 'angular'
    },
    module: {
      rules: [{
        test: /\.js$/,
        include: [
          /tests/,
          /src/
        ],
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }]
      }, {
        test: /\.html$/,
        exclude: /node_modules/,
        include: [/src/],
        loader: 'html-loader'
      }]
    },
    plugins: [
      new webpack.BannerPlugin(pkg.name + ' v' + pkg.version + ' | MIT | built with ♥ by ' + pkg.author)
    ]
  };

  return _.merge({}, common, cfg, concatArrays);
};
