const { mongoose } = require('../mongoose.service');

const { Schema } = mongoose;

const programmeSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  code: String,
});

function convertId() {
  return this._id.toHexString();
}

programmeSchema.virtual('id').get(convertId);

programmeSchema.set('toJSON', {
  virtuals: true,
});

const Programme = mongoose.model('Programme', programmeSchema);

exports.Programme = Programme;

exports.create = async (programmeData) => {
  const programme = new Programme(programmeData);
  return programme.save();
};

exports.update = async (id, programmeData) => {
  const programme = await Programme.findById(id);
  Object.entries(programmeData).forEach(([key, value]) => {
    programme[key] = value;
  });
  return programme.save();
};

exports.list = async (perPage, page) => Programme.find()
  .limit(perPage)
  .skip(perPage * page);

exports.get = async (id) => Programme.findById(id);

exports.delete = async (id) => Programme.deleteOne({ _id: id });
