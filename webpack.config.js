const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports ={
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: 'main.js',
        clean:true,
    },
    devtool: 'source-map',
    devServer: {
     static:{
         directory: path.resolve(__dirname, 'dist')
     },
     port: 3000,
     open: true,
     hot:  true,
     compress: true,
     historyApiFallback:true,
    },
    module: {

        rules: [
    
          {
    
            test: /\.css$/,
    
            use: ['style-loader', 'css-loader'],
    
          },
    
        ],
    
      },
      plugins: [
          new HtmlWebpackPlugin({
              title:"webpack App",
              filename:'index.html',
              template:'src/template.html',

          }),
      ],
};