import { useEffect, useState } from "react";
import { api } from "../api";

export default function AdminDashboard() {
  const [users, setUsers] = useState<any[]>([]);
  const [sessions, setSessions] = useState<any[]>([]);

  useEffect(() => {
    api.get("/admin/users").then(res => setUsers(res.data));
    api.get("/admin/sessions").then(res => setSessions(res.data));
  }, []);

  const changeRole = (id: string, role: string) => {
    api.put(`/admin/users/${id}/role`, { role }).then(() => {
      setUsers(prev =>
        prev.map(u => (u._id === id ? { ...u, role } : u))
      );
    });
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <h3>All Users</h3>
      {users.map(u => (
        <div key={u._id}>
          {u.name} - {u.role}
          <button onClick={() => changeRole(u._id, "mentor")}>Make Mentor</button>
          <button onClick={() => changeRole(u._id, "mentee")}>Make Mentee</button>
        </div>
      ))}
      <h3>All Sessions</h3>
      {sessions.map(s => (
        <div key={s._id}>{new Date(s.date).toLocaleString()}</div>
      ))}
    </div>
  );
}
