import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import type { RootState } from "~/redux/store/store";

export default function DesktopNavbar() {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();
  return (
    <div className="hidden md:flex items-center justify-between bg-white px-6 py-4 w-full">
      {/* Right side content (User Avatar and Welcome Text) */}

      <div
        className="flex items-center space-x-4 ml-auto cursor-pointer"
        onClick={() => {
          navigate("/teacher/profile");
        }}
      >
        <span className="text-lg text-gray-800">Welcome, {user?.name}</span>
        <div className="relative">
          <img
            src="https://www.w3schools.com/howto/img_avatar.png"
            alt="User Avatar"
            className="w-10 h-10 rounded-full border-2 border-gray-300"
          />
        </div>
      </div>
    </div>
  );
}
