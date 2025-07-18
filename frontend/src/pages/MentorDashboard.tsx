import { useEffect, useState, useContext } from "react";
import { api } from "../api";
import { AuthContext } from "../context/AuthContext";

interface Request {
  _id: string;
  mentee: { name: string };
}

interface Session {
  _id: string;
  date: string;
}

export default function MentorDashboard() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    api.get<Request[]>("/requests/received").then(res => setRequests(res.data));
    api.get<Session[]>("/sessions/mentor").then(res => setSessions(res.data));
  }, []);

  const handleRequest = (id: string, status: string) => {
    api.put(`/requests/${id}`, { status }).then(() => {
      setRequests(prev => prev.filter(r => r._id !== id));
    });
  };

  return (
    <div>
      <h2>Mentor Dashboard</h2>
      <h3>Incoming Requests</h3>
      {requests.map(req => (
        <div key={req._id}>
          {req.mentee.name}
          <button onClick={() => handleRequest(req._id, "ACCEPTED")}>Accept</button>
          <button onClick={() => handleRequest(req._id, "REJECTED")}>Reject</button>
        </div>
      ))}
      <h3>Upcoming Sessions</h3>
      {sessions.map(s => (
        <div key={s._id}>{new Date(s.date).toLocaleString()}</div>
      ))}
    </div>
  );
}
