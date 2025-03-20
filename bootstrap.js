const { Bootstrap } = require('@midwayjs/bootstrap');
const { resolve } = require('path');

const baseDir = resolve(__dirname, 'dist');

Bootstrap.configure({
  baseDir,
  ignore: ['**/_client/**'],
})
  .run()
  .then(() => {
    console.log('Your application is running.');
  });
