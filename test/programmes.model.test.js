const assert = require('assert');
const mongoose = require('mongoose');

const ProgrammeModel = require('../programmes/programmes.model');

const programmeFixture = {
  name: 'Academic English',
  code: 'AE',
};

describe('Programme test suite', () => {
  let programme1;
  let programme2;

  before((done) => {
    mongoose.connect('mongodb://localhost/test', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }, done);
  });

  beforeEach(() => {
    programme1 = new ProgrammeModel.Programme({
      name: 'Programme 1',
    });
    programme1.save();
    programme2 = new ProgrammeModel.Programme({
      name: 'Programme 2',
    });
    programme2.save();
  });

  afterEach(async () => {
    await ProgrammeModel.Programme.deleteMany({});
  });

  after(() => {
    delete mongoose.models.Programme;
  });

  it('can be created', async () => {
    assert.strictEqual(await ProgrammeModel.Programme.countDocuments(), 2);
    const programme = await ProgrammeModel.create(programmeFixture);
    assert.strictEqual(programme.name, 'Academic English');
    assert.strictEqual(programme.code, 'AE');
    assert(programme instanceof ProgrammeModel.Programme);
    assert.strictEqual(await ProgrammeModel.Programme.countDocuments(), 3);
  });

  it('throws a validation error on create when invalid', async () => {
    try {
      await ProgrammeModel.create({});
    } catch (err) {
      assert(err instanceof mongoose.Error.ValidationError);
      assert.strictEqual(err.toString(), 'ValidationError: name: Name is required');
    }
  });

  it('can be patched', async () => {
    assert.strictEqual(await ProgrammeModel.Programme.countDocuments(), 2);
    programme1.name = 'Programme 123';
    programme1.code = '***Wow***';
    const programme = await ProgrammeModel.update(programme1._id, programme1);
    assert.strictEqual(programme.name, 'Programme 123');
    assert.strictEqual(programme.code, '***Wow***');
    assert.strictEqual(programme.id, programme1.id);
    assert(programme instanceof ProgrammeModel.Programme);
    assert.strictEqual(await ProgrammeModel.Programme.countDocuments(), 2);
  });

  it('can be retrieved', async () => {
    const programme = await ProgrammeModel.get(programme1._id);
    assert.strictEqual(programme.name, 'Programme 1');
    assert.strictEqual(programme.id, programme1.id);
  });

  it('can be listed', async () => {
    const programmes = await ProgrammeModel.list(10, 0);
    assert.strictEqual(programmes.length, 2);
    assert(programmes[0] instanceof ProgrammeModel.Programme);
  });

  it('returns null when the programmes does not exist', async () => {
    const programme = await ProgrammeModel.get('51c35e5ced18cb901d000001');
    assert.strictEqual(programme, null);
  });

  it('can be deleted', async () => {
    await ProgrammeModel.delete(programme1.id);
    assert.strictEqual(await ProgrammeModel.Programme.countDocuments(), 1);
  });
});
