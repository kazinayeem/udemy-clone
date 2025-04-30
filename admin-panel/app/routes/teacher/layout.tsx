import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import DesktopNavbar from "~/navbar/_components/desktop-navbar";
import Navbar from "~/navbar/Navbar";
import { logout, setUser } from "~/redux/reducer/authSlice";
import { useAppDispatch } from "~/redux/store/store";

export default function DashboardLayout() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (!token || !user) {
      navigate("/login");
      dispatch(logout());
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return;
    }

    try {
      const parsedUser = JSON.parse(user);

      if (parsedUser.role !== "TEACHER") {
        navigate("/login");
        return;
      }

      dispatch(
        setUser({
          id: parsedUser.id,
          name: parsedUser.name,
          email: parsedUser.email,
          role: parsedUser.role,
          token,
        })
      );
    } catch (err) {
      dispatch(logout());
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    }
  }, [dispatch, navigate]);

  return (
    <div className="flex min-h-screen flex-row bg-gray-100 relative">
      {/* Navbar should be on top of everything on mobile */}
      <div className="z-50">
        <Navbar />
      </div>

      {/* Main content behind navbar when opened */}
      <main className="flex-1 pt-20 md:pt-0 z-0">
          <DesktopNavbar />
        <Outlet />
      </main>
    </div>
  );
}
