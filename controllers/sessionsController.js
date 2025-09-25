const Session = require("../models/Session");
const Sport = require("../models/Sport");

exports.createSession = async (req, res) => {
  try {
    if (!req.session.user || !req.session.user._id) return res.redirect("/auth/login");

    const { sport, teamA, teamB, additionalPlayers, date, venue } = req.body;

  
    const sportDoc = await Sport.findById(sport);
    if (!sportDoc) return res.send("Selected sport not found");

    const session = new Session({
      sport: sportDoc._id,
      teamA: teamA.split(",").map(p => p.trim()),
      teamB: teamB.split(",").map(p => p.trim()),
      additionalPlayers,
      date,
      venue,
      createdBy: req.session.user._id,
      participants: [req.session.user._id],
    });

    await session.save();
    res.redirect("/sessions");
  } catch (err) {
    console.error("Error creating session:", err);
    res.send("Error creating session");
  }
};

exports.joinSession = async (req, res) => {
  try {
    if (!req.session.user || !req.session.user._id) return res.redirect("/auth/login");

    const session = await Session.findById(req.params.id);
    if (!session) return res.send("Session not found");

    const userId = req.session.user._id.toString();
    if (!session.participants.map(p => p.toString()).includes(userId)) {
      session.participants.push(userId);
      await session.save();
    }

    res.redirect("/sessions");
  } catch (err) {
    console.error("Error joining session:", err);
    res.send("Error joining session");
  }
};

// Get sessions page
exports.getSessionsPage = async (req, res) => {
  try {
    const sessions = await Session.find()
      .populate("sport")         // populate sport details
      .populate("participants")  // populate participants info
      .populate("createdBy")     // populate creator info
      .lean();

    const sports = await Sport.find().lean(); // all available sports

    res.render("sessions/index", {
      user: req.session.user || null,
      sessions,
      sports,
    });
  } catch (err) {
    console.error("Error loading sessions page:", err);
    res.send("Error loading sessions page");
  }
};


exports.cancelSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);
    if (!session) return res.send("Session not found");
    if (session.createdBy.toString() !== req.session.user._id.toString()) {
      return res.send("Only the creator can cancel this session");
    }

    session.cancelled = true;
    session.cancelReason = req.body.reason || "Cancelled by creator";
    await session.save();

    res.redirect("/sessions");
  } catch (err) {
    console.error("Error cancelling session:", err);
    res.send("Error cancelling session");
  }
};
