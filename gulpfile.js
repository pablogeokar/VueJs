var gulp = require('gulp');

gulp.task('default', function(){
    gulp.src('./node_modules/materialize-css/fonts/roboto/**/*')
    .pipe(gulp.dest('./dist/fonts/roboto'));
    console.log('minha primeira tarefa');
});