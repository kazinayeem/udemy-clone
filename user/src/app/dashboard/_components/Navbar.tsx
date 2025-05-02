import { DesktopNavbar } from "./navBar/DesktopNavbar";
import { MobileNavbar } from "./navBar/mobile-navbar";

export const Navbar = () => {
  return (
    <header>
      {/* Mobile Navbar */}
      <div className="lg:hidden">
        <MobileNavbar />
      </div>

      {/* Desktop Sidebar Navbar */}
      <div className="lg:flex hidden">
        <DesktopNavbar />
      </div>
    </header>
  );
};
