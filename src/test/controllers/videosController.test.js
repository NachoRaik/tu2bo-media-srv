const videosControllerFactory = require('../../controllers/videosController');

let req;
let res;
let next;

beforeEach(() => {
  videosController = videosControllerFactory();
  req = {
    body: {},
    params: {}
  };
  res = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn()
  };
  next = jest.fn();
});

describe('get', () => {
  describe('when videos are retrieved', () => {
    test('should respond successfully', async () => {
      await videosController.get(req, res, next);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith('ok');
    });
  });
});

describe('add', () => {
  describe('when a correct video is added', () => {
    test('should respond successfully', async () => {
      await videosController.add(req, res, next);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith('ok');
    });
  });
});


describe('remove', () => {
  describe('when an existing video is removed', () => {
    test('should respond successfully', async () => {
      await videosController.remove(req, res, next);
      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.send).toHaveBeenCalledWith('ok');
    });
  });
});
