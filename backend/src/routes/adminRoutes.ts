import express from "express";
import User from "../models/User";
import { roleMiddleware } from "../middlewares/roleMiddleware";
import Request from "../models/Request";
import Session from "../models/Session";

const router = express.Router();

router.use(roleMiddleware(["admin"]));

router.get("/users", async (_, res) => {
  const users = await User.find();
  res.json(users);
});

router.put("/users/:id/role", async (req, res) => {
  const { role } = req.body;
  const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true });
  res.json(user);
});

router.get("/requests", async (_, res) => {
  const requests = await Request.find().populate("mentee").populate("mentor");
  res.json(requests);
});

router.get("/sessions", async (_, res) => {
  const sessions = await Session.find().populate("mentee").populate("mentor");
  res.json(sessions);
});

export default router;
