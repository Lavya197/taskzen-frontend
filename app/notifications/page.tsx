"use client";

import { useEffect, useState } from "react";

export default function NotificationsPage() {
  // Hardcoded demo notifications
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      message: "Task 'Fix Login Flow' in project 'TaskZen' was marked Completed.",
      is_read: false,
      created_at: new Date().toISOString(),
    },
    {
      id: "2",
      message: "Task 'Create Dashboard Graphs' in project 'LynxFlow' was marked Completed.",
      is_read: false,
      created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
    },
    {
      id: "3",
      message: "Task 'User Authentication Integration' in project 'TaskZen' was marked Completed.",
      is_read: true,
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hrs ago
    },
  ]);

  function markRead(id: string) {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, is_read: true } : n
      )
    );
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Notifications</h1>

      {notifications.length === 0 && (
        <p className="text-gray-600">No notifications.</p>
      )}

      {notifications.map((n) => (
        <div
          key={n.id}
          className={`p-4 border rounded-lg ${
            n.is_read ? "bg-white" : "bg-blue-50"
          }`}
        >
          <div className="flex justify-between">
            <div>
              <p className="text-sm">{n.message}</p>
              <p className="text-xs mt-1 text-gray-500">
                {new Date(n.created_at).toLocaleString()}
              </p>
            </div>

            {!n.is_read && (
              <button
                onClick={() => markRead(n.id)}
                className="px-3 py-1 text-sm rounded bg-blue-600 text-white"
              >
                Mark Read
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
