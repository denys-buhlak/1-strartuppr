// Project: PROJECT-NAME

const inputDir = 'src';

const outputDir = 'dist';

// Export Configs
module.exports = {
  isDevelopment: !process.env.NODE_ENV || process.env.NODE_ENV === 'development',

  // new-task
  newtask: {
    src: 'gulpfile.js/utils/newTaskTemplate.js',
    outputName: '___TASK-TEMPLATE.js',
    dest: 'gulpfile.js/tasks/',
  },
  // clean
  clean: {
    src: outputDir,
    opts: { read: false },
  },
  // html
  html: {
    dest: outputDir,
    src: inputDir + '/html/*.html',
    watch: inputDir + '/html/**/*.html',
    opts: {
      collapseWhitespace: true,
      removeComments: true,
    },
  },
  // sass
  sass: {
    src: inputDir + '/scss/style.{scss,sass}',
    dest: outputDir,
    watch: inputDir + '/scss/**/*.{scss,sass}',
    opts: {},
  },
  // replace
  replace: {
    fonts: {
      string: '../../',
      replacement: '',
    },
    images: {
      string: '../../',
      replacement: '',
    },
  },
  // autoprefixer
  autoprefixer: {
    // opts: { browsers: 'last 1 versions' }
    opts: {
      overrideBrowserslist: ['last 2 version', '> 1%', 'IE 10'],
      cascade: false,
    },
  },
  // lipematCssMqpacker
  lipematCssMqpacker: {
    opts: { sort: true },
  },
  // cssnano
  cssnano: {
    opts: { preset: 'default' },
  },
  // browsersync
  browsersync: {
    opts: {
      server: outputDir,
      port: 9999,
      tunnel: true,
      browser: ['Firefox'],
      notify: true,
    },
    watch: outputDir + '/**/*.*',
  },
  // fonts
  fonts: {
    exc: '!' + inputDir + '/fonts/**/_-*/*.*',
    src: inputDir + '/fonts/**/*.{eot,svg,ttf,woff,woff2}',
    dest: outputDir + '/fonts/',
    watch: inputDir + '/fonts/**/*.*',
    opts: { read: false },
  },
  // images
  images: {
    exc: '!' + inputDir + '/images/**/_-*/*.*',
    src: inputDir + '/images/**/*.*',
    dest: outputDir + '/images/',
    watch: inputDir + '/images/**/*.*',
    opts: {
      png: {
        quality: [0.4, 0.8],
      },
      jpg: {
        quality: 'low',
      },
      svg: {
        //
      },
      webp: {
        quality: 30,
      },
    },
  },
  // js
  js: {
    src: inputDir + '/js/main.js',
    dest: outputDir + '/js',
    opts: {},
    watch: [inputDir + '/js/**/*.js'],
  },
  // gh-pages
  deploy: {
    dest: outputDir,
    opts: {
      // branch: 'gh-pages',
      message: 'Update at: ' + new Date().toUTCString(),
    },
  },
};
