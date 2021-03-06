require('dotenv').config();
const serverless = require('serverless-http');
const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();

// const AuthorizationRouter = require('./authorization/routes.config');
const ProgrammesRouter = require('./programmes/routes.config');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Expose-Headers', 'Content-Length');
  res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
  if (req.method === 'OPTIONS') {
    return res.send(200);
  }
  return next();
});

app.use(bodyParser.json());
// AuthorizationRouter.routesConfig(app);
ProgrammesRouter.routesConfig(app);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(process.env.PORT, () => {
  console.log('app listening at port %s', process.env.PORT); // eslint-disable-line no-console
});
module.exports.handler = serverless(app, {
  callbackWaitsForEmptyEventLoop: false,
});
