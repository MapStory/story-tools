var ngAnnotate = require("gulp-ng-annotate");
var gulp = require("gulp");
var util = require("gulp-util");
var concat = require("gulp-concat");
var browserify = require("browserify");
var rename = require("gulp-rename");
var watchify = require("watchify");
var source = require("vinyl-source-stream");
var connect = require("gulp-connect");
var rimraf = require("gulp-rimraf");
var jshint = require("gulp-jshint");
var less = require("gulp-less");
var karma = require("karma").server;
var notifier = require("node-notifier");
var uglify = require("gulp-uglify");
var cleanCSS = require("gulp-clean-css");
var minifyHtml = require("gulp-minify-html");
var templateCache = require("gulp-angular-templatecache");
var devServer = require("./dev-server.js");
var path = require("path");
var modernizr = require("gulp-modernizr");

// internal
var watch = false;

// outputs
var coreLibsBundle = "story-tools-core.js";
var coreLibsAllBundle = "story-tools-core-all.js";
var mapstoryLibsBundle = "story-tools-mapstory.js";
var owsjsBundle = "ows.js";
var editLibsBundle = "story-tools-edit.js";
var editNgBundle = "story-tools-edit-ng.js";
var coreNgBundle = "story-tools-core-ng.js";
var coreTemplatesBundle = "story-tools-core-tpls.js";
var editTemplatesBundle = "story-tools-edit-tpls.js";
var editLess = "lib/ng/edit/style.less";
var coreLess = "lib/ng/core/style.less";

// inputs
var coreNg = "lib/ng/core/**/*.js";
var editNg = "lib/ng/edit/**/*.js";
var coreTemplates = "lib/templates/core/**/*.html";
var editTemplates = "lib/templates/edit/**/*.html";

var sources = ["lib/**/*.js"];

function notify(msg) {
  if (watch) {
    notifier.notify({
      title: "story-tools notification",
      message: msg
    });
  }
}

function doBundle(browserify, bundleName, tasks) {
  var bundle = browserify.bundle();
  bundle.on("error", function(err) {
    util.log(util.colors.red("Error:"), err.message);
    notify("browserify error " + err.toString());
  });
  var bundleStream = bundle.pipe(source(bundleName)).pipe(gulp.dest("dist"));
  bundleStream.on("end", function() {
    util.log("bundled", util.colors.cyan(bundleName));
    if (tasks) {
      gulp.start(tasks);
    }
  });
  return bundleStream;
}

function bundle(browserify, bundleName, tasks) {
  if (watch) {
    browserify = watchify(browserify);
  }
  browserify.on("update", function() {
    // if in watch mode, run the follow-up tasks when updated
    doBundle(browserify, bundleName, tasks);
  });
  return doBundle(browserify, bundleName);
}

function ngBundle(src, dest) {
  var stream = gulp
    .src(src)
    .pipe(concat(dest))
    .pipe(ngAnnotate())
    .pipe(gulp.dest("dist"));
  stream.on("end", function() {
    util.log("bundled", util.colors.cyan(dest));
  });
  return stream;
}

function templateBundle(src, dest, module) {
  var stream = gulp
    .src(src)
    .pipe(minifyHtml())
    .pipe(
      templateCache(dest, {
        standalone: true,
        module: module
      })
    )
    .pipe(gulp.dest("dist"));
  stream.on("end", function() {
    util.log("bundled", util.colors.cyan(dest));
  });
  return stream;
}

gulp.task("docs", function() {
  var shell = require("gulp-shell");
  gulp.task(
    "docs",
    shell.task([
      "node_modules/angular-jsdoc/node_modules/jsdoc/jsdoc.js " +
      "-c node_modules/angular-jsdoc/conf.json " + // config file
      "-t node_modules/angular-jsdoc/template " + // template file
      "-d dist/docs " + // output directory
      "./README.md " + // to include README.md as index contents
        "-r lib" // source code directory
    ])
  );
});

gulp.task("connect", function() {
  devServer.run();
});

gulp.task("clean", function() {
  gulp.src("dist/*", { read: false }).pipe(rimraf());
});

gulp.task("minify", ["scripts"], function() {
  function doMinify(src) {
    gulp
      .src(src)
      .pipe(uglify())
      .pipe(rename({ extname: ".min.js" }))
      .pipe(gulp.dest("dist"));
  }
  doMinify("dist/" + coreLibsBundle);
  doMinify("dist/" + owsjsBundle);
  doMinify("dist/" + mapstoryLibsBundle);
  doMinify("dist/" + editLibsBundle);
  doMinify("dist/" + coreNgBundle);
  doMinify("dist/" + editNgBundle);
  doMinify("dist/" + coreLibsAllBundle);
});

gulp.task("lint", function() {
  var lintStream = gulp
    .src(sources)
    .pipe(jshint())
    .pipe(jshint.reporter("default"))
    .pipe(jshint.reporter("fail"));
  lintStream.on("error", function() {
    notify("linting failed");
  });
  return lintStream;
});

gulp.task("bundleCoreTemplates", function() {
  return templateBundle(
    coreTemplates,
    coreTemplatesBundle,
    "storytools.core.templates"
  );
});

gulp.task("bundleEditTemplates", function() {
  return templateBundle(
    editTemplates,
    editTemplatesBundle,
    "storytools.edit.templates"
  );
});

/**
 * bundle all core libraries exposing core exports on the global object
 * storytools.core
 */
 gulp.task("bundleCoreLibs", function() {
   return bundle(
     browserify({
       insertGlobals: true,
       entries: ["./lib/core/index.js"],
       standalone: "storytools.core"
     }),
     coreLibsBundle,
     ["lint", "karma"]
   );
 });

gulp.task("bundleOwsjsLibs", function() {
  return bundle(
    browserify({
      entries: ["./lib/owsjs/index.js"],
      standalone: "owsjs"
    }),
    owsjsBundle,
    ["lint", "karma"]
  );
});

/**
 * bundle all mapstory libraries exposing mapstory exports on the global object
 * storytools.mapstory
 */
gulp.task("bundleMapstoryLibs", function() {
  return bundle(
    browserify({
      entries: ["./lib/mapstory/index.js"],
      standalone: "storytools.mapstory"
    }),
    mapstoryLibsBundle,
    ["lint", "karma"]
  );
});

/**
 * bundle all edit libraries exposing edit exports on the global object
 * storytools.edit
 */
gulp.task("bundleEditLibs", function() {
  return bundle(
    browserify({
      entries: ["./lib/edit/index.js"],
      standalone: "storytools.edit"
    }),
    editLibsBundle,
    ["lint", "karma"]
  );
});

/**
 * concat edit angular
 */
gulp.task("bundleEditNg", function() {
  ngBundle(editNg, editNgBundle);
});

/**
 * concat core angular
 */
gulp.task("bundleCoreNg", function() {
  ngBundle(coreNg, coreNgBundle);
});

/**
 * combined bundle of all vendors
 */
gulp.task("bundleVendorCore", ["bundleCoreLibs", "bundleCoreNg"], function() {
  // @todo concat both bundles
  gulp
    .src([
      "./examples/ol-debug.js",
      "./node_modules/angular/angular.min.js",
      "./node_modules/bootstrap/dist/js/bootstrap.min.js",
      "./node_modules/nouislider/distribute/nouislider.min.js",
      "./node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js",
      "./node_modules/angular-bootstrap-colorpicker/js/bootstrap-colorpicker-module.js"
    ])
    .pipe(concat("story-tools-vendor-all.js"))
    .pipe(gulp.dest("dist"));
});

/**
 * combined bundle of all core
 */
gulp.task(
  "bundleCore",
  ["bundleCoreLibs", "bundleCoreNg", "bundleOwsjsLibs"],
  function() {
    // @todo concat both bundles
    gulp
      .src([
        "./dist/story-tools-core-tpls.js",
        "./dist/story-tools-core.js",
        "./dist/story-tools-core-ng.js",
        "./dist/ows.js"
      ])
      .pipe(concat("story-tools-core-all.js"))
      .pipe(gulp.dest("dist"));
  }
);

gulp.task("minify-css", function() {
  return gulp
    .src("./dist/*-all.css")
    .pipe(
      cleanCSS({ compatibility: "ie8", debug: true }, function(details) {
        console.log(details.name + ": " + details.stats.originalSize);
        console.log(details.name + ": " + details.stats.minifiedSize);
      })
    )
    .pipe(gulp.dest("dist"));
});

/**
 * combined bundle of all core
 */
gulp.task("bundleCoreCSS", ["lessEdit", "lessCore"], function() {
  // @todo concat both bundles
  gulp
    .src([
      "./dist/story-tools-core.css",
      "./dist/story-tools-edit.css",
      "./node_modules/vis/dist/vis.min.css",
      "./node_modules/nouislider/distribute/nouislider.min.css"
    ])
    .pipe(concat("story-tools-core-all.css"))
    .pipe(gulp.dest("dist"));
});

/**
 * combined bundle of all edit
 */
gulp.task("bundleEdit", ["bundleEditLibs", "bundleEditNg"], function() {
  // @todo concat both bundles
});

gulp.task("lessEdit", function() {
  gulp
    .src(editLess)
    .pipe(
      less({
        paths: ["node_modules/bootstrap/less"]
      })
    )
    .pipe(rename("story-tools-edit.css"))
    .pipe(gulp.dest("dist"));
});

gulp.task("lessCore", function() {
  gulp
    .src(coreLess)
    .pipe(
      less({
        paths: ["node_modules/bootstrap/less"]
      })
    )
    .pipe(rename("story-tools-core.css"))
    .pipe(gulp.dest("dist"));
});

gulp.task("scripts", [
  "bundleVendorCore",
  "bundleCore",
  "bundleOwsjsLibs",
  "bundleMapstoryLibs",
  "bundleEdit",
  "lessEdit",
  "bundleCoreTemplates",
  "bundleEditTemplates",
  "bundleCoreCSS"
]);

gulp.task("testsBundle", function() {
  return doBundle(
    browserify({ entries: "./test/tests.js", debug: true, paths: ["../lib/"] }),
    "tests.js",
    ["karma"]
  );
});

gulp.task("karma", ["testsBundle"], function(done) {
  // var server = util.env['server'] ? true : false;
  // var conf = {
  //     configFile: __dirname + '/karma.conf.js',
  //     singleRun: !server
  // };
  // if (server) {
  //     conf.reporters = ['html'];
  // }
  // return karma.start(conf, function(failed) {
  //     notify(failed > 0 ? failed + ' failures' : 'passing!');
  //     if (failed > 0) {
  //         return done('Karma exited with status code ' + failed);
  //     }
  //     done();
  // });
});

gulp.task("tdd", ["test"], function() {
  watch = true;
  gulp.watch(sources, ["karma"]);
  gulp.watch("test/*", ["karma"]);
});

gulp.task("test", ["scripts", "karma"]);

gulp.task("lazy", ["clean", "lint", "lessEdit", "scripts", "bundleCore"]);

gulp.task("default", ["test", "minify"]);

gulp.task("develop", ["connect", "watch", "minify", "test"]);

gulp.task("build", ["scripts", "minify"]);

gulp.task(
  "watch",
  function() {
    // enable watch mode and start watchify tasks
    watch = true;
    gulp.start("scripts");
    gulp.watch(sources, ["scripts"]);
    gulp.watch(coreTemplates, ["bundleCoreTemplates"]);
    gulp.watch(editTemplates, ["bundleEditTemplates"]);
    gulp.watch("lib/ng/**/*.less", ["lessEdit"]);
    // reload on changes to bundles but ignore tests bundle
    gulp.watch(["dist/*", "examples/**/*"]).on("change", function(f) {
      gulp.src([f.path, "!**/tests.js"]).pipe(connect.reload());
    });
  }
);

/* V2 Related */

gulp.task("less", function() {
  return gulp
    .src("./examples/v2/style/less/test.less")
    .pipe(
      less({
        paths: [path.join(__dirname, "less", "includes")]
      })
    )
    .pipe(gulp.dest("./examples/v2/style/css"));
});

gulp.task("modernizr", function() {
  gulp
    .src("./examples/v2/js/*.js")
    .pipe(modernizr())
    .pipe(gulp.dest("dist/"));
});
