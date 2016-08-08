var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        app: './client/app.js',
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'public/javascripts')
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    plugins: ['transform-decorators-legacy'],
                    presets: ['react', 'es2015', 'stage-1']
                }
            },
            { include: /\.json$/, loaders: ['json-loader'] }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            }
        })
    ],
    resolve: {
        extensions: ['', '.jsx', '.js', '.json']
    },
    stats: {
        errorDetails: true,
        json: true,
        modules: true,
        chunks: true,
        errorDetails: true,
        source: false
    }
};
