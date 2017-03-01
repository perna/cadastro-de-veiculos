'use strict';

var gulp       = require('gulp');
var concat     = require('gulp-concat');
var uglify     = require('gulp-uglify');
var rename     = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');


gulp.task('concat', function(){
    return gulp.src([
                        './public/js/app.js',
                        './public/js/carros/controllers/CarrosController.js',
                        './public/js/carros/services/CarrosService.js'
                    ])
        .pipe(concat('app.js',{newLine: ';'}))
        .pipe(gulp.dest('./public/dist/js'));
});


gulp.task('minify', ['concat'], function(){
    return gulp.src('./public/dist/js/app.js')
        .pipe(sourcemaps.init())
            .pipe(rename('app.min.js'))
            .pipe(uglify({mangle:false, unused:true}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./public/dist/js'))
});



gulp.task('default', ['minify'], function(){
    gulp.watch('./public/js/**/*.js',['minify']);
});