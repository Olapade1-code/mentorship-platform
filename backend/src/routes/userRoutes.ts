import express from "express";
import User from "../models/User";

const router = express.Router();

router.get("/me", async (req: any, res) => {
  res.json(req.user);
});

router.put("/me/profile", async (req: any, res) => {
  const { bio, skills, goals } = req.body;
  req.user.bio = bio;
  req.user.skills = skills;
  req.user.goals = goals;
  await req.user.save();
  res.json(req.user);
});

export default router;
