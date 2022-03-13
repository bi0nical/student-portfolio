const { src, dest, watch } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const minify = require("gulp-minify");
const htmlBeautify = require("gulp-html-beautify");
const jsBeautify = require("gulp-js-beautify");

//
function generateCSS(cb) {
    src("./sass/**/*.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(dest("css"));
    cb();
}

exports.css = generateCSS

//
function minifyJS(){
    return src("./js/script.js", { allowEmpty: true })
        .pipe(minify({noSource: true}))
        .pipe(dest('./js'))
}

exports.minify = minifyJS

//
function runHtmlBeautify(){
    return src("./*.html", {allowEmpty:true})
        .pipe(htmlBeautify())
        .pipe(dest("./"))
}

exports.htmlBeautify = runHtmlBeautify

//
function runJsBeautify(){
    return src("./js/*.js")
        .pipe(jsBeautify())
        .pipe(dest("./js/"))
}

exports.jsBeautify = runJsBeautify

//
function watchFiles(){
	watch("./sass/**/*.scss", generateCSS)
    watch("./js/script.js", minifyJS)
    watch("./*.html", runHtmlBeautify)
    watch("./js/*.js", runJsBeautify)
}

exports.watch = watchFiles