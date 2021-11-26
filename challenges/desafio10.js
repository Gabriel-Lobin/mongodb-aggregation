db.trips.aggregate([
  {
    $project: {
      usertype: 1,
      sub: {
        $subtract: ["$stopTime", "$startTime"],
      }
    }
  },
  {
    $project: {
      usertype: 1,
      media: {
        $divide: ["$sub",  3600000 ],
      }
    }
  },
  {
    $group: {
      _id: "$usertype",
      duracaoMedia: { $avg: "$media" },
    },
  },  
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: { $round: ["$duracaoMedia", 2] },
    },
  },
  {
    $sort: { duracaoMedia: 1 },
  },
]);