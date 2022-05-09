const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
// const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    filename: 'index.js',
    path: path.join(__dirname, './dist'),
    libraryTarget: 'umd',
    globalObject: 'this',
    // publicPath: './',
    // publicPath: path.join(__dirname, './dist'),
    // library: 'sum',
  },
  externals: {
    react: 'react',
    'react-dom': 'react-dom',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.join(__dirname, './src/lib'),
          to: path.join(__dirname, './dist/lib'),
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /(\.js|\.jsx|\.ts|\.tsx)$/,
        use: {
          loader: 'babel-loader',
        },
        exclude: '/node-modules/',
      },
      {
        test: /(\.svg|.png)$/,
        // webpack5 中新增的aseet/inline特性，不用额外安装file-loader
        type: 'asset/inline',
      },
      {
        test: /\.(css|less)$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
          },
        ],
      },
    ],
  },
}
