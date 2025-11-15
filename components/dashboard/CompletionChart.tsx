"use client";

import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

// ⭐ ADD TYPE FOR PROPS
interface CompletionChartProps {
  completed: number;
  pending: number;
  inProgress: number;
}

export default function CompletionChart({
  completed,
  pending,
  inProgress,
}: CompletionChartProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    if (chartRef.current) chartRef.current.destroy();

    chartRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Completed", "Pending", "In Progress"],
        datasets: [
          {
            label: "Tasks",
            data: [completed, pending, inProgress],
            backgroundColor: "#10b981",
            borderRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
            labels: {
              boxWidth: 12,
              padding: 12,
              font: { size: 12 },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { font: { size: 11 } },
            grid: { color: "#f3f4f6" },
          },
          x: {
            ticks: { font: { size: 11 } },
            grid: { display: false },
          },
        },
      },
    });

    return () => chartRef.current?.destroy();
  }, [completed, pending, inProgress]);

  return (
    <div className="p-6 bg-white rounded shadow w-full" style={{ height: "350px" }}>
      <h2 className="text-xl font-semibold mb-4">Task Breakdown</h2>
      <div className="w-full h-[260px]">
        <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  );
}
