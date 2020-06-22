const mongoose = require('../mongoose.service').mongoose;
const Schema = mongoose.Schema;

const programmeSchema = new Schema({
   name: String,
   code: String
});

programmeSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

programmeSchema.set('toJSON', {
    virtuals: true
});

Programme = mongoose.model('Programme', programmeSchema);

exports.Programme = Programme;

exports.createProgramme = async (programmeData) => {
    const programme = new Programme(programmeData);
    return await programme.save();
};

exports.patchProgramme = async (id, programmeData) => {
    try {
        programme = await Programme.findById(id);
        for (let i in programmeData) {
            programme[i] = programmeData[i];
        }
        await programme.save();
    } catch (err) {
        return err;
    }
};

exports.list = async (perPage, page) => {
    try {
        return await Programme.find()
        .limit(perPage)
        .skip(perPage * page)
        .exec()
    } catch (err) {
        return err;
    }
};

exports.getProgramme = async (id) => {
    try {
        const programme = await Programme.findById(id)
        return programme;
    } catch (err) {
        return err;
    }
}

exports.deleteProgramme = async (id) => {
    try {
        return await Programme.deleteOne({_id: id});
    } catch (err) {
        return err;
    }
}
