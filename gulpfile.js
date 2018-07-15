'use strict'
const gulp = require('gulp'),
// gulpcopy = require("gulp-copy"),
// htmlmin = require("gulp-htmlmin"),
// remember = require("gulp-remember"),
// debug = require("gulp-debug"),
  cached = require('gulp-cached'),
  newer = require('gulp-newer'),
  notify = require('gulp-notify'),
  plumber = require('gulp-plumber'),
  concat = require('gulp-concat'),
  rename = require("gulp-rename"),
  browser = require('browser-sync'),
  sourcemaps = require('gulp-sourcemaps'),
  // CSS
  sass = require('gulp-sass'),
  csso = require('gulp-csso'),
  autoprx = require('gulp-autoprefixer'),
  critical = require('critical'),
  // IMG OPTIMIZATION
  image = require('gulp-imagemin'),
  kraken = require('gulp-kraken'),
  guetzli = require('imagemin-guetzli'),
  // JS
  uglify = require('gulp-uglifyjs'),
  ts = require('gulp-typescript'),
  babel = require('gulp-babel'),
  // HTML
  pug = require('gulp-pug'),
  // FAVICON
  realFavicon = require('gulp-real-favicon')

gulp.task('libs:js', function () {
  return gulp
    .src([
      'js/libs/jquery.js',
      'js/libs/magnificPopup.js',
      'js/libs/owlCarousel.js',
      'js/libs/bootstrap/tab.js',
      // "lib/jquery/dist/jquery.min.js",
      // "lib/materialize/materialize.min.js"
      // "lib/bootstrap/dist/js/bootstrap.min.js",
      // "lib/vegas/dist/vegas.min.js",
      // "lib/owl.carousel/dist/owl.carousel.min.js",
      // "lib/waypoints/lib/noframework.waypoints.min.js",
      // "lib/magnific-popup/dist/jquery.magnific-popup.min.js"
    ])
    .pipe(concat('libs.js'))
    .pipe(uglify())
    .pipe(gulp.dest('js/src'))
})

gulp.task('libs:css', ['sass'], function () {
  return gulp
    .src([
      // "lib/magnific-popup/dist/magnific-popup.css",
      // "lib/owl.carousel/dist/assets/owl.carousel.min.css",
      // "lib/vegas/dist/vegas.min.css",
      // "lib/font-awesome/css/font-awesome.css",
      // "lib/materialize/ghpages-materialize.css",
      // "lib/bootstrap/dist/css/bootstrap.css"
    ])
    .pipe(concat('libs.css'))
    .pipe(csso())
    .pipe(gulp.dest('css'))
})

gulp.task('libs', ['libs:css', 'libs:js'], function () {
  return
})

gulp.task('sass', function () {
  return (
    gulp
    .src('sass/*.sass')
    .pipe(
      plumber({
        errorHandler: notify.onError(err => ({
          title: 'Sass',
          message: err.message,
        })),
      }),
    )
    // .pipe(cached("sass"))
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprx(['last 15 versions', '> 1%'], {
      cascade: true
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('css/'))
    .pipe(browser.reload({
      stream: true
    }))
  )
})

gulp.task('ts', cb =>
  gulp
  .src('ts/**/*.ts')
  .pipe(
    plumber({
      errorHandler: notify.onError(err => ({
        title: 'Ts',
        message: err.message,
      })),
    }),
  )
  .pipe(sourcemaps.init())
  .pipe(cached('ts'))
  .pipe(ts({
    noImplicitAny: true,
    outFile: 'main.ts.js'
  }))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('js/src')),
)

gulp.task(
  'js',
  cb =>
  gulp
  .src('js/src/main.js')
  .pipe(
    plumber({
      errorHandler: notify.onError(err => ({
        title: 'Js',
        message: err.message,
      })),
    }),
  )
  .pipe(cached('js'))
  .pipe(sourcemaps.init())
  .pipe(babel())
  .pipe(concat('main.min.js'))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('js/src')),
  // .pipe(browser.reload({ stream: true }))
)

gulp.task('scripts', cb =>
  gulp
  .src(['js/src/libs.js', 'js/src/main.min.js', 'js/src/main.ts.js'])
  .pipe(sourcemaps.init())
  .pipe(concat('scripts.js'))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('js'))
  .pipe(browser.reload({
    stream: true
  })),
)



gulp.task('injectFonts', function (done) {
  gulp
    .src('js/injectFonts.js')
    .pipe(uglify())
    .pipe(concat('injectFonts.min.js'))
    .pipe(gulp.dest('js'))
})

gulp.task('sass:stream', function () {
  return sassruby('sass', {
      sourcemap: true
    })
    .on('error', function (err) {
      console.error('Error!', err.message)
    })
    .pipe(
      sourcemap.write('./', {
        includeContent: false,
        sourceRoot: 'sass',
      }),
    )
    .pipe(browserSync.stream({
      match: '**/*.css'
    }))
})

gulp.task('browser', function () {
  browser({
    server: {
      baseDir: './',
    },
    notify: false,
  })
})

gulp.task('browser:dist', function () {
  browser({
    server: {
      baseDir: 'dist',
    },
    notify: false,
  })
})

gulp.task('pug', cb =>
  gulp
  .src('index.pug')
  .pipe(
    plumber({
      errorHandler: notify.onError(err => ({
        title: 'Pug',
        message: err.message,
      })),
    }),
  )
  // .pipe(cached("pug"))
  .pipe(pug({
    pretty: true
  }))
  .pipe(gulp.dest('./')),
)

gulp.task(
  'watch', ['browser', 'pug', 'sass', 'js', 'ts', 'scripts'],
  function () {
    gulp.watch('sass/**/*.sass', ['sass'])
    gulp.watch('sass/**/*.scss', ['sass'])
    gulp.watch('*.html', browser.reload)
    gulp.watch('js/**/*.js', ['js', 'scripts'])
    gulp.watch('ts/**/*.ts', ['ts', 'scripts'])
    gulp.watch('*.pug', ['pug'])
  },
)

gulp.task('watch:dist', ['build', 'browser:dist'], function () {
  gulp.watch('dist/*.html', browser.reload)
})

gulp.task('kraken', function () {
  var config = {}
  try {
    config = require('./design/kraken.json')
    // watch for keys in another place ;)
  } catch (error) {
    console.log('\n\n\n Missing kraken.json')
  }

  gulp.src('dist/img/**/*').pipe(kraken(config))
})

gulp.task('imagemin', function () {
  gulp
    .src('img/**/*')
    .pipe(newer('dist/img'))
    .pipe(image())
    .pipe(gulp.dest('dist/img'))
})

gulp.task('build:noimg', () => {
  gulp.src('mail.php').pipe(gulp.dest('dist'))
  gulp
    .src('css/**/*.css')
    .pipe(csso())
    .pipe(gulp.dest('dist/css'))
  gulp
    .src('js/scripts.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
  gulp
    .src('index-critical.html')
    .pipe(rename('index.html'))
    .pipe(gulp.dest('dist'))
})

gulp.task('build', ['imagemin', 'favicon', 'critical'], function () {
  gulp.src('mail.php').pipe(gulp.dest('dist'))
  gulp.src('site.webmanifest').pipe(gulp.dest('dist'))
  gulp.src('browserconfig.xml').pipe(gulp.dest('dist'))
  gulp
    .src('css/**/*.css')
    .pipe(csso())
    .pipe(gulp.dest('dist/css'))
  gulp
    .src('js/scripts.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
  gulp.src('fonts/**/*').pipe(gulp.dest('dist/fonts'))
  gulp
    .src('index-critical.html')
    .pipe(rename('index.html'))
    .pipe(gulp.dest('dist'))
})

const FAVICON_DATA_FILE = 'faviconData.json'
gulp.task('favicon', function (done) {
  realFavicon.generateFavicon({
    masterPicture: './img/favicon/assets/favicon.png',
    dest: './img/favicon',
    iconsPath: '/',
    design: {
      ios: {
        pictureAspect: 'noChange',
        assets: {
          ios6AndPriorIcons: false,
          ios7AndLaterIcons: false,
          precomposedIcons: false,
          declareOnlyDefaultIcon: true
        }
      },
      desktopBrowser: {},
      windows: {
        pictureAspect: 'noChange',
        backgroundColor: '#9f00a7',
        onConflict: 'override',
        assets: {
          windows80Ie10Tile: false,
          windows10Ie11EdgeTiles: {
            small: false,
            medium: true,
            big: false,
            rectangle: false
          }
        }
      },
      androidChrome: {
        pictureAspect: 'noChange',
        themeColor: '#ffffff',
        manifest: {
          display: 'standalone',
          orientation: 'notSet',
          onConflict: 'override',
          declared: true
        },
        assets: {
          legacyIcon: false,
          lowResolutionIcons: false
        }
      },
      safariPinnedTab: {
        pictureAspect: 'silhouette',
        themeColor: '#5bbad5'
      }
    },
    settings: {
      scalingAlgorithm: 'Mitchell',
      errorOnImageTooSmall: false,
      readmeFile: false,
      htmlCodeFile: false,
      usePathAsIs: false
    },
    markupFile: FAVICON_DATA_FILE
  }, function () {
    done();
  });
});

gulp.task('critical', function () {
  return critical.generate({
    inline: true,
    base: './',
    src: 'index.html',
    dest: 'index-critical.html',
    minify: true,
    width: 1300,
    height: 900
  })
})

gulp.task('guetzli', () =>
    gulp.src('dist/img/*')
        .pipe(cached('guetzli'))
        .pipe(image([guetzli({quality: 85})]))
        .pipe(gulp.dest('dist/img'))
);