const { Bootstrap } = require('@midwayjs/bootstrap');
const { setProjectRoot } = require('@midwayjs/hooks-internal');

const { resolve } = require('path');

const baseDir = resolve(__dirname, 'dist');

setProjectRoot(baseDir);

Bootstrap.configure({
  baseDir,
  ignore: ['**/_client/**'],
})
  .run()
  .then(() => {
    console.log('Your application is running.');
  });
