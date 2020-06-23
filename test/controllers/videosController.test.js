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
    findVideos: jest.fn(),
    findVideo: jest.fn(),
    videoExists: jest.fn(),
    addVideo: jest.fn(),
    updateVideo: jest.fn(),
    deleteVideo: jest.fn()
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

const exampleVideo = {
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

describe('get', () => {
  describe('when videos are retrieved', () => {
    beforeEach(() => {
      req.query = { title }; 
      videoHandler.findVideos.mockResolvedValue([exampleVideo]);
    });

    test('should respond successfully', async () => {
      await videosController.get(req, res, next);
      expect(videoHandler.findVideos).toHaveBeenCalledWith({title});
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([exampleVideo]);
    });
  });
});

describe('getSingleVideo', () => {
  describe('when a video is retrieved', () => {
    beforeEach(() => {
      req.params = { videoId: id };
      videoHandler.findVideo.mockResolvedValue(exampleVideo);
    });

    test('should respond successfully', async () => {
      await videosController.getSingleVideo(req, res, next);
      expect(videoHandler.findVideo).toHaveBeenCalledWith(id);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(exampleVideo);
    });
  });

  describe('when an inexistent video is retrieved', () => {
    beforeEach(() => {
      req.params = { videoId: id };
      videoHandler.findVideo.mockResolvedValue(null);
    });

    test('should respond successfully', async () => {
      await videosController.getSingleVideo(req, res, next);
      expect(videoHandler.findVideo).toHaveBeenCalledWith(id);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ reason: 'Video not found' });
    });
  });
});


describe('add', () => {
  describe('when a correct video is added', () => {
    beforeEach(() => {
      req.body = exampleVideo;
      videoHandler.videoExists.mockResolvedValue(null);
      videoHandler.addVideo.mockResolvedValue(exampleVideo);
    });

    test('should respond successfully', async () => {
      await videosController.add(req, res, next);
      expect(videoHandler.videoExists).toHaveBeenCalledWith(exampleVideo);
      expect(videoHandler.addVideo).toHaveBeenCalledWith(exampleVideo);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ id: exampleVideo.id });
    });
  });

  describe('when a video is already uploaded', () => {
    beforeEach(() => {
      req.body = exampleVideo;
      videoHandler.videoExists.mockResolvedValue(exampleVideo);
    });

    test('should respond with conflict', async () => {
      await videosController.add(req, res, next);
      expect(videoHandler.videoExists).toHaveBeenCalledWith(exampleVideo);
      expect(videoHandler.addVideo).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(409);
      expect(res.json).toHaveBeenCalledWith({ reason: 'Video already uploaded' });
    });
  });

  describe('when there is a DB error', () => {
    beforeEach(() => {
      req.body = exampleVideo;
      videoHandler.videoExists.mockRejectedValue(new Error('crash!'));
    });

    test('should respond with internal error', async () => {
      await videosController.add(req, res, next);
      expect(videoHandler.videoExists).toHaveBeenCalledWith(exampleVideo);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ reason: 'DB Error' });
    });
  });
});


describe('update', () => {
  const newData = {
    title,
    visibility
  };

  describe('when a video is correctly updated', () => {
    beforeEach(() => {
      req.params = { videoId: id };
      req.body = newData;
      videoHandler.updateVideo.mockResolvedValue({ n: 1 });
      videoHandler.findVideo.mockResolvedValue(exampleVideo);
    });

    test('should respond successfully', async () => {
      await videosController.update(req, res, next);
      expect(videoHandler.updateVideo).toHaveBeenCalledWith(id, newData);
      expect(videoHandler.findVideo).toHaveBeenCalledWith(id);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(exampleVideo);
    });
  });

  describe('when an inexisten video is updated', () => {
    beforeEach(() => {
      req.params = { videoId: id };
      req.body = newData;
      videoHandler.updateVideo.mockResolvedValue({ n: 0 });
    });

    test('should respond successfully', async () => {
      await videosController.update(req, res, next);
      expect(videoHandler.updateVideo).toHaveBeenCalledWith(id, newData);
      expect(videoHandler.findVideo).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ reason: 'Video not found' });
    });
  });
});


describe('remove', () => {
  describe('when an existing video is removed', () => {
    beforeEach(() => {
      req.params = { videoId: id };
      videoHandler.deleteVideo.mockResolvedValue({ deletedCount: 1 });
    });

    test('should respond successfully', async () => {
      await videosController.remove(req, res, next);
      expect(videoHandler.deleteVideo).toHaveBeenCalledWith(id);
      expect(res.status).toHaveBeenCalledWith(204);
    });
  });

  describe('when an inexisting video is removed', () => {
    beforeEach(() => {
      req.params = { videoId: id };
      videoHandler.deleteVideo.mockResolvedValue({ deletedCount: 0 });
    });

    test('should respond successfully', async () => {
      await videosController.remove(req, res, next);
      expect(videoHandler.deleteVideo).toHaveBeenCalledWith(id);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ reason: 'Video not found' });
    });
  });
});
