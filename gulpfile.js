const gulp = require('gulp')
  , pug = require('gulp-pug')
  , fs = require('fs')
  , browserSync = require('browser-sync').create()
  , reload = browserSync.reload
  , sass = require('gulp-sass')
  , plumber = require('gulp-plumber')
  , spritesmith = require('gulp.spritesmith')
  , sassGlob = require('gulp-sass-glob')
  , sourcemaps = require('gulp-sourcemaps')
  , csso = require('gulp-csso')
  , autoprefixer = require('gulp-autoprefixer')
	, cssunit = require('gulp-css-unit')
	, wait = require('gulp-wait');

// server
gulp.task('server', function() {
	browserSync.init({
		open: false,
		notify: false,
		server: {
			baseDir: "./dist",
		}
	});
});

gulp.task('sass', () => {
	return gulp.src('./src/styles/main.sass')
	  .pipe(plumber())
	  .pipe(sourcemaps.init())
		.pipe(sassGlob())
		.pipe(wait(200)) //VSCode Bug
	  .pipe(sass())
	  .pipe(autoprefixer({
		  browsers : ['> 5%'],
		  cascade : false
		}))
		
	  // .pipe(cssunit({
	  // 	type     :    'px-to-rem',
	  // 	rootSize  :    16
	  // }))
	  .pipe(csso())
	  .pipe(sourcemaps.write())
	  .pipe(gulp.dest('./dist/css/'))
	  .pipe(reload({stream : true}));
});

gulp.task('pug', () => {

	gulp.src('src/views/pages/**/*.pug')
	  .pipe(plumber())
	  .pipe(pug({
		  locals : JSON.parse(fs.readFileSync('./src/contents/content.json', 'utf8')),
		  pretty: true,
	  }))
	  .pipe(gulp.dest('dist'))
	  .pipe(reload({stream : true}));
});

gulp.task('sprite', function () {
	var spriteData = gulp.src(
	  './src/img/icon/*.png'
	).pipe(spritesmith({
		imgName: 'sprite.png',
		cssName: 'sprite.sass',
		cssFormat: 'sass',
		imgPath: '../img/sprite/sprite.png',
		padding: 50
	}));

	spriteData.img.pipe(gulp.dest('./dist/img/sprite'));
	spriteData.css.pipe(gulp.dest('./src/styles/sprite'));
});

gulp.task('watch', () => {
	gulp.watch('src/**/*.pug', ['pug']);
	gulp.watch('src/**/*.sass', ['sass']);
	gulp.watch('src/**/*.js', ['js']);
});
//свои
gulp.task('img', function () {
	gulp.src('src/img/**/*')
  		.pipe(gulp.dest('dist/img/'))
});
gulp.task('fonts', function () {
	gulp.src('src/fonts/**/*')
	  .pipe(gulp.dest('dist/fonts/'))
});
gulp.task('js', function () {
	gulp.src('src/js/**/*')

	  .pipe(gulp.dest('dist/js/'))
});


gulp.task('default', ['sass', 'js', 'pug','sprite','fonts','img', 'server', 'watch']);