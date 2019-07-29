let webpackConf = require("./webpack.conf");

let mix = require('laravel-mix');

let fs = require('fs');
let postcss = require("postcss");
let url = require("postcss-url");
let exec = require('child_process').exec;

inProduction = () => {
    return (
        process.argv.includes('--env.theme-production') ||
        Mix.inProduction()
    );

};

mix.webpackConfig(webpackConf);
Config.uglify = false;

Mix.listen('configReady', (webpackConfig) => {
    if (Mix.isUsing('hmr')) {
        // Remove leading '/' from entry keys
        webpackConfig.entry = Object.keys(webpackConfig.entry).reduce((entries, entry) => {
            entries[entry.replace(/^\//, '')] = webpackConfig.entry[entry];
            return entries;
        }, {});

        // Remove leading '/' from ExtractTextPlugin instances
        webpackConfig.plugins.forEach((plugin) => {
            if (plugin.constructor.name === 'ExtractTextPlugin') {
                plugin.filename = plugin.filename.replace(/^\//, '');
            }
        });

    }
});


mix
    .setResourceRoot('./')
    .setPublicPath('./resources')

    // theme frontend
    .js('assets/src/theme/js/theme.js', './theme')
    .sass('assets/src/theme/css/theme.scss', "./theme")

    // customizer UI
    .js('assets/src/customizer/js/customizer.js', './customizer')
    .sass('assets/src/customizer/css/customizer.scss', './customizer')

    // admin UI
    .js('assets/src/admin/js/admin.js', './admin')
    .sass('assets/src/admin/css/admin.scss', './admin')

    // customizer preview
    .js('assets/src/customizer/js/preview.js', './customizer')
    .sass('assets/src/customizer/css/preview.scss', './customizer')

    .copy('assets/images', './resources/images');


if (!inProduction()) {
    mix.sourceMaps(false);
}

let themeHead = "/*\n" +
    " Theme Name:   Colibri WP\n" +
    " Version:      @@build@@\n" +
    " Theme URI:    https://colibriwp.com/go/colibri-theme/\n" +
    " Description:  Colibri Theme is a very flexible, multipurpose WordPress theme that takes the Customizer to the next level.\n" +
    " Author:       Extendthemes\n" +
    " Author URI:   https://colibriwp.com/\n" +
    " License:      GNU General Public License version 3\n" +
    " License URI:  http://www.opensource.org/licenses/gpl-license.php GPL v3.0 (or later)\n" +
    " Tags:         entertainment, food-and-drink, portfolio, one-column, two-columns, right-sidebar, grid-layout, custom-header, custom-menu, custom-logo, full-width-template, theme-options, translation-ready, featured-images, threaded-comments\n" +
    " Text Domain:  colibri-wp\n" +
    "*/\n";

if (!Mix.inProduction()) {
    themeHead = "";
}

Mix.listen('build', () => {
    const path = "./resources/theme/theme.css";

    if (!fs.existsSync(path)) {
        return;
    }

    const css = fs.readFileSync(path, "utf8");
    const output = postcss()
        .use(url({
            url: "rebase"
        }))
        .process(css, {
            from: "./resources/theme/theme.css",
            to: "./style.css"
        });

    fs.writeFile('./style.css', themeHead + "\n" + output);
});


let var_export_json = (data, callback) => {
    let buff = new Buffer(JSON.stringify(data));
    data = buff.toString('base64');

    let phpBaseDecode = "base64_decode('" + data + "')";
    let phpJSONDecode = "json_decode(" + phpBaseDecode + ",true)";

    let command = "php -r \"var_export(" + phpJSONDecode + ");\"";
    exec(command, (err, stdout, stderr) => {

        if (err) {
            console.error("Could not create: ./inc/customizer-headers.php");
        } else {
            let exported = stdout.trim();
            exported = exported.length ? exported : "array()";
            callback(exported);
        }
    });
};

let doHeaders = () => {

    const source = "./assets/headers";

    var headers = fs.readdirSync(source).filter(function (name) {
        return fs.lstatSync(path.join(source, name)).isDirectory();
    });

    console.log(headers);

    let headersData = [];

    headers.forEach(header => {
        let headerPath = path.join(source, header);
        let headerPathImages = path.join(headerPath, "images");
        let headerData = fs.readFileSync(path.join(headerPath, 'header.json'));

        let preview = 'preview.jpg';

        if (!fs.existsSync(path.join(headerPath, preview))) {
            preview = 'preview.png';
        }

        headersData.push({
            image: "%s/" + header + '-' + preview,
            data: JSON.parse(headerData)
        });

        if (fs.existsSync(headerPathImages)) {
            console.log("Copy images");
            mix.copy(headerPathImages, "./resources/header-presets/images");
        }

        if (fs.existsSync(path.join(headerPath, preview))) {
            console.log("Copy preview");
            mix.copy(path.join(headerPath, preview), "./resources/header-presets/previews/" + header + '-' + preview);
        }

    });

    var_export_json(headersData, (exported) => {
        exported = exported.trim();
        exported = exported.length ? exported : "array()";
        fs.writeFileSync("./inc/customizer-headers.php", "<?php return " + exported + ";\n");
    });
};


doHeaders();


// Enable sourcemaps
// Full API
// mix.js(src, output);
// mix.react(src, output); <-- Identical to mix.js(), but registers React Babel compilation.
// mix.preact(src, output); <-- Identical to mix.js(), but registers Preact compilation.
// mix.coffee(src, output); <-- Identical to mix.js(), but registers CoffeeScript compilation.
// mix.ts(src, output); <-- TypeScript support. Requires tsconfig.json to exist in the same folder as webpack.mix.js
// mix.extract(vendorLibs);
// mix.sass(src, output);
// mix.standaloneSass('src', output); <-- Faster, but isolated from Webpack.
// mix.fastSass('src', output); <-- Alias for mix.standaloneSass().
// mix.less(src, output);
// mix.stylus(src, output);
// mix.postCss(src, output, [require('postcss-some-plugin')()]);
// mix.browserSync('my-site.test');
// mix.combine(files, destination);
// mix.babel(files, destination); <-- Identical to mix.combine(), but also includes Babel compilation.
// mix.copy(from, to);
// mix.copyDirectory(fromDir, toDir);
// mix.minify(file);
// mix.sourceMaps(); // Enable sourcemaps
// mix.version(); // Enable versioning.
// mix.disableNotifications();
// mix.setPublicPath('path/to/public');
// mix.setResourceRoot('prefix/for/resource/locators');
// mix.autoload({}); <-- Will be passed to Webpack's ProvidePlugin.
// mix.webpackConfig({}); <-- Override webpack.config.js, without editing the file directly.
// mix.babelConfig({}); <-- Merge extra Babel configuration (plugins, etc.) with Mix's default.
// mix.then(function () {}) <-- Will be triggered each time Webpack finishes building.
// mix.extend(name, handler) <-- Extend Mix's API with your own components.
// mix.options({
//   extractVueStyles: false, // Extract .vue component styling to file, rather than inline.
//   globalVueStyles: file, // Variables file to be imported in every component.
//   processCssUrls: true, // Process/optimize relative stylesheet url()'s. Set to false, if you don't want them touched.
//   purifyCss: false, // Remove unused CSS selectors.
//   uglify: {}, // Uglify-specific options. https://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
//   postCss: [] // Post-CSS options: https://github.com/postcss/postcss/blob/master/docs/plugins.md
// });
