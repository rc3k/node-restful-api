const ProgrammesController = require('./programmes.controller');

exports.routesConfig = (app) => {
  app.get('/programmes', [
    ProgrammesController.list,
  ]);
  app.post('/programmes', [
    ProgrammesController.create,
  ]);
  app.patch('/programmes/:programmeId', [
    ProgrammesController.update,
  ]);
  app.get('/programmes/:programmeId', [
    ProgrammesController.get,
  ]);
  app.delete('/programmes/:programmeId', [
    ProgrammesController.delete,
  ]);
};
