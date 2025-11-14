export default function RecentTasks() {
  const sample = [
    { id: 1, title: "Fix UI bugs", status: "completed" },
    { id: 2, title: "Create onboarding flow", status: "in-progress" },
    { id: 3, title: "Prepare demo", status: "pending" },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
      <h3 className="font-medium mb-4">Recent Tasks</h3>

      <div className="space-y-3">
        {sample.map((task) => (
          <div
            key={task.id}
            className="flex justify-between items-center py-2 border-b last:border-0"
          >
            <p>{task.title}</p>
            <span
              className={`px-3 py-1 text-xs rounded-md ${
                task.status === "completed"
                  ? "bg-green-100 text-green-700"
                  : task.status === "in-progress"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {task.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
