import express from "express";
import Request from "../models/Request";
import { roleMiddleware } from "../middlewares/roleMiddleware";

const router = express.Router();

router.post("/", roleMiddleware(["mentee"]), async (req: any, res) => {
  const { mentorId } = req.body;
  const request = new Request({
    mentee: req.user._id,
    mentor: mentorId,
  });
  await request.save();
  res.json(request);
});

router.get("/sent", roleMiddleware(["mentee"]), async (req: any, res) => {
  const requests = await Request.find({ mentee: req.user._id }).populate("mentor");
  res.json(requests);
});

router.get("/received", roleMiddleware(["mentor"]), async (req: any, res) => {
  const requests = await Request.find({ mentor: req.user._id }).populate("mentee");
  res.json(requests);
});

router.put("/:id", roleMiddleware(["mentor"]), async (req, res) => {
  const { status } = req.body;
  const request = await Request.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );
  res.json(request);
});

export default router;
