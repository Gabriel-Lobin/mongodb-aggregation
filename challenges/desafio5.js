const fav_act = [
  "Sandra Bullock",
  "Tom Hanks",
  "Julia Roberts",
  "Kevin Spacey",
  "George Clooney"
];

db.movies.aggregate([
  {
    $match: {
      $and: [
        { countries: { $elemMatch: { $eq: "USA"} } },
        { "tomatoes.viewer.rating": { $gte: 3 } },
        { cast: { $in: fav_act } },
      ],      
    },
  },  
  {
    $addFields: {
      num_favs: { $size: { $setIntersection: ["$cast", fav_act] } },
    }
  },
  {
    $sort: { num_favs: -1, "tomatoes.viewer.rating": -1, title: -1 },
  }, 
  {
    $project: {
      title: 1,
      num_favs: 1,
      cast: 1,
      _id: 0,
    },
  },
  {
    $skip: 24,
  },
  {    
    $limit: 1,
  },
]);
