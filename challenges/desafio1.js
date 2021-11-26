db.movies.aggregate([
  { $match: { $and: [
    { "imdb.rating": { $gt: 7 } },
    { rated: { $in: ["PG", "G"] } },
    { languages: { $elemMatch: { $eq: "English", $eq: "Spanish" } } },
    { genres: { $not: { $elemMatch: { $eq: "Crime", $eq: "Horror" } } } },
  ] } },
]);
