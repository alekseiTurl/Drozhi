const { src, dest, series, watch } = require("gulp");
const concat = require("gulp-concat");
const htmlMin = require("gulp-htmlmin");
const rename = require("gulp-rename");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const svgSprite = require("gulp-svg-sprite");
const ttf2woff = require("gulp-ttf2woff");
const ttf2woff2 = require("gulp-ttf2woff2");
const imagemin = require("gulp-imagemin");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify-es").default;
const notify = require("gulp-notify");
const sourcemaps = require("gulp-sourcemaps");
const webpack = require("webpack");
const webpackStream = require("webpack-stream");
const del = require("del");
const browserSync = require("browser-sync").create();

const clean = () => {
  return del(["dist"]);
};

const resources = () => {
  return src("src/resources/**").pipe(dest("dist/resources"));
};

const fonts = () => {
  src("src/fonts/**.ttf").pipe(ttf2woff()).pipe(dest("dist/fonts/"));
  return src("src/fonts/**.ttf").pipe(ttf2woff2()).pipe(dest("dist/fonts/"));
};

const styles = () => {
  return src("./src/styles/styles.scss")
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        outputStyle: "expanded",
      }).on("error", notify.onError())
    )
    .pipe(
      rename({
        suffix: ".min",
      })
    )
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(
      cleanCSS({
        level: 2,
      })
    )
    .pipe(sourcemaps.write("."))
    .pipe(dest("./dist/css/"))
    .pipe(browserSync.stream());
};

// const styles = () => {
//     return src('src/styles/**/*.css')
//     .pipe(sourcemaps.init())
//     .pipe(concat('main.css'))
//     .pipe(autoprefixer({
//         cascade: false,
//     }))
//     .pipe(sourcemaps.write('.'))
//     .pipe(dest('dist'))
//     .pipe(browserSync.stream())
// }

const html = () => {
  return src("src/**/*.html").pipe(dest("dist")).pipe(browserSync.stream());
};

const images = () => {
  return src([
    "src/images/**.jpg",
    "src/images/**.png",
    "src/images/**.jpeg",
    "src/images/*.svg",
    "src/images/**.ico",
    
  ])
    .pipe(imagemin())
    .pipe(dest("dist/img"))
    .pipe(browserSync.stream());
};

const imgToApp = () => {
  return src([
    "src/images/**.jpg",
    "src/images/**.png",
    "src/images/**.svg",
    "src/images/**.jpeg",
     "src/images/**.ico",
  ]).pipe(dest("dist/img"));
};

const svgSprites = () => {
  return src("src/images/**/*.svg")
    .pipe(
      svgSprite({
        mode: {
          stack: {
            sprite: "../sprite.svg",
          },
        },
      })
    )
    .pipe(dest("dist/img"));
};

const scripts = () => {
  return src(["src/js/components/**/*.js", "src/js/main.js"])
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(concat("app.js"))
    .pipe(uglify().on("error", notify.onError()))
    .pipe(sourcemaps.write("."))
    .pipe(dest("dist"))
    .pipe(browserSync.stream());
};

const script = () => {
  return src("src/js/main.js")
    .pipe(
      webpackStream({
        mode: "development",
        output: {
          filename: "main.js",
        },
        module: {
          rules: [
            {
              test: /\.m?js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: "babel-loader",
                options: {
                  presets: ["@babel/preset-env"],
                },
              },
            },
          ],
        },
      })
    )
    .on("error", function (err) {
      console.error("WEBPACK ERROR", err);
      this.emit("end");
    })

    .pipe(sourcemaps.init())
    .pipe(uglify().on("error", notify.onError()))
    .pipe(sourcemaps.write("."))
    .pipe(dest("dist"))
    .pipe(browserSync.stream());
};

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: "dist",
    },
  });
};

watch("src/**/*.html", html);
watch("src/styles/**/*.scss", styles);
watch("src/images/**.jpg", imgToApp);
watch("src/images/**.png", imgToApp);
watch("src/images/**.jpeg", imgToApp);
watch("src/images/**/*.svg", svgSprites);
watch("src/fonts/**.ttf", fonts);
watch("src/js/**/*.js", scripts);
watch("src/js/**/*.js", script);
watch("src/resources/**", resources);

exports.svgSprites = svgSprites;
exports.styles = styles;
exports.scripts = scripts;
exports.default = series(
  clean,
  html,
  fonts,
  script,
  styles,
  resources,
  imgToApp,
  svgSprites,
  watchFiles
);

const cleanBuild = () => {
  return del(["build"]);
};



const stylesBuild = () => {
  return src("src/styles/**/*.css")
    .pipe(concat("main.css"))
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(
      cleanCSS({
        level: 2,
      })
    )
    .pipe(dest("build"));
};

const htmlBuild = () => {
  return src("src/**/*.html")
    .pipe(
      htmlMin({
        collapseWhitespace: true,
      })
    )
    .pipe(dest("build"));
};

const scriptsBuild = () => {
  return src(["src/js/components/**/*.js", "src/js/main.js"])
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(concat("app.js"))
    .pipe(uglify().on("error", notify.onError()))
    .pipe(dest("build"));
};

const scriptBuild = () => {
  return src("src/js/main.js")
    .pipe(
      webpackStream({
        mode: "development",
        output: {
          filename: "main.js",
        },
        module: {
          rules: [
            {
              test: /\.m?js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: "babel-loader",
                options: {
                  presets: ["@babel/preset-env"],
                },
              },
            },
          ],
        },
      })
    )
    .on("error", function (err) {
      console.error("WEBPACK ERROR", err);
      this.emit("end");
    })
    .pipe(uglify().on("error", notify.onError()))
    .pipe(dest("build"));
};

exports.build = series(
  cleanBuild,
  htmlBuild,
  fonts,
  scriptBuild,
  stylesBuild,
  resources,
  images,
  svgSprites,
  watchFiles
);