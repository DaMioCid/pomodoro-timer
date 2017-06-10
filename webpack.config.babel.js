import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const extractCss = new ExtractTextPlugin({
    filename: '[name].css'
});
const extractHtml = new ExtractTextPlugin({
    filename: '[name].html'
});

const config = {
    // devtool: 'source-map',
    context: path.resolve(__dirname, 'src'),
    entry: './js/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: "dist"
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        watchContentBase: true,
        open: true,
        port: 9000
    },
    module: {
        rules: [{
            test: /\.pug$/,
            use: extractHtml.extract({
                use: ['html-loader', 'pug-html-loader?pretty']
            })
        }, {
            test: /\.sass$/,
            use: extractCss.extract({
                use: ['css-loader', 'sass-loader']
            })
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: [
                            ['es2015', { 'modules': false }]
                        ]
                        // ,
                        // sourceMap: true,
                        // sourceMapContents: true,
                }
            }]
        }]
    },
    plugins: [
        extractCss,
        extractHtml
    ]
}
export default config;