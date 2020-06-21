const videosControllerFactory = require('../../src/controllers/videosController');
const Video = require('../../src/models/Video');
const dbHandler = require('../dbHandler');

let req;
let res;
let next;

let id = '1';
let user_id = '22';
let author = 'testUser';
let url = 'videos.com/123';
let title = 'Some deep title';
let visibility = 'public';
let date = '09/19/18 13:00:05';
let description = 'Quite descripting text';
let thumb = 'images.com/123';


/* Connect to a new in-memory database before running any tests. */
beforeAll(async () => await dbHandler.connect());

/* Clear all test data after every test. */
afterEach(async () => await dbHandler.clearDatabase());

/* Remove and close the db and server. */
afterAll(async () => await dbHandler.closeDatabase());

beforeEach(() => {
  videosController = videosControllerFactory();
  req = {
    body: {},
    params: {},
    query: {}
  };
  res = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
    json: jest.fn()
  };
  next = jest.fn();
});


describe('get', () => {
  const video = {
      id,
      user_id,
      author,
      url,
      title,
      description,
      date,
      visibility,
      thumb
  };

  describe('when videos are retrieved', () => {
    beforeEach(() => {
      req.body = video;
      videosController.add(req, res, next);
    });

    test('should respond successfully', async () => {
      await videosController.get(req, res, next);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([video]);
    });
  });
});


describe('add', () => {
  const video = {
      id,
      user_id,
      author,
      url,
      title,
      description,
      date,
      visibility,
      thumb
  };

  describe('when a correct video is added', () => {
    beforeEach(() => {
      req.body = video;
    });

    test('should respond successfully', async () => {
      await videosController.add(req, res, next);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith('ok');
    });
  });
});


describe('update', () => {
  describe('when a video is correctly updated', () => {
    test('should respond successfully', async () => {
      await videosController.update(req, res, next);
      expect(res.status).toHaveBeenCalledWith(200);
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
