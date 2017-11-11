"use strict";

import gulp from "gulp";
import browserify from "browserify";
import source from "vinyl-source-stream";


gulp.task("default", () => {
  return browserify("bin/www.js") // 어플리케이션의 시작점
    .transform("babelify")  // babel로 es6 코드를 변환
    .bundle() // 한 파일로 묶음
    .pipe(source("bundle.js"))  // 하나의 파일 생성
    .pipe(gulp.dest("dst"));  // 목적지로 파일 옮김
});
