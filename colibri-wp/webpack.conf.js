function resolveColibriEditor(dir) {
    return path.join(__dirname, "/assets/colibri-editor", dir);
}

if(!global.Config){
    global.Config = require('laravel-mix/src/config')();
}

module.exports = {
    externals: {
        "jquery": "jQuery",
        "wp": "wp",
        "_": "_"
    },
    resolve: {
        alias: {
            '@': resolveColibriEditor(''),
            '@root/static': resolveColibriEditor('/../colibri-static'),
            '@root/static-free': resolveColibriEditor('/../colibri-static-free'),
        },
    },
    module: {
        rules: [
            {
                test: /(\.(woff2?|ttf|eot|otf)$|font.*\.svg$)/,
                loader: 'file-loader',
                options: {
                    name: path => {
                        if (!/node_modules|bower_components/.test(path)) {
                            return Config.fileLoaderDirs.fonts + '/[name].[ext]';
                        }

                        return (
                            Config.fileLoaderDirs.fonts +
                            '/vendor/[name].[ext]'
                        );
                    },
                    publicPath: './../'
                },

            },

            {
                // only include svg that doesn't have font in the path or file name by using negative lookahead
                test: /(\.(png|jpe?g|gif)$|^((?!font).)*\.svg$)/,
                loaders: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: path => {
                                if (!/node_modules|bower_components/.test(path)) {
                                    return (
                                        Config.fileLoaderDirs.images +
                                        '/[name].[ext]'
                                    );
                                }

                                return (
                                    Config.fileLoaderDirs.images +
                                    '/vendor/' +
                                    path
                                        .replace(/\\/g, '/')
                                        .replace(
                                            /((.*(node_modules|bower_components))|images|image|img|assets)\//g,
                                            ''
                                        )
                                );
                            },
                            publicPath: './../'
                        }
                    },

                    {
                        loader: 'img-loader',
                        options: Config.imgLoaderOptions
                    }
                ]
            },
        ]
    }
};
