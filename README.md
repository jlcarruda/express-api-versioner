# express-api-versioner
A module for explicit route URI versioning, following the [RestfulAPI](https://restfulapi.net/versioning/) standard.

It can be used to facilitate the change of API versions without the need to create file structures. The versioning is done by wrapping the `Router` from the `express` module.

## Dependencies
- Express

## How to use

```javascript
const express = require('express')
const VersionedRouter = require('express-api-versioner')

const app = express()
const router = express.Router()

router.use(/* put any previous middlewares */)

// The module exports a function that accepts the Router
const versioner = VersionedRouter(router)

// Add a version for the module
versioner.addVersion('v1')

versioner.version('v1').get('/test', (req, res, next) => {}) // GET /v1/test
```

## Chaining Routes and Versions
You can chain the methods in one version if you prefer.
```javascript
versioner.version('v1')
  .get('/middleware/1', (req, res, next) => {}) // GET /v1/middleware/1
  .post('/test', (req, res, next) => {}) // POST /v1/test
  .put('/mid/test/2', (req, res, next) => {}) // PUT /v1/mid/test/2
```

You can too chain versions of the API

```javascript
versioner
  .version('v1')
    .get('/middleware/1', (req, res, next) => {}) // GET /v1/middleware/1
    .post('/test', (req, res, next) => {}) // POST /v1/test
    .put('/mid/test/2', (req, res, next) => {}) // PUT /v1/mid/test/2
  .version('v2')
    .get('/middleware/1', (req, res, next) => {}) // GET /v2/middleware/1
    .post('/test', (req, res, next) => {}) // POST /v2/test
    .put('/mid/test/2', (req, res, next) => {}) // PUT /v2/mid/test/2

```
# LICENSE
## [MIT](./LICENSE)

