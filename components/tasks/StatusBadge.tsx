"use client";

export default function StatusBadge({ status }: { status: string }) {
  const map = {
    todo: "bg-gray-100 text-gray-700",
    in_progress: "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
  };

  const cls = map[status] ?? "bg-gray-100 text-gray-700";

  return <span className={`px-2 py-1 text-xs rounded ${cls}`}>{status}</span>;
}
