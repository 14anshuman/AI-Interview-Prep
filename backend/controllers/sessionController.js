const Session = require("../models/Session");
const Question = require("../models/Question");


// @desc Create a new session and linked questions
// @route POST/api/sessions/create
// Private
exports.createSession = async (req, res) => {
    try {
        const { role, experience, topicsToFocus, description, questions } = req.body;
        const userId = req.user._id;

        const session = await Session.create({
            user: userId,
            role,
            experience,
            topicsToFocus,
            description,
        });
        const questionsDocs = await Promise.all(
            questions.map(async (q) => {
                const question = await Question.create({
                    session: session._id,
                    question: q.question,
                    answer: q.answer,
                });
                return question._id
            })
        );
        session.questions = questionsDocs;
        await session.save();

        res.status(201).json({ success: true, session });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
}


// @desc Get all session for logged in user
// @route GET/api/sessions/my-session
// Private
exports.getMySessions = async (req, res) => {
    try {
        const sessions = await Session.find({ user: req.user.id })
            .sort({ createdAt: -1 })
            .populate("questions");
        res.status(200).json(sessions);
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
}


// @desc Get a session by ID with populated question
// @route GET/api/sessions/:id
// Private
exports.getSessionById = async (req, res) => {
    try {
        const session = await Session.findById(req.params.id)
            .populate({
                path: "questions",
                options: { sort: { isPinned: -1, createdAt: -1 } },
            })
            .exec();
        if (!session) {
            return res
                .status(404)
                .json({ success: false, message: "Session not found" });
        }
        res.status(200).json({ success: true, session });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
}


// @desc Delete a seesion and its questions
// @route Delete/api/sessions/:id
// Private
exports.deleteSession = async (req, res) => {
  try {
    const sessionId = req.params.id;

    if (!sessionId) {
      return res.status(400).json({ message: "Session ID is required" });
    }

    const session = await Session.findById(sessionId);

    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    // Check if the logged-in user owns this session
    if (session.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Forbidden: You don't own this session" });
    }

    // Delete all associated questions
    await Question.deleteMany({ session: session._id });

    // Delete the session
    await session.deleteOne();

    return res.status(200).json({ message: "Session deleted successfully." });
  } catch (error) {
    console.error("Error in deleteSession:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};
