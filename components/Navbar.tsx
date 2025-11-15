"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar({ currentUserId }) {
  const [unread, setUnread] = useState(2);

  useEffect(() => {
    if (!currentUserId) return;
    fetchUnread();
    // optional: poll every 30s
    const iv = setInterval(fetchUnread, 30000);
    return () => clearInterval(iv);
  }, [currentUserId]);



  return (
    <nav className="w-full bg-white px-4 py-3 flex items-center justify-between shadow">
      <div className="flex items-center space-x-4">
        <Link href="/" className="text-lg font-bold">TaskZen</Link>
      </div>

      <div className="flex items-center space-x-4">
        {/* other nav items */}
        <Link href="/notifications" className="relative">
          <svg className="w-6 h-6 text-gray-700" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 17H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 22a2 2 0 0 0 2-2H10a2 2 0 0 0 2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M18 8a6 6 0 1 0-12 0v5l-2 2v1h16v-1l-2-2V8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>

          {unread > 0 && (
            <span className="absolute -top-1 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
              {unread}
            </span>
          )}
        </Link>

        {/* profile / signout */}
      </div>
    </nav>
  );
}
