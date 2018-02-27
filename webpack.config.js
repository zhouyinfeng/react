var assetsViews = require('./assets-views');
var targetPath = './build'

module.exports = {
    entry: {
        'app': ['babel-polyfill', './app.js']
    },                 //打包的js
    resolve: {
        modulesDirectories: ['', 'node_modules']
    },
    output: {                                            //输出信息
        path: targetPath, //线上路径'./build/'
        filename: 'qianmi-[name].js',
        publicPath: './build/'
    },

    module: {                                         //处理jsx的编译
        loaders: [
            {test: /\.js$/, loader: 'babel-loader?stage=0&blacklist=strict'}
        ]
    },
    plugins: [
        assetsViews({
            from: './views/',
            to: './'
        })
    ]
};