const ProgrammesController = require('./programmes.controller');

exports.routesConfig = function (app) {
    app.get('/programmes', [
       ProgrammesController.list
    ]);
    app.post('/programmes', [
       ProgrammesController.insert
    ]);
    app.patch('/programmes/:programmeId', [
        ProgrammesController.patchById
    ]);
    app.get('/programmes/:programmeId', [
        ProgrammesController.getById
    ]);
    app.delete('/programmes/:programmeId', [
        ProgrammesController.deleteById
    ]);
}
