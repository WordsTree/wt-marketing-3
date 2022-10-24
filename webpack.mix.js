const mix = require('laravel-mix');

mix.webpackConfig({
    stats: {
        children: true,
    },
});

mix.js('resources/js/script.js', 'public/js')
   .postCss('resources/css/style.css', 'public/css', [
        require('postcss-import'),
    ])

if (mix.inProduction()) {
    mix.version();
}
