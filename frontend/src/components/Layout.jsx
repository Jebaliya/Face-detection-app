import { NavLink, Outlet } from "react-router-dom";
import { IconCamera, IconLog, IconRegister, IconRadar } from "./Icons";

export default function Layout() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark">
            <IconRadar />
          </span>
          <div className="brand-text">
            <h1>Face Detection</h1>
            <p>attendance system</p>
          </div>
        </div>

        <nav className="nav-bar">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
          >
            <IconCamera />
            <span>Live Camera</span>
          </NavLink>
          <NavLink
            to="/log"
            className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
          >
            <IconLog />
            <span>Attendance Log</span>
          </NavLink>
          <NavLink
            to="/register"
            className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
          >
            <IconRegister />
            <span>Register People</span>
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <span className="status-dot online" />
          System online
        </div>
      </aside>

      <div className="content">
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
