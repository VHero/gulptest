/**
 * 组件安装
 * npm install gulp-util gulp-imagemin gulp-less gulp-minify-css gulp-jshint gulp-uglify gulp-rename gulp-concat gulp-clean browser-sync --save-dev
 */


// 引入 gulp及组件
var gulp = require('gulp'), //基础库
    imagemin = require('gulp-imagemin'), //图片压缩
    less = require('gulp-less'), //less
    minifycss = require('gulp-minify-css'), //css压缩
    jshint = require('gulp-jshint'), //js检查
    uglify = require('gulp-uglify'), //js压缩
    rename = require('gulp-rename'), //重命名
    concat = require('gulp-concat'), //合并文件

    clean = require('gulp-clean'); //清空文件夹

var browserSync = require('browser-sync').create();//实时预览
var reload = browserSync.reload;
// html处理
gulp.task('html', function() {
    var htmlSrc = './src/template/*.html', //  **/*.html表示匹配foo.html,a/foo.html,a/b/foo.html,a/b/c/foo.html的文件
        htmlDst = './dist/';
    gulp.src(htmlSrc)
        .pipe(gulp.dest(htmlDst));
});
//样式处理
gulp.task('css', function() {
    var cssSrc = ['./src/css/*.css', './src/css/*.less'];
    cssDst = './dist/css';
    gulp.src(cssSrc)
        .pipe(less())
        // .pipe(gulp.dest(cssDst))
        .pipe(concat('main.css'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest(cssDst))


});
// 图片压缩
gulp.task('image', function() {
    var imageSrc = ['./src/img/*.jpg', './src/img/*.png', './src/img/*.gif'],
        imageDst = './dist/';
    gulp.src(imageSrc)
        .pipe(imagemin())
        .pipe(gulp.dest(imageDst));
});
// js处理
gulp.task('js', function() {
    var jsSrc = ['./src/js/controllers/*.js'],
        jsDst = './dist/js/controllers';
    gulp.src(jsSrc)
        // .pipe(jshint())
        // .pipe(jshint.reporter('default'))
        // .pipe(concat('main.js'))
        .pipe(concat('controllers.js'))
        .pipe(gulp.dest(jsDst))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest(jsDst))
});

// 默认gulp
gulp.task('default', function() {
    gulp.start('html', 'css', 'image', 'js');
});
// 清空dist文件夹下所有文件
gulp.task('clean', function() {
    // 清空图片、样式、js 字体
    // gulp.src(['./dist/css', './dist/js', './dist/images','dist/font'], {read: false})
    gulp.src(['./dist/*'], { read: false })
        .pipe(clean());
});
gulp.task('watch', function() {
    // 监听html
    gulp.watch('./src/**/*.html', function(event) {
        gulp.run('html');
    })

    // 监听css
    gulp.watch('./src/**/*.css', function() {
        gulp.run('css');
    });

    // 监听images
    gulp.watch('./src/**/*.jpg', function() {
        gulp.run('images');
    });

    // 监听js
    gulp.watch('./src/**/*.js', function() {
        gulp.run('js');
    });

});
gulp.task('hello', function() { console.log('hello world'); });
gulp.task('jquerydemo', function() {
    var htmlSrc = './src/jquerydemo/*.html', //  **/*.html表示匹配foo.html,a/foo.html,a/b/foo.html,a/b/c/foo.html的文件
        htmlDst = './dist/jquerydemo';
    gulp.src(htmlSrc)
        .pipe(gulp.dest(htmlDst));
    var cssSrc = ['./src/jquerydemo/**/*.css', './src/jquerydemo/**/*.less'];
    cssDst = './dist/jquerydemo';
    gulp.src(cssSrc)
        .pipe(less())
        .pipe(minifycss())
        .pipe(gulp.dest(cssDst));
    var imageSrc = ['./src/jquerydemo/**/*.jpg', './src/jquerydemo/**/*.png', './src/jquerydemo/**/*.gif'],
        imageDst = './dist/jquerydemo';
    gulp.src(imageSrc)
        .pipe(imagemin())
        .pipe(gulp.dest(imageDst));
    var jsSrc = ['./src/jquerydemo/**/*.js'],
        jsDst = './dist/jquerydemo';
    gulp.src(jsSrc)
        // .pipe(jshint())
        // .pipe(jshint.reporter('default'))
        // .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsDst))

})
gulp.task('yasuo', function() {
    var imageSrc = ['./src/images/*.jpg', './src/images/*.png', './src/images/*.gif'],
        imageDst = './dist/images';
    gulp.src(imageSrc)
        .pipe(imagemin())
        .pipe(gulp.dest(imageDst));
});

// 实时预览实时刷新页面
gulp.task('f5', function(){
    browserSync.init({
        server: {
            baseDir: './'
        }
    });

    gulp.watch(['./**/*.html']).on('change', reload);
});