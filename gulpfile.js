/**
 * 组件安装
 * npm install gulp-util gulp-imagemin gulp-less gulp-minify-css gulp-jshint gulp-uglify gulp-rename gulp-concat gulp-clean  --save-dev
 */


// 引入 gulp及组件
var gulp    = require('gulp'),                 //基础库
    imagemin = require('gulp-imagemin'),       //图片压缩
    less = require('gulp-less'),               //less
    minifycss = require('gulp-minify-css'),    //css压缩
    jshint = require('gulp-jshint'),           //js检查
    uglify  = require('gulp-uglify'),          //js压缩
    rename = require('gulp-rename'),           //重命名
    concat  = require('gulp-concat'), 		   //合并文件
        
    clean = require('gulp-clean');             //清空文件夹

// html处理
gulp.task('html',function(){
	var htmlSrc='./src/**/*.html',//  **/*.html表示匹配foo.html,a/foo.html,a/b/foo.html,a/b/c/foo.html的文件
	 htmlDst='./dist/';
	gulp.src(htmlSrc)
	.pipe(gulp.dest(htmlDst));
});
//样式处理
gulp.task('css',function(){
	var cssSrc=['./src/**/*.css','./src/**/*.less'];
	cssDst='./dist/';
	gulp.src(cssSrc)
	.pipe(less())
	.pipe(minifycss())
	.pipe(gulp.dest(cssDst));
});
// 图片压缩
gulp.task('image',function(){
	var imageSrc=['./src/**/*.jpg','./src/**/*.png','./src/**/*.gif'],
	imageDst='./dist/';
	gulp.src(imageSrc)
	.pipe(imagemin())
	.pipe(gulp.dest(imageDst));
});
// js处理
gulp.task('js',function(){
	var jsSrc=['./src/**/*.js'],
	jsDst='./dist/';
	gulp.src(jsSrc)
        // .pipe(jshint())
        // .pipe(jshint.reporter('default'))
        // .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest(jsDst))
});

// 默认gulp
gulp.task('default',function(){
    gulp.start('html','css','image','js');
});
// 清空dist文件夹下所有文件
gulp.task('clean', function() {
	// 清空图片、样式、js 字体
    // gulp.src(['./dist/css', './dist/js', './dist/images','dist/font'], {read: false})
    gulp.src(['./dist/*'], {read: false})
        .pipe(clean());
});
gulp.task('watch',function(){
        // 监听html
        gulp.watch('./src/**/*.html', function(event){
            gulp.run('html');
        })

        // 监听css
        gulp.watch('./src/**/*.css', function(){
            gulp.run('css');
        });

        // 监听images
        gulp.watch('./src/**/*.jpg', function(){
            gulp.run('images');
        });

        // 监听js
        gulp.watch('./src/**/*.js', function(){
            gulp.run('js');
        });

});
 gulp.task('hello', function() { console.log('hello world'); });