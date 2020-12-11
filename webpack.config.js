const path = require('path');

const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractCSS = new ExtractTextPlugin({
    filename: "bundle.css"
});

module.exports = { 
    entry: "./index.js", // основной файл приложения
    output:{ 
        path: __dirname, // путь к каталогу выходных файлов
        //path: __dirname + '/dist', // путь к каталогу выходных файлов
        filename: "bundle.js"  // название создаваемого файла 
       
    }, 
    devtool:'source-map',
    module:{ 
        rules:[
            {
                test: /\.js$/,
                use: ['babel-loader'],//, 'eslint-loader'],
                exclude: [
                  /node_modules/
                ]
            },
           
            {
                test: /\.(png|svg|jpg|gif )$/,
                use: ["file-loader"]
            },
            {
                test: /\.mp3$/,
                loader: 'file-loader',
                query: {
                    name: 'static/media/[name].[hash:8].[ext]'
                }
            },
            {
                test: /\.css$/,
                use: extractCSS.extract({
                    use: ["css-loader"]
                })
            }            
        ] 
    },
    plugins: [
        extractCSS
    ]
}