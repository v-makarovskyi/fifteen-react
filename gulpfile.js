const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'));
/* var  concat  = require ( ' gulp-concat ' ) ;  */
const cleanCSS = require ('gulp-clean-css') ;  
const gulpConnect = require('gulp-connect');
const uglify = require ('gulp-uglify');
const gulpImageMin = require('gulp-imagemin'); 

function defaultTask(cb) {
    cb()
}

exports.default = defaultTask