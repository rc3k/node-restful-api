const ProgrammesController = require('./programmes.controller');

exports.routesConfig = (app) => {
  app.get('/programmes', [
    ProgrammesController.list,
  ]);
  app.post('/programmes', [
    ProgrammesController.create,
  ]);
  app.patch('/programmes/:id', [
    ProgrammesController.update,
  ]);
  app.get('/programmes/:id', [
    ProgrammesController.get,
  ]);
  app.delete('/programmes/:id', [
    ProgrammesController.delete,
  ]);
};
