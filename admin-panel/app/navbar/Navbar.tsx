import { useState } from "react";
import MobileNavbar from "./_components/moble-navbar";
import Sidebar from "./_components/sidebar";
import { Menu } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "~/redux/store/store";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);
  return (
    <div className="flex min-h-screen">
      {/* Mobile View: Button and Sidebar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white p-4 shadow-md md:hidden items-center flex justify-between">
        <button
          onClick={() => setIsOpen(true)}
          className="text-gray-700 hover:text-black transition"
        >
          <Menu size={24} />
        </button>
        <span className="ml-2 text-lg text-gray-800">
          Welcome, {user?.name}
        </span>
        <MobileNavbar isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>
    </div>
  );
}
