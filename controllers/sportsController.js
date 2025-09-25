const Sport = require("../models/Sport");

exports.listSports = async (req, res) => {
  const sports = await Sport.find();
  res.render("sports", { sports });
};

exports.createSport = async (req, res) => {
  const { name } = req.body;
  await Sport.create({ name });
  res.redirect("/sports");
};
