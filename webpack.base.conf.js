const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

const PATHS = {
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, './dist'),
  cache: path.join(__dirname, './cache')
};

module.exports = {
  externals: {
    paths: PATHS
  },
  entry: {
    app: PATHS.src
  },
  output: {
    path: PATHS.dist,
    filename: 'js/[name].bundle.js',
    publicPath: '/'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /node_modules|vendor-aux/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loader: {
            scss: 'vue-style-loader!css-loader!sass-loader'
          }
        }
      },
      {
        test: /\.woff(2)?$/,
        loader: 'file-loader',
        options: {
          publicPath: '../fonts/',
          name: '[name].[ext]',
          emitFile: false
        }
      },
      {
        test: /\.png|jp(e)?g|gif|svg$/i,
        loader: 'file-loader',
        options: {
          publicPath: '../img/',
          name: '[name].[ext]',
          emitFile: false
        }
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  },
  resolve: {
    alias: {
      '~': PATHS.src,
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      ignoreOrder: true
    }),
    new HtmlWebpackPlugin({
      template: `${PATHS.src}/index.html`,
      filename: './index.html',
      inject: false,
      minify: false
    }),
    new CopyWebpackPlugin([
      {
        from: `${PATHS.src}/fonts`,
        to: `${PATHS.dist}/fonts`,
        ignore: ['.gitkeep']
      },
      {
        from: `${PATHS.src}/img`,
        to: `${PATHS.dist}/img`,
        ignore: ['.gitkeep']
      },
      {
        from: `${PATHS.src}/static`,
        to: `${PATHS.dist}`
      }
    ])
  ]
};
