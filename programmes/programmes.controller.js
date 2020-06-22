const ProgrammesModel = require('./programmes.model');

exports.insert = (req, res) => {
    console.warn(req.body)
    ProgrammesModel.createProgramme(req.body)
        .then((result) => {
            res.status(201).send({id: result._id});
        });
};

exports.patchById = (req, res) => {
    ProgrammesModel.patchProgramme(req.params.programmeId, req.body)
        .then((result) => {
            res.status(204).send({});
        });
};

exports.list = (req, res) => {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;
    ProgrammesModel.list(limit, page)
        .then((result) => {
            res.status(200).send(result);
        })
};

exports.getById = (req, res) => {
    ProgrammesModel.getProgramme(req.params.programmeId)
        .then((result) => {
            res.status(200).send(result);
        });
};

exports.deleteById = (req, res) => {
    ProgrammesModel.deleteProgramme(req.params.programmeId)
        .then((result) => {
            res.status(200).send(result);
        });
};
