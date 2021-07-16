import { Handler, Router } from "express";
import ExpressApiVersioner from "../../src/express-api-versioner";

describe("Versioner tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Setup and Validation", () => {
    it("should successfully return an instanced Versioner", () => {
      const versioner = ExpressApiVersioner(Router());

      expect(versioner).toBeDefined();
      expect(versioner.currentVersion).toBe("");
      expect(Object.keys(versioner).sort()).toStrictEqual(
        [
          "router",
          "currentVersion",
          "versions",
          "version",
          "addVersion",
          "all",
          "get",
          "post",
          "put",
          "delete",
          "patch",
          "head",
          "options",
        ].sort()
      );
    });

    it("should set the currentVersion of the versioner", () => {
      const versioner = ExpressApiVersioner(Router());
      versioner.addVersion("v1");
      versioner.version("v1");

      expect(versioner.currentVersion).toBe("v1");
      expect(versioner.versions[0]).toBe("v1");
    });

    it("should warn if version is already added", () => {
      const logMock = {
        warn: jest.fn(),
      } as unknown as Console;
      const versioner = ExpressApiVersioner(Router(), logMock);
      versioner.addVersion("v1");
      versioner.addVersion("v1");

      expect(logMock.warn).toBeCalledTimes(1);
    });

    it("should warn if version does not exist", () => {
      const logMock = {
        warn: jest.fn(),
      } as unknown as Console;
      const versioner = ExpressApiVersioner(Router(), logMock);
      versioner.version("v1");

      expect(logMock.warn).toBeCalledTimes(1);
    });
  });

  describe("Express Router integration", () => {
    it(`should pass the versioned endpoint when calling GET`, () => {
      const routerMock = {
        get: jest.fn(),
      } as unknown as Router;

      const handlerMock = jest.fn() as unknown as Handler;

      const versioner = ExpressApiVersioner(routerMock);
      versioner.addVersion("v1");
      versioner.version("v1").get("/test", handlerMock);

      expect(routerMock.get).toBeCalledTimes(1);
      expect(routerMock.get).toBeCalledWith("/v1/test", handlerMock);
    });

    it(`should pass the versioned endpoint when calling POST`, () => {
      const routerMock = {
        post: jest.fn(),
      } as unknown as Router;

      const handlerMock = jest.fn() as unknown as Handler;

      const versioner = ExpressApiVersioner(routerMock);
      versioner.addVersion("v1");
      versioner.version("v1").post("/test", handlerMock);

      expect(routerMock.post).toBeCalledTimes(1);
      expect(routerMock.post).toBeCalledWith("/v1/test", handlerMock);
    });

    it(`should pass the versioned endpoint when calling ALL`, () => {
      const routerMock = {
        all: jest.fn(),
      } as unknown as Router;

      const handlerMock = jest.fn() as unknown as Handler;

      const versioner = ExpressApiVersioner(routerMock);
      versioner.addVersion("v1");
      versioner.version("v1").all("/test", handlerMock);

      expect(routerMock.all).toBeCalledTimes(1);
      expect(routerMock.all).toBeCalledWith("/v1/test", handlerMock);
    });

    it(`should pass the versioned endpoint when calling PUT`, () => {
      const routerMock = {
        put: jest.fn(),
      } as unknown as Router;

      const handlerMock = jest.fn() as unknown as Handler;

      const versioner = ExpressApiVersioner(routerMock);
      versioner.addVersion("v1");
      versioner.version("v1").put("/test", handlerMock);

      expect(routerMock.put).toBeCalledTimes(1);
      expect(routerMock.put).toBeCalledWith("/v1/test", handlerMock);
    });

    it(`should pass the versioned endpoint when calling DELETE`, () => {
      const routerMock = {
        delete: jest.fn(),
      } as unknown as Router;

      const handlerMock = jest.fn() as unknown as Handler;

      const versioner = ExpressApiVersioner(routerMock);
      versioner.addVersion("v1");
      versioner.version("v1").delete("/test", handlerMock);

      expect(routerMock.delete).toBeCalledTimes(1);
      expect(routerMock.delete).toBeCalledWith("/v1/test", handlerMock);
    });

    it(`should pass the versioned endpoint when calling PATCH`, () => {
      const routerMock = {
        patch: jest.fn(),
      } as unknown as Router;

      const handlerMock = jest.fn() as unknown as Handler;

      const versioner = ExpressApiVersioner(routerMock);
      versioner.addVersion("v1");
      versioner.version("v1").patch("/test", handlerMock);

      expect(routerMock.patch).toBeCalledTimes(1);
      expect(routerMock.patch).toBeCalledWith("/v1/test", handlerMock);
    });

    it(`should pass the versioned endpoint when calling HEAD`, () => {
      const routerMock = {
        head: jest.fn(),
      } as unknown as Router;

      const handlerMock = jest.fn() as unknown as Handler;

      const versioner = ExpressApiVersioner(routerMock);
      versioner.addVersion("v1");
      versioner.version("v1").head("/test", handlerMock);

      expect(routerMock.head).toBeCalledTimes(1);
      expect(routerMock.head).toBeCalledWith("/v1/test", handlerMock);
    });

    it(`should pass the versioned endpoint when calling OPTIONS`, () => {
      const routerMock = {
        options: jest.fn(),
      } as unknown as Router;

      const handlerMock = jest.fn() as unknown as Handler;

      const versioner = ExpressApiVersioner(routerMock);
      versioner.addVersion("v1");
      versioner.version("v1").options("/test", handlerMock);

      expect(routerMock.options).toBeCalledTimes(1);
      expect(routerMock.options).toBeCalledWith("/v1/test", handlerMock);
    });
  });

  describe("Express Router chaining", () => {
    it("should successfully chain more than one route per version", () => {
      const routerMock = {
        get: jest.fn(),
        post: jest.fn(),
      } as unknown as Router;

      const getHandlerMock = jest.fn() as unknown as Handler;
      const postHandlerMock = jest.fn() as unknown as Handler;

      const versioner = ExpressApiVersioner(routerMock);
      versioner.addVersion("v1");
      versioner
        .version("v1")
        .get("/test1", getHandlerMock)
        .post("/test2", postHandlerMock);

      expect(routerMock.get).toBeCalledTimes(1);
      expect(routerMock.post).toBeCalledTimes(1);
      expect(routerMock.get).toBeCalledWith("/v1/test1", getHandlerMock);
      expect(routerMock.post).toBeCalledWith("/v1/test2", postHandlerMock);
    });
  });
});
