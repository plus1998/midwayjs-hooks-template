import hooksInternal from '@midwayjs/hooks-internal';
import path from 'path';
import bootstrap from '@midwayjs/bootstrap';

const root = path.resolve('dist');
const config = hooksInternal.getConfig(root);

const config$1 = {
  config,
  static: true,
  build: {
    outDir: './',
  },
};

hooksInternal.setProjectRoot(root);
hooksInternal.setConfig(config$1);

const server = bootstrap.Bootstrap.configure({
  baseDir: root,
  ignore: ['**/_client/**'],
});

await server.run();
