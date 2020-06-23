const sinon = require('sinon');
const { mockRequest, mockResponse } = require('mock-req-res');
const { Error } = require('mongoose');

const ProgrammeController = require('../programmes/programmes.controller');
const ProgrammeModel = require('../programmes/programmes.model');

describe('Programme controller test suite', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('returns the correct response on create', async () => {
    const promise = new Promise((resolve) => {
      resolve(
        {
          id: '123',
        },
      );
    });
    sandbox.stub(ProgrammeModel, 'create').returns(promise);
    const req = mockRequest({
      body: 'Hi!',
    });
    const res = mockResponse();
    await ProgrammeController.create(req, res);
    sinon.assert.calledOnce(ProgrammeModel.create);
    sinon.assert.calledWith(ProgrammeModel.create, 'Hi!');
    sinon.assert.calledWith(res.status, 201);
    sinon.assert.calledWith(res.send, { id: '123' });
  });

  it('returns a 400 error when validation fails', async () => {
    const validationError = new Error.ValidationError();
    validationError.addError('name', 'A bad name');
    sandbox.stub(ProgrammeModel, 'create').throws(validationError);
    const req = mockRequest();
    const res = mockResponse();
    await ProgrammeController.create(req, res);
    sinon.assert.calledWith(res.status, 400);
    sinon.assert.calledWith(res.send, { name: 'A bad name' });
  });

  it('returns a 500 error when something else fails', async () => {
    const generalError = new Error('Whoops!');
    sandbox.stub(ProgrammeModel, 'create').throws(generalError);
    const req = mockRequest();
    const res = mockResponse();
    await ProgrammeController.create(req, res);
    sinon.assert.calledWith(res.status, 500);
    sinon.assert.calledWith(res.send, 'Whoops!');
  });

  it('returns the correct response on update', async () => {
    const promise = new Promise((resolve) => {
      resolve(
        {
          id: 'banana',
        },
      );
    });
    sandbox.stub(ProgrammeModel, 'update').returns(promise);
    const req = mockRequest({
      body: 'Hi!',
      params: {
        id: 123,
      },
    });
    const res = mockResponse();
    await ProgrammeController.update(req, res);
    sinon.assert.calledOnce(ProgrammeModel.update);
    sinon.assert.calledWith(ProgrammeModel.update, 123, 'Hi!');
    sinon.assert.calledWith(res.status, 204);
    sinon.assert.calledWith(res.send, { id: 'banana' });
  });

  it('returns a 400 error when validation fails', async () => {
    const validationError = new Error.ValidationError();
    validationError.addError('code', 'A bad code');
    sandbox.stub(ProgrammeModel, 'update').throws(validationError);
    const req = mockRequest();
    const res = mockResponse();
    await ProgrammeController.update(req, res);
    sinon.assert.calledWith(res.status, 400);
    sinon.assert.calledWith(res.send, { code: 'A bad code' });
  });

  it('returns a 500 error when something else fails', async () => {
    const generalError = new Error('Whoops!');
    sandbox.stub(ProgrammeModel, 'update').throws(generalError);
    const req = mockRequest();
    const res = mockResponse();
    await ProgrammeController.update(req, res);
    sinon.assert.calledWith(res.status, 500);
    sinon.assert.calledWith(res.send, 'Whoops!');
  });

  it('returns the correct response on list', async () => {
    const promise = new Promise((resolve) => {
      resolve([1, 2, 3]);
    });
    sandbox.stub(ProgrammeModel, 'list').returns(promise);
    const req = mockRequest({});
    const res = mockResponse();
    await ProgrammeController.list(req, res);
    sinon.assert.calledOnce(ProgrammeModel.list);
    sinon.assert.calledWith(ProgrammeModel.list, 10, 0);
    sinon.assert.calledWith(res.status, 200);
    sinon.assert.calledWith(res.send, [1, 2, 3]);
  });

  it('returns the correct response on get', async () => {
    const promise = new Promise((resolve) => {
      resolve('My programme');
    });
    sandbox.stub(ProgrammeModel, 'get').returns(promise);
    const req = mockRequest({
      params: {
        id: 123,
      },
    });
    const res = mockResponse();
    await ProgrammeController.get(req, res);
    sinon.assert.calledOnce(ProgrammeModel.get);
    sinon.assert.calledWith(ProgrammeModel.get, 123);
    sinon.assert.calledWith(res.status, 200);
    sinon.assert.calledWith(res.send, 'My programme');
  });

  it('returns a 404 on get when the programme does not exist', async () => {
    const promise = new Promise((resolve) => {
      resolve(null);
    });
    sandbox.stub(ProgrammeModel, 'get').returns(promise);
    const req = mockRequest({
      params: {
        id: 123,
      },
    });
    const res = mockResponse();
    await ProgrammeController.get(req, res);
    sinon.assert.calledOnce(ProgrammeModel.get);
    sinon.assert.calledWith(ProgrammeModel.get, 123);
    sinon.assert.calledWith(res.status, 404);
    sinon.assert.calledWith(res.send, null);
  });

  it('returns the correct response on delete', async () => {
    const promise = new Promise((resolve) => {
      resolve('My programme');
    });
    sandbox.stub(ProgrammeModel, 'delete').returns(promise);
    const req = mockRequest({
      params: {
        id: 123,
      },
    });
    const res = mockResponse();
    await ProgrammeController.delete(req, res);
    sinon.assert.calledOnce(ProgrammeModel.delete);
    sinon.assert.calledWith(ProgrammeModel.delete, 123);
    sinon.assert.calledWith(res.status, 200);
    sinon.assert.calledWith(res.send, null);
  });
});
