const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');

function imageCompress(cb){
    return gulp.src('./src/images/**/*.png')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/images'))
    cb();
}

function styleCompress(cb){
    return gulp.src('./src/style/**/*.scss')
        .pipe(sass({
            outputStyle:'compressed'
        }))
        .pipe(gulp.dest('./dist/style'))
    cb();
}

function scriptCompress(cb){
    return gulp.src('./src/script/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist/script'));
    cb();
}

function htmlCompress(cb){
    return gulp.src('./index.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
        }))
        .pipe(gulp.dest('./dist'));
        cb();
}

exports.default = gulp.parallel([imageCompress, styleCompress, scriptCompress, htmlCompress]);
exports.watch = function(){
    gulp.watch('./src/style/**/*.scss', gulp.parallel(styleCompress));
    gulp.watch('./src/script/**/*.js', gulp.parallel(scriptCompress));
}