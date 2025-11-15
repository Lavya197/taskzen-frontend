"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar({ currentUserId }: { currentUserId: string | null }) {
  const [unread, setUnread] = useState(2);

  // ⬇️ ADD THIS
  const fetchUnread = async () => {
    try {
      // Replace with real API later
      setUnread(2);
    } catch (error) {
      console.error("Error fetching unread notifications:", error);
    }
  };

  useEffect(() => {
    if (!currentUserId) return;

    fetchUnread();
    const iv = setInterval(fetchUnread, 30000);

    return () => clearInterval(iv);
  }, [currentUserId]);

  return (
    <nav className="w-full bg-white px-4 py-3 flex items-center justify-between shadow">
      <div className="flex items-center space-x-4">
        <Link href="/" className="text-lg font-bold">TaskZen</Link>
      </div>

      <div className="flex items-center space-x-4">
        <Link href="/notifications" className="relative">
          <svg className="w-6 h-6 text-gray-700" viewBox="0 0 24 24" fill="none">
            <path d="M15 17H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 22a2 2 0 0 0 2-2H10a2 2 0 0 0 2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M18 8a6 6 0 1 0-12 0v5l-2 2v1h16v-1l-2-2V8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>

          {unread > 0 && (
            <span className="absolute -top-1 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold text-red-100 bg-red-600 rounded-full">
              {unread}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}
