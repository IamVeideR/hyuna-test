module.exports = function () {
    $.gulp.task('watch', function(){
        $.gulp.watch('src/pug/**/*.pug', $.gulp.series('pug'))
        $.gulp.watch('src/**/*.scss', $.gulp.series('sass'))
        $.gulp.watch('src/**/*.js', $.gulp.series('scripts'))
    }); 
}