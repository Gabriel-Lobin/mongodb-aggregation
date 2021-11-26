db.movies.aggregate([
  {
    $sort: { title: 1 },
  },
  {
    $project: {
      _id: 0,
      title_split: { $split: ["$title", " "] },
    },
  },
  {
    $match: {
      title_split: { $size: 1 },
    },
  },
]);
