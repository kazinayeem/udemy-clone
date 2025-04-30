import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
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
    <div className="flex min-h-screen flex-row bg-gray-100">
      <Navbar />
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
}
