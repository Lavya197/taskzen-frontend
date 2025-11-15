"use client";

type ActivityItem = {
  id: string;
  message: string;
  created_at: string;
  meta?: {
    task_title: string;
    task_id: string;
    project_name: string;
  };
};

import { useEffect, useState, useRef } from "react";
import Chart from "chart.js/auto";
import { apiGet } from "@/lib/api";


export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalTasks: 0,
    completed: 0,
    pending: 0,
    inprogress: 0,
    progressPercent: 0,
  });

  // -------------------------------
  // ⭐ HARDCODED ACTIVITY
  // -------------------------------
  const [activity, setActivity] = useState<ActivityItem[]>([]);

  const [showAllActivity, setShowAllActivity] = useState(false);

  const overallRef = useRef<HTMLCanvasElement | null>(null);
const breakdownRef = useRef<HTMLCanvasElement | null>(null);


  const overallChart = useRef<Chart | null>(null);
const breakdownChart = useRef<Chart | null>(null);


  useEffect(() => {
    loadStats();
    loadActivity(); // now hardcoded
  }, []);

  // -------------------------------
  // LOAD STATS FROM BACKEND
  // -------------------------------
  async function loadStats() {
    try {
      const taskJson = await await apiGet("/tasks");

      const projectJson = await await apiGet("/projects");

      if (taskJson.success && projectJson.success) {
        type DashboardTask = {
  status: string;
  [key: string]: any;
};

        const tasks = taskJson.data as DashboardTask[];

        const completed = tasks.filter((t: DashboardTask) => t.status === "completed").length;
        const pending = tasks.filter((t: DashboardTask) => t.status === "todo").length;
        const inprogress = tasks.filter((t: DashboardTask) => t.status === "inprogress").length;

        const total = tasks.length;
        const progressPercent =
          total === 0 ? 0 : Math.round((completed / total) * 100);

        setStats({
          totalProjects: projectJson.data.length,
          totalTasks: total,
          completed,
          pending,
          inprogress,
          progressPercent,
        });

        renderCharts(completed, pending, inprogress);
      }
    } catch (error) {
      console.error("Failed to load stats", error);
    }
  }

  // -------------------------------
  // ⭐ HARD-CODED RECENT ACTIVITY
  // -------------------------------
  function loadActivity() {
    setActivity([
      {
        id: "1",
        message: "Status changed from todo → completed",
        created_at: new Date().toISOString(),
        meta: {
          task_title: "Fix Login Redirect",
          task_id: "task123",
          project_name: "Auth Module",
        },
      },
      {
        id: "2",
        message: "Task assigned to you",
        created_at: new Date().toISOString(),
        meta: {
          task_title: "Build Dashboard Cards",
          task_id: "task456",
          project_name: "Dashboard UI",
        },
      },
      {
        id: "3",
        message: "Status changed from inprogress → completed",
        created_at: new Date().toISOString(),
        meta: {
          task_title: "Deploy Backend API",
          task_id: "task789",
          project_name: "API Engine",
        },
      },
      {
        id: "4",
        message: "New task created",
        created_at: new Date().toISOString(),
        meta: {
          task_title: "Optimize Task Fetch",
          task_id: "task101",
          project_name: "Performance Upgrade",
        },
      },
    ]);
  }

  // Limit / show more
  const visibleActivity = showAllActivity ? activity : activity.slice(0, 3);

  // -------------------------------
  // CHARTS
  // -------------------------------
  function renderCharts(
  completed: number,
  pending: number,
  inprogress: number
) {
  // REQUIRE canvases to exist
  if (!overallRef.current || !breakdownRef.current) {
    console.warn("Canvas refs not ready yet");
    return;
  }

  // Destroy previous charts
  if (overallChart.current) overallChart.current.destroy();
  if (breakdownChart.current) breakdownChart.current.destroy();

  // Create Overall Chart
  overallChart.current = new Chart(overallRef.current as HTMLCanvasElement, {
    type: "doughnut",
    data: {
      labels: ["Completed", "Remaining"],
      datasets: [
        {
          data: [completed, pending + inprogress],
          backgroundColor: ["#10B981", "#CBD5E1"],
          borderWidth: 0,
        },
      ],
    },
    options: {
      cutout: "70%",
      maintainAspectRatio: false,
    },
  });

  // Create Breakdown Chart
  breakdownChart.current = new Chart(
    breakdownRef.current as HTMLCanvasElement,
    {
      type: "bar",
      data: {
        labels: ["Completed", "Pending", "In Progress"],
        datasets: [
          {
            label: "Tasks",
            data: [completed, pending, inprogress],
            backgroundColor: "#10B981",
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        scales: { y: { beginAtZero: true } },
        plugins: { legend: { display: false } },
      },
    }
  );
}


  return (
    <div className="space-y-6 p-4">
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Stat title="Total Projects" value={stats.totalProjects} />
        <Stat title="Total Tasks" value={stats.totalTasks} />
        <Stat title="Completed Tasks" value={stats.completed} />
        <Stat title="Pending Tasks" value={stats.pending} />
        <Stat title="In Progress" value={stats.inprogress} />
        <Stat title="Overall Progress" value={`${stats.progressPercent}%`} />
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded shadow h-[350px]">
          <h2 className="text-xl font-semibold mb-2">Overall Progress</h2>
          <div className="h-[280px]">
            <canvas ref={overallRef}></canvas>
          </div>
        </div>

        <div className="bg-white p-6 rounded shadow h-[350px]">
          <h2 className="text-xl font-semibold mb-2">Task Breakdown</h2>
          <div className="h-[280px]">
            <canvas ref={breakdownRef}></canvas>
          </div>
        </div>
      </div>

      {/* RECENT ACTIVITY */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>

        {visibleActivity.length === 0 && (
          <p className="text-gray-500 text-sm">No recent activity available.</p>
        )}

        <ul className="space-y-3">
          {visibleActivity.map((a) => (
            <li key={a.id} className="p-3 border rounded bg-slate-50">
              {/* Task link */}
              <a
                href={`/tasks/${a.meta?.task_id ?? ""}`}
                className="font-medium text-blue-600 underline"
              >
                {a.meta?.task_title ?? "Untitled Task"}

              </a>

              <div className="text-sm text-gray-700">{a.message}</div>

              <div className="text-xs text-gray-500">
                Project: {a.meta?.project_name ?? "Unknown Project"}
              </div>

              <div className="text-xs text-gray-400 mt-1">
                {new Date(a.created_at).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>

        {/* VIEW MORE */}
        {!showAllActivity && activity.length > 3 && (
          <div className="mt-4">
            <button
              onClick={() => setShowAllActivity(true)}
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded"
            >
              View More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

interface StatProps {
  title: string;
  value: string | number;
}

function Stat({ title, value }: StatProps) {
  return (
    <div className="p-4 bg-white rounded shadow text-center">
      <div className="text-gray-500 text-sm">{title}</div>
      <div className="text-2xl font-semibold">{value}</div>
    </div>
  );
}
