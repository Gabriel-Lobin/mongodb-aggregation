db.trips.aggregate([
  {
    $addFields: {
      verifiedDate: {
        $dateToString: {
          format: "%Y-%m-%d", date: "$startTime",
        },
      },
    },
  },
  {
    $match: {
      verifiedDate: { $regex: /2016-03-10/ },
    },
  },
  {
    $project: {
      usertype: 1,
      sub: {
        $subtract: ["$stopTime", "$startTime"],
      },
    },
  },
  {
    $project: {
      usertype: 1,
      media: {
        $divide: ["$sub", 60000],
      },
    },
  },
  {
    $group: {
      _id: "$verifiedDate",
      duracaoMedia: { $avg: "$media" },
    },
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: { $ceil: ["$duracaoMedia"] },
    },
  },
]);
