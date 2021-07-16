import { Router, Handler } from "express";

export interface IExpressApiVersioner {
  router: Router;
  currentVersion?: string;
  versions: string[];
  version: (v: string) => IExpressApiVersioner;
  addVersion: (version: string) => void;
  all: (endpoint: string, handler: Handler) => IExpressApiVersioner;
  get: (endpoint: string, handler: Handler) => IExpressApiVersioner;
  post: (endpoint: string, handler: Handler) => IExpressApiVersioner;
  put: (endpoint: string, handler: Handler) => IExpressApiVersioner;
  delete: (endpoint: string, handler: Handler) => IExpressApiVersioner;
  patch: (endpoint: string, handler: Handler) => IExpressApiVersioner;
  head: (endpoint: string, handler: Handler) => IExpressApiVersioner;
  options: (endpoint: string, handler: Handler) => IExpressApiVersioner;
}

export default function ExpressApiVersioner(router: Router, logger = console) {
  const versioner: IExpressApiVersioner = {
    router,
    currentVersion: "",
    addVersion: (v: string) => {
      if (!versioner.versions.includes(v)) {
        versioner.versions.push(v);
      } else {
        logger.warn(`Version ${v} already added.`);
      }
    },
    version: (v: string) => {
      if (versioner.versions.includes(v)) {
        versioner.currentVersion = v;
      } else {
        logger.warn(
          `Version ${v} is not expected from Versioner. Versions expected are: ${versioner.versions}`
        );
      }

      return versioner;
    },
    versions: [],
    all: (endpoint: string, handler: Handler) => {
      versioner.router.all(`/${versioner.currentVersion}${endpoint}`, handler);
      return versioner;
    },
    get: (endpoint: string, handler: Handler) => {
      versioner.router.get(`/${versioner.currentVersion}${endpoint}`, handler);
      return versioner;
    },
    post: (endpoint: string, handler: Handler) => {
      versioner.router.post(`/${versioner.currentVersion}${endpoint}`, handler);
      return versioner;
    },
    put: (endpoint: string, handler: Handler) => {
      versioner.router.put(`/${versioner.currentVersion}${endpoint}`, handler);
      return versioner;
    },
    delete: (endpoint: string, handler: Handler) => {
      versioner.router.delete(
        `/${versioner.currentVersion}${endpoint}`,
        handler
      );
      return versioner;
    },
    patch: (endpoint: string, handler: Handler) => {
      versioner.router.patch(
        `/${versioner.currentVersion}${endpoint}`,
        handler
      );
      return versioner;
    },
    head: (endpoint: string, handler: Handler) => {
      versioner.router.head(`/${versioner.currentVersion}${endpoint}`, handler);
      return versioner;
    },
    options: (endpoint: string, handler: Handler) => {
      versioner.router.options(
        `/${versioner.currentVersion}${endpoint}`,
        handler
      );
      return versioner;
    },
  };

  return versioner;
}
