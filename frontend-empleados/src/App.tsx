import { Navigate, Route, Routes } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashBoardLayout";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ProtectedRoute from "./router/ProtectedRoute";
import PublicRoute from "./router/Public";
import EmpleadosList from "./pages/empleados/EmpleadosList";

export default function App() {
  return (
    <Routes>
      {/* Rutas Públicas */}
      <Route element={<PublicRoute />}>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Route>

      {/* Rutas Privadas */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<div>Bienvenido al dashboard</div>} />
          <Route path="/dashboard/empleados/*" element={<EmpleadosList/>} />
        </Route>
      </Route>

      {/* Redirect Raíz */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Ruta no encontrada */}
      <Route path="*" element={<div className="p-6">Página no encontrada</div>} />
    </Routes>
  );
}
