var gulp = require('gulp');
var browserSync = require('browser-sync').create();

gulp.task('watch', function(){
  browserSync.init({
    server:'./client/dev/',
    port: 8080
  });
  gulp.watch('client/dev/*.html').on('change', browserSync.reload);
  gulp.watch('client/dev/stylesheets/*.css').on('change', browserSync.reload);
  gulp.watch('client/dev/javascripts/*.js').on('change', browserSync.reload);
});
