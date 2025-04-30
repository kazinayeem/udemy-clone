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
      return;
    }

    try {
      const parsedUser = JSON.parse(user);

      if (parsedUser.role !== "ADMIN") {
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
    } catch (error) {
      dispatch(logout());
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      console.error("Failed to parse user from localStorage:", error);
      navigate("/login");
    }
  }, [dispatch, navigate]);

  return (
    <div className="flex min-h-screen flex-row bg-gray-100">
      <Navbar />
      <main className="flex-1 pt-20 md:pt-0 z-0">
        <DesktopNavbar/>
        <Outlet />
      </main>
    </div>
  );
}
