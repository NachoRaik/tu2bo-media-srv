module.exports = function statsController(config, statsHandler) {
  const errorDB = (res, err) => { 
    console.log(err.message);
    return res.status(500).json({ reason: 'DB Error' });
  };

  const addStat = async (req, res, next) => {
    try {
      let count = await statsHandler.currentCount();
      let lastEntry = await statsHandler.getLastEntry();
      if (!lastEntry) {
        statsHandler.addHistoricEntry(count, new Date());
        return next();
      }
      let lastDateTime = lastEntry.date.getTime();
      let nowTime = Date.now();
      for (let dt=lastDateTime+config.delta; dt<nowTime; dt+=config.delta) {
        statsHandler.addHistoricEntry(count, new Date(dt));
      }
    } catch(err) {
      console.log("Error while adding historic entry: ", err);
    }
    next();
  };

  const videoStats = async (req, res, next) => {
    let sinceDate = req.query.initial_date;
    let finalDate = req.query.final_date;
    if (!sinceDate) {
      sinceDate = new Date();
      sinceDate.setDate(sinceDate.getDate() - config.defaultDaysSince);
    }
    if (!finalDate) {
      finalDate = new Date();
      finalDate.setDate(finalDate.getDate());
    }
    return statsHandler.getEntriesSince(sinceDate, finalDate)
      .then(entries => res.status(200).json(entries))
      .catch(err => errorDB(res, err));
  };

  const visibilityStats = async (req, res, next) => {
    let countPublicVideos = await statsHandler.currentCount({ visibility: 'public' });
    let countPrivateVideos = await statsHandler.currentCount({ visibility: 'private' });
    let countBlockedVideos = await statsHandler.currentCount({ is_blocked: true });
    
    return res.status(200).json({ public: countPublicVideos, private: countPrivateVideos, blocked: countBlockedVideos });
  };

  return {
    videoStats,
    addStat,
    visibilityStats
  };
};
  