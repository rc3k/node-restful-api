const { Error } = require('mongoose');
const ProgrammeModel = require('./programmes.model');

exports.create = async (req, res) => {
  try {
    await ProgrammeModel.create(req.body)
      .then((result) => {
        res.status(201).send({ id: result.id });
      });
  } catch (err) {
    if (err instanceof Error.ValidationError) {
      res.status(400).send(err.errors);
    } else {
      res.status(500).send(err.message);
    }
  }
};

exports.update = async (req, res) => {
  try {
    await ProgrammeModel.update(req.params.id, req.body)
      .then((result) => {
        res.status(204).send({ id: result.id });
      });
  } catch (err) {
    if (err instanceof Error.ValidationError) {
      res.status(400).send(err.errors);
    } else {
      res.status(500).send(err.message);
    }
  }
};

exports.list = async (req, res) => {
  const limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit, 10) : 10;
  const page = req.query.page || 0;
  try {
    await ProgrammeModel.list(limit, page)
      .then((result) => {
        res.status(200).send(result);
      });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.get = async (req, res) => {
  try {
    await ProgrammeModel.get(req.params.id)
      .then((result) => {
        if (result) {
          res.status(200).send(result);
        } else {
          res.status(404).send(null);
        }
      });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.delete = async (req, res) => {
  try {
    await ProgrammeModel.delete(req.params.id)
      .then(() => {
        res.status(200).send(null);
      });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
