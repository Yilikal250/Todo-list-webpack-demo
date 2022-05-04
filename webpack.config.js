const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports ={
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: 'main.js',
        clean: true,
    },

    module: {

        rules: [
    
          {
    
            test: /\.css$/,
    
            use: ['style-loader', 'css-loader'],
    
          },
    
        ],
    
      },
      devServer: {
        static: './dist',
     },
      plugins: [
          new HtmlWebpackPlugin({
              title:"webpack App",
              filename:'index.html',
              template:'src/template.html',

          }),
      ],
};