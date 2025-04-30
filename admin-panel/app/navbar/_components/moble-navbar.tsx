import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "~/components/ui/sheet";
import Sidebar from "./sidebar";
import { Menu } from "lucide-react";

export default function MobileNavbar() {
  return (
    <Sheet>
      {/* <div >
        <SheetTrigger className="md:hidden w-full pr-4 hover:opacity-75 transition">
          <Menu />
        </SheetTrigger>
      </div> */}

      <SheetContent className="w-[300px] sm:w-[440px]" side="left">
        <SheetHeader>
          <Sidebar />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
