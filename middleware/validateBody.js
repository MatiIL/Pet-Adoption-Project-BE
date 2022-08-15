const Ajv = require('ajv');
const ajv = new Ajv();
const addFormats = require('ajv-formats');
addFormats(ajv);

function validateBody(schema) {
  return (req, res, next) => {
    const valid = ajv.validate(schema, req.body);
    if (!valid) {
      res.status(400).send(ajv.errors);
      return;
    }
    next();
  };
}

module.exports = {validateBody}