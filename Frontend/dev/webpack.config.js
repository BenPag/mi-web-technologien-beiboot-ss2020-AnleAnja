const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './assets/js/main.js',
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js']
    },
    output: {
        path: __dirname + '/public/js',
        publicPath: '/',
        filename: 'main.min.js'
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: __dirname + '/assets/js/serviceWorker.js', to: __dirname + '/public/serviceWorker.js' },
                { from: __dirname + '/assets/manifest.json', to: __dirname + '/public/manifest.json' },
                { from: __dirname + '/views/index.html', to: __dirname + '/public/index.html' },
            ],
        }),
    ],
};
