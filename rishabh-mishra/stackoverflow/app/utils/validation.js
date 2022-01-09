const { validationResult } = require("express-validator");

const validationErrorsHandler = (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(422).json({ errors: result.array() });
  }
};

module.exports = {
  validationErrorsHandler,
};
