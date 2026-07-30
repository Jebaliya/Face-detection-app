import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LiveCamera from "./pages/LiveCamera";
import AttendanceLog from "./pages/AttendanceLog";
import RegisterPeople from "./pages/RegisterPeople";
import { ToastProvider } from "./components/ToastContext";
import { ConfirmProvider } from "./components/ConfirmContext";

export default function App() {
  return (
    <ToastProvider>
      <ConfirmProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<LiveCamera />} />
              <Route path="log" element={<AttendanceLog />} />
              <Route path="register" element={<RegisterPeople />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ConfirmProvider>
    </ToastProvider>
  );
}
