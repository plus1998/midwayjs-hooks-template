import '@midwayjs/core';

declare module '@midwayjs/core' {
  interface Context {
    user?: {
        _id: string;
        role: string;
    };
  }
}