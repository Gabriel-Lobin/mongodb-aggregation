db.trips.aggregate([
  {
    $project: {
      bikeid: 1,
      sub: {
        $subtract: ["$stopTime", "$startTime"],
      },
    },
  },
  {
    $project: {
      bikeid: 1,
      media: {
        $divide: ["$sub", 60000],
      },
    },
  },
  {
    $group: {
      _id: "$bikeid",
      duracaoMedia: { $avg: "$media" },
    },
  },
  {
    $project: {
      _id: 0,
      bikeId: "$_id",
      duracaoMedia: { $ceil: ["$duracaoMedia"] },
    },
  },
  {
    $sort: { duracaoMedia: -1 },
  },
  {
    $limit: 5,
  },
]);
