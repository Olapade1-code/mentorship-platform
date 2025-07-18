import express from "express";
import Session from "../models/Session";
import { roleMiddleware } from "../middlewares/roleMiddleware";

const router = express.Router();

router.post("/", roleMiddleware(["mentee"]), async (req: any, res) => {
  const { mentorId, date } = req.body;
  const session = new Session({
    mentee: req.user._id,
    mentor: mentorId,
    date,
  });
  await session.save();
  res.json(session);
});

router.get("/mentor", roleMiddleware(["mentor"]), async (req: any, res) => {
  const sessions = await Session.find({ mentor: req.user._id }).populate("mentee");
  res.json(sessions);
});

router.get("/mentee", roleMiddleware(["mentee"]), async (req: any, res) => {
  const sessions = await Session.find({ mentee: req.user._id }).populate("mentor");
  res.json(sessions);
});

router.put("/:id/feedback", async (req: any, res) => {
  const { ratingMentee, feedbackMentee, feedbackMentor } = req.body;
  const session = await Session.findById(req.params.id);

  if (!session) return res.status(404).json({ message: "Session not found" });

  if (req.user._id.equals(session.mentee)) {
    session.ratingMentee = ratingMentee;
    session.feedbackMentee = feedbackMentee;
  }
  if (req.user._id.equals(session.mentor)) {
    session.feedbackMentor = feedbackMentor;
  }
  await session.save();
  res.json(session);
});

export default router;
