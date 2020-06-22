const assert = require('assert');
const mongoose = require('mongoose');

const dbHandler = require('./db-handler');
const ProgrammesModel = require('../programmes/programmes.model');

describe("Programme test suite", function () {
  let programme_1, programme_2;

  before(function (done) {
    mongoose.connect('mongodb://localhost/test', {
        useUnifiedTopology: true
    }, () => {
        programme_1 = new ProgrammesModel.Programme({
            name: 'Programme 1'
        });
        programme_1.save();
        programme_2 = new ProgrammesModel.Programme({
            name: 'Programme 2'
        });
        programme_2.save();
        done();
    });
  });

  after(async () => {
    await ProgrammesModel.Programme.deleteMany({})
  });

  it('can be created correctly', async () => {
    assert.equal(await ProgrammesModel.Programme.countDocuments(), 2)
    const programme = await ProgrammesModel.createProgramme(programmeComplete);
    assert.equal(programme.name, 'iPhone 11')
    assert.equal(programme.code, '699')
    assert(programme instanceof ProgrammesModel.Programme)
    assert(await ProgrammesModel.Programme.countDocuments())
  });

  it('can be retrieved correctly', async () => {
    const programme = await ProgrammesModel.getProgramme(programme_1._id)
    assert.equal(programme.name, 'Programme 1')
  });

});

/**
 * Complete programme
 */
const programmeComplete = {
    name: 'iPhone 11',
    code: '699'
};