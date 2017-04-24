module.exports = {
    entry: './src/js/main.js',
    output: {
        path: __dirname + '/dist',
        filename: 'app.bundle.js',
        publicPath: '/dist/'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: '/(node_modules|bower_components)/',
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.(woff|woff2|ttf|svg|eot)$/,                
                loader: 'url?limit=100000',                
            }
        ]
    },
    resolveLoader: {
        moduleExtensions: ['-loader']
    },
};