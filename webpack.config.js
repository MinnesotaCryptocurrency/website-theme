const path = require('path');

module.exports = {
    entry: [
        './src/js/index',
        './src/css/index',
    ],
    output: {
        path: path.resolve(__dirname, './static/'),
        filename: 'js/app.js',
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /(node_modules|static)/,
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'css/app.css',
                        },
                    },
                    {
                        loader: 'extract-loader',
                        options: {
                            publicPath: './',
                        },
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'postcss-loader',
                    },
                    {
                        loader: 'sass-loader',
                    },
                    {
                        loader: 'import-glob-loader',
                    },
                ],
                include: path.resolve(__dirname, 'src/css/'),
                exclude: /static/,
            },
        ],
    },
    externals: {
        bluebird: 'Promise',
        // bluebird: {
        //     root: 'Promise',
        // },
    },
    resolve: {
        extensions: [
            '.ts',
            '.js',
            '.scss',
        ],
    },
};
