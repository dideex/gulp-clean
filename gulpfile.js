"use strict";
const gulp = require("gulp"),
  sass = require("gulp-sass"),
  concat = require("gulp-concat"),
  csso = require("gulp-csso"),
  // gulpcopy = require("gulp-copy"),
  image = require("gulp-imagemin"),
  uglify = require("gulp-uglifyjs"),
  htmlmin = require("gulp-htmlmin"),
  autoprx = require("gulp-autoprefixer"),
  browser = require("browser-sync"),
  remember = require("gulp-remember"),
  cached = require("gulp-cached"),
  debug = require("gulp-debug"),
  newer = require("gulp-newer"),
  notify = require("gulp-notify"),
  plumber = require("gulp-plumber"),
  babel = require("gulp-babel"),
  pug = require("gulp-pug"),
  rename = require("gulp-rename"),
  sourcemaps = require("gulp-sourcemaps");

gulp.task("libs:js", function() {
  return gulp
    .src([
      "lib/jquery/dist/jquery.min.js",
      "lib/materialize/materialize.min.js"
      // "lib/bootstrap/dist/js/bootstrap.min.js",
      // "lib/vegas/dist/vegas.min.js",
      // "lib/owl.carousel/dist/owl.carousel.min.js",
      // "lib/waypoints/lib/noframework.waypoints.min.js",
      // "lib/magnific-popup/dist/jquery.magnific-popup.min.js"
    ])
    .pipe(concat("libs.js"))
    .pipe(uglify())
    .pipe(gulp.dest("js"));
});

gulp.task("libs:css", ["sass"], function() {
  return gulp
    .src([
      // "lib/magnific-popup/dist/magnific-popup.css",
      // "lib/owl.carousel/dist/assets/owl.carousel.min.css",
      // "lib/vegas/dist/vegas.min.css",
      // "lib/font-awesome/css/font-awesome.css",
      // "lib/materialize/ghpages-materialize.css",
      // "lib/bootstrap/dist/css/bootstrap.css"
    ])
    .pipe(concat("libs.css"))
    .pipe(csso())
    .pipe(gulp.dest("css"));
});

gulp.task("libs", ["libs:css", "libs:js"], function() {
  return;
});

gulp.task("sass", function() {
  return gulp
    .src("sass/*.sass")
    .pipe(
      plumber({
        errorHandler: notify.onError(err => ({
          title: "Sass",
          message: err.message
        }))
      })
    )
    .pipe(cached("sass"))
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprx(["last 15 versions", "> 1%"], { cascade: true }))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("css/"))
    .pipe(browser.reload({ stream: true }));
});

gulp.task("js", cb =>
  gulp
    .src("js/main.js")
    .pipe(
      plumber({
        errorHandler: notify.onError(err => ({
          title: "Js",
          message: err.message
        }))
      })
    )
    .pipe(cached("js"))
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(concat("main.min.js"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("js"))
    .pipe(browser.reload({ stream: true }))
);

gulp.task("sass:stream", function() {
  return sassruby("sass", { sourcemap: true })
    .on("error", function(err) {
      console.error("Error!", err.message);
    })
    .pipe(
      sourcemap.write("./", {
        includeContent: false,
        sourceRoot: "sass"
      })
    )
    .pipe(browserSync.stream({ match: "**/*.css" }));
});

gulp.task("browser", function() {
  browser({
    server: {
      baseDir: "./"
    },
    notify: false
  });
});

gulp.task("pug", cb =>
  gulp
    .src("*.pug")
    .pipe(
      plumber({
        errorHandler: notify.onError(err => ({
          title: "Js",
          message: err.message
        }))
      })
    )
    .pipe(cached("pug"))
    .pipe(pug())
    .pipe(gulp.dest("./"))
);

gulp.task("watch", ["browser", "sass", "js"], function() {
  gulp.watch("sass/**/*.sass", ["sass"]);
  gulp.watch("*.html", browser.reload);
  gulp.watch("js/**/*.js", ["js"]);
  gulp.watch("*.pug", ["pug"]);
});

gulp.task("watch:dist", ["build", "browser"], function() {
  gulp.watch("dist/*.html", browser.reload);
});

gulp.task("build", function() {
  gulp
    .src("img/**/*")
    .pipe(newer("dist/img"))
    .pipe(image())
    .pipe(gulp.dest("dist/img"));
  gulp
    .src("css/**/*.css")
    .pipe(csso())
    .pipe(gulp.dest("dist/css"));
  gulp
    .src("js/**/*")
    .pipe(uglify())
    .pipe(gulp.dest("dist/js"));
  gulp.src("fonts/**/*").pipe(gulp.dest("dist/fonts"));
  return (gulp
      .src("*.html")
      // .pipe(htmlmin({
      // 		collapseWhitespace: "true",
      // 		removeAttributeQuotes: "true",
      // 		removeComments: "true",
      // 		removeEmptyAttributes: "true",
      // 		removeEmptyElements: "true",
      // 		removeOptionalTags: "true",
      // 		removeRedundantAttributes: "true",
      // 		sortAttributes: "true",
      // 		sortClassName: "true",
      // 		minifyCSS: "true",
      // 		minifyJS: "true",
      // 		useShortDoctype: "true",
      // 		collapseBooleanAttributes: "true"
      // }))
      .pipe(gulp.dest("dist")) );
});
