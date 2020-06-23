const { body , validationResult } = require('express-validator');

module.exports = function bodyValidatorMiddleware() {
  const addValidations = [
    body(['author', 'user_id', 'url', 'title', 'visibility', 'date'], 'Missing value').exists(),
    body(['visibility'], 'Invalid visibility').isIn(['public', 'private'])
  ];
  const updateValidations = [
    body(['id', 'author', 'user_id', 'url', 'date'], 'Invalid values').not().exists(),
    body(['visibility'], 'Invalid visibility').isIn(['public', 'private'])
  ];

  const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let firstError = errors.array()[0];
      return res.status(400).json({ reason: firstError.msg });
    }

    next();
  }

  return {
    addValidations,
    updateValidations,
    validate
  };
};    
  