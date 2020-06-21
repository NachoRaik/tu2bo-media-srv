const videosControllerFactory = require('../../src/controllers/videosController');

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

beforeEach(() => {
  videoHandler = {
    findVideo: jest.fn(),
    videoExists: jest.fn(),
    addVideo: jest.fn()
  }
  videosController = videosControllerFactory(videoHandler);
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
      videoHandler.findVideo.mockResolvedValue([video]);
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
      videoHandler.videoExists.mockResolvedValue(null);
      videoHandler.addVideo.mockResolvedValue(video);
    });

    test('should respond successfully', async () => {
      await videosController.add(req, res, next);
      expect(videoHandler.videoExists).toHaveBeenCalledWith(req.body);
      expect(videoHandler.addVideo).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ id: video.id });
    });
  });

  describe('when a video is already uploaded', () => {
    beforeEach(() => {
      req.body = video;
      videoHandler.videoExists.mockResolvedValue(video);
    });

    test('should respond with conflict', async () => {
      await videosController.add(req, res, next);
      expect(videoHandler.videoExists).toHaveBeenCalledWith(req.body);
      expect(videoHandler.addVideo).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(409);
      expect(res.json).toHaveBeenCalledWith({ reason: 'Video already uploaded' });
    });
  });

  describe('when there is a DB error', () => {
    beforeEach(() => {
      req.body = video;
      videoHandler.videoExists.mockRejectedValue(new Error('crash!'));
    });

    test('should respond with internal error', async () => {
      await videosController.add(req, res, next);
      expect(videoHandler.videoExists).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ reason: 'DB Error' });
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
