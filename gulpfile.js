'use strict';
var gulp   = require("gulp"),
	sass     = require("gulp-sass"),
	concat   = require("gulp-concat"),
	csso     = require("gulp-csso"),
	// gulpcopy = require("gulp-copy"),
	image    = require("gulp-imagemin"),
	uglify   = require("gulp-uglifyjs"),
	htmlmin  = require("gulp-htmlmin"),
	autoprx  = require("gulp-autoprefixer"),
	browser  = require("browser-sync");

gulp.task("lib:js",function(){
	return gulp.src([
			"app/libs/jquery/dist/jquery.min.js",
			// "app/libs/bootstrap/dist/js/bootstrap.min.js",
			// "app/libs/vegas/dist/vegas.min.js",
			"app/libs/owl.carousel/dist/owl.carousel.min.js",
			"app/libs/waypoints/lib/noframework.waypoints.min.js",
			"app/libs/magnific-popup/dist/jquery.magnific-popup.min.js"
		])
		.pipe(concat("libs.js"))
		.pipe(uglify())
		.pipe(gulp.dest("app/js"));
});

gulp.task("lib:css",["sass"], function(){
	return gulp.src([
		"app/libs/magnific-popup/dist/magnific-popup.css",
		"app/libs/owl.carousel/dist/assets/owl.carousel.min.css",
		// "app/libs/vegas/dist/vegas.min.css",
		"app/libs/font-awesome/css/font-awesome.css",
		// "app/libs/bootstrap/dist/css/bootstrap.css"
		])
		.pipe(concat("libs.css"))
		.pipe(csso())
		.pipe(gulp.dest("app/css"));
});

gulp.task("libs",["lib:css","lib:js"],function(){return});

gulp.task("sass", function(){
	return gulp.src("app/sass/*.sass")
		.pipe(sass())
		.pipe(autoprx(["last 15 versions","> 1%", "ie 8", "ie 7"], {cascade: true}))
		.pipe(gulp.dest("app/css/"))
		.pipe(browser.reload({stream: true}));
});

gulp.task("sass:stream",function(){
	return sassruby("app/sass", {sourcemap: true})
		.on("error", function(err) {
			console.error("Error!", err.message);
		})
		.pipe(sourcemap.write("./", {
			includeContent: false,
			sourceRoot: "app/sass"
		}))
		.pipe(browserSync.stream({match: "**/*.css"}));
});

gulp.task('browser',function(){
	browser({
		server: {
			baseDir: "app"
		},
		notify: false
	});
});

gulp.task("watch", ["browser", "sass"], function(){
	gulp.watch("app/sass/**/*.sass",["sass"]);
	gulp.watch("app/*.html", browser.reload);
	gulp.watch("app/js/**/*.js", browser.reload);
});

gulp.task("watch:dist", ["build","browser"], function(){
	gulp.watch("dist/*.html", browser.reload);
});

gulp.task("build" , function(){
	gulp.src("app/img/**/*")
		.pipe(image())
		.pipe(gulp.dest("dist/img"));
	gulp.src("app/css/**/*")
		.pipe(csso())
		.pipe(gulp.dest("dist/css"));
	gulp.src("app/js/**/*")
		.pipe(uglify())
		.pipe(gulp.dest("dist/js"));
	gulp.src("app/fonts/**/*")
		.pipe(gulp.dest("dist/fonts"));
	return gulp.src("app/*.html")
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
		.pipe(gulp.dest("dist"));
});