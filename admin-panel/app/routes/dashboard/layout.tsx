import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import Navbar from "~/navbar/Navbar";
import { setUser } from "~/redux/reducer/authSlice";
import { useAppDispatch } from "~/redux/store/store";

export default function DashboardLayout() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      const parsedUser = JSON.parse(user);
      const data = {
        id: parsedUser.id,
        name: parsedUser.name,
        email: parsedUser.email,
        role: parsedUser.role,
        token: token,
      };
      dispatch(setUser(data));
    }
    if (!token || !user) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="flex min-h-screen flex-row bg-gray-100">
      <Navbar />
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
}
