// ...existing code...
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../hooks/useAuth";


export default function DashBoardLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  }

  return (
    <div className="min-h-screen" data-theme="proyecto">
      <div className="flex">
        <aside className="w-72 bg-base-100 border-r border-base-300 hidden md:flex md:flex-col md:justify-between min-h-screen">
          <Sidebar />
          <div>
            <div className="p-4">
              <button className="btn btn-error w-full" onClick={handleLogout}>Cerrar Sesión</button>
            </div>
          </div>
        </aside>

        <main className="flex-1 p-4 md:p-6">
          <div className="md:hidden mb-4">
            <div className="alert aler-info">
              Pantalla Grande
            </div>
          </div>
          <Outlet />
        </main>
      </div>
    </div>
  )
}