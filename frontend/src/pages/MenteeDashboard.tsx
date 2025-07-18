import { useEffect, useState } from "react";
import { api } from "../api";

interface Mentor {
  _id: string;
  name: string;
  skills?: string[];
}

interface Session {
  _id: string;
  date: string;
}

export default function MenteeDashboard() {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);

  useEffect(() => {
    api.get<Mentor[]>("/admin/users").then(res =>
      setMentors(res.data.filter((u: Mentor) => u.role === "mentor"))
    );
    api.get<Session[]>("/sessions/mentee").then(res => setSessions(res.data));
  }, []);

  const requestMentor = (mentorId: string) => {
    api.post("/requests", { mentorId });
  };

  return (
    <div>
      <h2>Mentee Dashboard</h2>
      <h3>Available Mentors</h3>
      {mentors.map(m => (
        <div key={m._id}>
          {m.name} - {m.skills?.join(", ")}
          <button onClick={() => requestMentor(m._id)}>Request Mentorship</button>
        </div>
      ))}
      <h3>My Sessions</h3>
      {sessions.map(s => (
        <div key={s._id}>{new Date(s.date).toLocaleString()}</div>
      ))}
    </div>
  );
}
