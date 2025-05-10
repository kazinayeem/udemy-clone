import { Link } from "react-router";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Admin Panel" },
    { name: "description", content: "Welcome to My Admin Pandel" },
  ];
}

const user = {
  role: "guest",
};

const resources = [
  { href: "https://example.com/docs", text: "Documentation", icon: "📚" },
  { href: "https://example.com/support", text: "Support", icon: "🛠️" },
];

export default function Home() {
  return (
    <main className="flex items-center justify-center pt-16 pb-4 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="flex-1 flex flex-col items-center gap-16">
        <div className="max-w-md w-full space-y-6 px-4">
          <nav className="rounded-3xl border border-gray-200 p-6 dark:border-gray-700 bg-white dark:bg-gray-800 space-y-4 shadow-sm">
            <p className="leading-6 text-gray-700 dark:text-gray-200 text-center text-lg font-semibold">
              Welcome, {user.role.charAt(0).toUpperCase() + user.role.slice(1)}!
            </p>
            <ul>
              {resources.map(({ href, text, icon }) => (
                <li key={href}>
                  <a
                    className="group flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors text-blue-700 hover:underline dark:text-blue-400"
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span>{icon}</span>
                    <span>{text}</span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex justify-between mt-6 gap-2">
              <Link
                viewTransition
                to="/login"
                className="flex-1 text-center px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Login
              </Link>
              <Link
                viewTransition
                to="/register"
                className="flex-1 text-center px-4 py-2 rounded-lg bg-gray-300 dark:bg-gray-700 text-black dark:text-white hover:bg-gray-400 dark:hover:bg-gray-600 transition"
              >
                Register
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </main>
  );
}
