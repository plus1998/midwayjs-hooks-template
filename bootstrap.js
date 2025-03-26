import { setProjectRoot, setConfig, getConfig } from '@midwayjs/hooks-internal';
import path from 'path';
import bootstrap from '@midwayjs/bootstrap';

const root = path.resolve('dist');
const config = getConfig(root);

const config$1 = {
  config,
  static: true,
  build: {
    outDir: './',
  },
};

setProjectRoot(root);
setConfig(config$1);

const server = bootstrap.Bootstrap.configure({
  baseDir: root,
  ignore: ['**/_client/**'],
});

await server.run();
