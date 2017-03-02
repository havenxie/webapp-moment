var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var open = require('open');


var app = {
    srcPath: 'src/',
    devPath: 'build/',
    prdPath: "dist/"
};
gulp.task('lib', function() {
    gulp.src(app.srcPath + 'bower_components/**/*.js')
        .pipe(gulp.dest(app.devPath + 'lib'))
        .pipe(gulp.dest(app.prdPath + 'lib'))
        .pipe($.connect.reload());
});
gulp.task('html', function() {
    gulp.src(app.srcPath + '**/*.html')
        .pipe(gulp.dest(app.devPath))
        .pipe(gulp.dest(app.prdPath))
        .pipe($.connect.reload());
});
gulp.task('json', function() {
    gulp.src(app.srcPath + 'data/**/*.json')
        .pipe(gulp.dest(app.devPath + 'data'))
        .pipe(gulp.dest(app.prdPath + 'data'))
        .pipe($.connect.reload());
});
gulp.task('less', function() {
    gulp.src(app.srcPath + 'style/main.less')
        .pipe($.plumber())
        .pipe($.less())
        .pipe($.autoprefixer())
        .pipe(gulp.dest(app.devPath + 'css'))
        .pipe($.cssmin())
        .pipe(gulp.dest(app.prdPath + 'css'))
        .pipe($.connect.reload());
});
gulp.task('js', function() {
    gulp.src(app.srcPath + 'script/**/*.js')
        .pipe($.plumber())
        .pipe(gulp.dest(app.devPath + 'js'))
        .pipe($.uglify())
        .pipe(gulp.dest(app.prdPath + 'js'))
        .pipe($.connect.reload());
});
gulp.task('image', function() {
    gulp.src(app.srcPath + 'images/**')
        .pipe($.plumber())
        .pipe(gulp.dest(app.devPath + 'images'))
        .pipe($.imagemin())
        .pipe(gulp.dest(app.prdPath + 'images'))
        .pipe($.connect.reload());
});

gulp.task('fonts', function() {
    gulp.src(app.srcPath + 'fonts/*')
        .pipe(gulp.dest(app.devPath + 'fonts/'))
        .pipe(gulp.dest(app.prdPath + 'fonts/'))
        .pipe($.connect.reload());
});
gulp.task('api', function() {
    gulp.src(app.srcPath + 'api/*')
        .pipe(gulp.dest(app.devPath + 'api/'))
        .pipe(gulp.dest(app.prdPath + 'api/'))
        .pipe($.connect.reload());
});
gulp.task('ico', function() {
    gulp.src(app.srcPath + 'favicon.ico')
        .pipe(gulp.dest(app.devPath))
        .pipe(gulp.dest(app.prdPath))
        .pipe($.connect.reload());
});
gulp.task('build', ['image', 'js', 'less', 'lib', 'html', 'json', 'fonts', 'api', 'ico']);
gulp.task('clean', function() {
    gulp.src([app.devPath, app.prdPath])
        .pipe($.clean());
});
gulp.task('serve', ['build'], function() {
  // 这里不能创建服务，因为要让阿帕奇去托管这个服务
  /*注意：这里要不要注释取决你的吊事方式*/
    $.connect.server({
        root: [app.devPath],
        livereload: true,
        port: 3000
    });
    open('http://localhost:3000');
    /**/
    gulp.watch('bower_components/**/*', ['lib']);
    gulp.watch(app.srcPath + '**/*.html', ['html']);
    gulp.watch(app.srcPath + 'data/**/*.json', ['json']);
    gulp.watch(app.srcPath + 'style/**/*.less', ['less']);
    gulp.watch(app.srcPath + 'script/**/*.js', ['js']);
    gulp.watch(app.srcPath + 'image/**/*', ['image']);
    gulp.watch(app.srcPath + 'fonts/**/*', ['fonts']);
    gulp.watch(app.srcPath + 'api/**/*.php', ['api']);
    gulp.watch(app.srcPath + 'favicon.ico', ['ico']);
});

gulp.task('default', ['serve']);