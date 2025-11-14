"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Projects", href: "/projects" },
    { name: "Tasks", href: "/tasks" },
    { name: "Notifications", href: "/notifications" },
    { name: "Settings", href: "/settings" },
  ];

  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-200 p-4 hidden md:flex flex-col">
      <h1 className="text-2xl font-semibold mb-6">TaskZen</h1>

      <nav className="space-y-1">
        {navItems.map((item) => (
          <Link href={item.href} key={item.href}>
            <div
              className={clsx(
                "px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 cursor-pointer",
                pathname.startsWith(item.href) &&
                  "bg-gray-200 text-gray-900 font-medium"
              )}
            >
              {item.name}
            </div>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
