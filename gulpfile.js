const gulp = require('gulp');
const install = require('gulp-install');
const rename = require('gulp-rename');
const merge = require('merge-stream');

const PROD_DEST = './build';

gulp.task('prod', function () {
    const streams = []
    streams.push(gulp.src(['./package.json'])
        .pipe(gulp.dest(PROD_DEST))
        .pipe(install({
            args: ['--only=production']
        })))
    streams.push(gulp.src(['./env/production.env'])
        .pipe(rename('.env'))
        .pipe(gulp.dest(PROD_DEST))
        .pipe(install({
            args: ['--only=production']
        })))
    return merge(streams);
});

gulp.task('docker', function () {
    const streams = []
    streams.push(gulp.src(['./package.json'])
        .pipe(gulp.dest(PROD_DEST))
        .pipe(install({
            args: ['--only=production']
        })))
    streams.push(gulp.src(['./env/docker.env'])
        .pipe(rename('.env'))
        .pipe(gulp.dest(PROD_DEST))
        .pipe(install({
            args: ['--only=production']
        })))
    return merge(streams);
});