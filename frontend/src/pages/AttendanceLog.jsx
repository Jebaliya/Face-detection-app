import { useEffect, useState } from "react";
import { api } from "../api";
import { useToast } from "../components/ToastContext";
import { useConfirm } from "../components/ConfirmContext";
import { IconLog, IconTrash } from "../components/Icons";
import EmptyState from "../components/EmptyState";
import "../styles/log.css";

export default function AttendanceLog() {
  const toast = useToast();
  const confirm = useConfirm();
  const [records, setRecords] = useState([]);
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  async function loadAttendance() {
    try {
      const data = await api.getAttendance();
      setRecords(data.records);
    } catch (_) {
      /* silent */
    }
  }

  useEffect(() => {
    loadAttendance();
    const id = setInterval(loadAttendance, 3000);
    return () => clearInterval(id);
  }, []);

  async function clearAttendance() {
    const ok = await confirm(
      "This clears all attendance records logged for today.",
      {
        title: "Clear today's attendance?",
        confirmLabel: "Clear log",
        danger: true,
      },
    );
    if (!ok) return;
    try {
      await api.clearAttendance();
      toast("Attendance cleared", "info");
      loadAttendance();
    } catch (_) {
      /* silent */
    }
  }

  return (
    <section className="card attendance-section">
      <div className="card-header">
        <h2>
          <IconLog />
          Attendance Log{" "}
          <span className="subtitle mono">&mdash; {currentDate}</span>
        </h2>
        <div className="header-right">
          <span className="count-badge">{records.length}</span>
          <button className="btn btn-outline" onClick={clearAttendance}>
            <IconTrash /> Clear
          </button>
        </div>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Time</th>
              <th>Score</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {records.length === 0 ? (
              <tr className="empty-row">
                <td colSpan={5}>
                  <EmptyState icon={<IconLog />}>
                    No attendance recorded yet
                  </EmptyState>
                </td>
              </tr>
            ) : (
              records.map((r, i) => (
                <tr className="fade-in" key={r.name}>
                  <td className="mono">{i + 1}</td>
                  <td>
                    <strong>{r.name}</strong>
                  </td>
                  <td className="mono">{r.time}</td>
                  <td className="mono">
                    {r.score ? (r.score * 100).toFixed(1) + "%" : "-"}
                  </td>
                  <td>
                    <span className="badge badge-present">Present</span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
