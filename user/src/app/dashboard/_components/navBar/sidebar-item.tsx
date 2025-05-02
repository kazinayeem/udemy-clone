import Link from "next/link";

interface NavbarItemProps {
  children: React.ReactNode;
  href: string;
}

export const NavbarItem = ({ children, href }: NavbarItemProps) => {
  return (
    <Link
      href={href}
      className="px-4 py-2 text-lg text-gray-700 hover:bg-gray-200 rounded"
    >
      {children}
    </Link>
  );
};
