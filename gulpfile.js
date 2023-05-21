const gulp = require('gulp')
const gulpSass = require('gulp-sass')(require('sass'));
/* var  concat  = require ( ' gulp-concat ' ) ;  */
const cleanCSS = require ('gulp-clean-css') ;  
const gulpConnect = require('gulp-connect');
const uglify = require ('gulp-uglify');
const gulpImageMin = require('gulp-imagemin');
const gulpData = require('gulp-data'); 
const gulpif = require('gulp-if');
const plumber = require('gulp-plumber');
const del = require('delete');
const svgSprite = require('gulp-svg-sprite');
const gulpPug = require('pag')

const outputDir = 'static'
const isProduction = process.env.NODE_ENV === 'production'

const srcSASS = ['src/**/*.css', 'src/**/*.scss']
const srcPUG = 'src/**/*.pug'
const srcJS = 'src/**/*.js'
const srcSVG = 'src/assets/*.svg'
const srcIMAGES = ['src/**/*.png', 'src/**/*.jpeg', 'src/**/*.gif', 'src/**/*.jpg', 'src/**/*.svg']

function server() {
    return gulpConnect.server({
        root: '/static',
        livereload: true,
        host: '0.0.0.0',
        port: 5000
    })
}

function clean(cb) {
    del([outputDir], cb)
}

function buildsStyles() {
    return gulp.src(srcSASS)
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(gulp.dest(outputDir))
    .pipe(gulpif(!isProduction, gulpConnect.reload()))
}

function svg() {
    return gulp.src(srcSVG, {cwd: ''})
    .pipe(plumber())
    .pipe(svgSprite({
        mode: {
            css: {
                render: {
                    css: true
                }
            }
        }
    }))
    .on('error', function(error) {
        console.log(error)
    })
    .pipe(gulp.dest(outputDir))
}

function pug() {
    return gulp.src(srcPUG)
    .pipe(gulpData(() => {
        return {
            __dirname: __dirname,
            require: require
        }
    }))
    .pipe(gulpPug())
    .pipe(gulp.dest(outputDir))
    .pipe(gulpif(!isProduction, gulpConnect.reload()))
}

function images() {
    return gulp.src(srcIMAGES)
    .pipe(gulpif(isProduction, gulpImageMin()))
    .pipe(gulp.dest(outputDir))
    .pipe(gulpif(!isProduction, gulpConnect.reload()))
}




