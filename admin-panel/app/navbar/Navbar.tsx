import MobileNavbar from "./_components/moble-navbar";
import Sidebar from "./_components/sidebar";

export default function Navbar() {
  return (
    <div className="flex min-h-screen">
      {/* Mobile View: Navbar at the top */}
      <div className="md:hidden">
        <MobileNavbar />
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>
    </div>
  );
}
