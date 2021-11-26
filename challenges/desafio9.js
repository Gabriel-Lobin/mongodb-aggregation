db.trips.aggregate([
  {
    $match: {
      birthYear: { $nin: [""] },
    },
  },
  {
    $addFields: {
      numBirthYear: { $toInt: "$birthYear" },
    },
  },
  {
    $group: {
      _id: null,
      maiorAnoNascimento: { $max: "$numBirthYear" },
      menorAnoNascimento: { $min: "$numBirthYear" },
    },
  },
  {
    $project: {
      _id: 0,
    },
  },
]);
