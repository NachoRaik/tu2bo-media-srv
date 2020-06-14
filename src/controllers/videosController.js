module.exports = function videosController() {
  const get = (req, res, next) => {
    // Implement
    res.status(200).send('ok');
    next();
  };
  
  const add = (req, res, next) => {
    // Implement
    res.status(201).send('ok');
    next();
  };

  const remove = (req, res, next) => {
    // Implement
    res.status(204).send('ok');
    next();
  };

  return {
    add,
    get,
    remove
  };
};
  