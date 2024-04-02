import webpackS from "webpack-stream";
import webpack from "webpack";
export const js = () => {
  return app.gulp
    .src(app.path.src.js, { sourcemaps: app.isDev })
    .pipe(
      webpackS({
        mode: app.isBuild ? "production" : "development",
        plugins: [
          new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
          }),
        ],
        module: {
          rules: [{ test: /\.css$/, use: ["style-loader", "css-loader"] }],
        },
        output: { filename: "script.min.js" },
      })
    )
    .pipe(app.gulp.dest(app.path.build.js))
    .pipe(app.plugins.browserSync.stream());
};
