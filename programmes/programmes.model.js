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

const Programme = mongoose.model('Programme', programmeSchema);

exports.createProgramme = (programmeData) => {
    const programme = new Programme(programmeData);
    return programme.save();
};

exports.patchProgramme = (id, programmeData) => {
    return new Promise((resolve, reject) => {
        Programme.findById(id, function (err, programme) {
            if (err) reject(err);
            for (let i in programmeData) {
                programme[i] = programmeData[i];
            }
            programme.save(function (err, updatedProgramme) {
                if (err) return reject(err);
                resolve(updatedProgramme);
            });
        });
    })
};

exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        Programme.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, programmes) {
                if (err) {
                    reject(err);
                } else {
                    resolve(programmes);
                }
            })
    });
};

exports.getProgramme = (id) => {
    return new Promise((resolve, reject) => {
        Programme.findById(id, function (err, programme) {
            if (err) reject(err);
            resolve(programme);
            });
    });
}

exports.deleteProgramme = (id) => {
    return new Promise((resolve, reject) => {
        Programme.remove({_id: id}, function (err, programme) {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
}
