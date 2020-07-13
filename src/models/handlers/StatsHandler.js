const Video = require('../schemas/Video');
const VideoStat = require('../schemas/VideoStat');

module.exports = function StatsHandler() {
  const addHistoricEntry = async (count, date) => {
    let newStat = new VideoStat({count, date});
    return newStat.save();
  };

  const getEntriesSince = async (sinceDate) => {
    return VideoStat.find({ date: {$gt: sinceDate }}, '-_id -__v');
  };

  const getLastEntry = async () => {
    return VideoStat.findOne().sort({ _id: -1 });
  };
  
  const currentCount = async (query) => {
    return Video.countDocuments(query);
  };

  return {
    addHistoricEntry,
    getEntriesSince,
    getLastEntry,
    currentCount,
  };
};
    