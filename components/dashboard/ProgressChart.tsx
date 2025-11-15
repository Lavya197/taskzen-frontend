"use client";

import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

// ⭐ Add Types for Props
interface ProgressChartProps {
  completed: number;
  total: number;
}

export default function ProgressChart({ completed, total }: ProgressChartProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    const remaining = Math.max(total - completed, 0);

    // Destroy old chart
    if (chartRef.current) chartRef.current.destroy();

    chartRef.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Completed", "Remaining"],
        datasets: [
          {
            data: [completed, remaining],
            backgroundColor: ["#10b981", "#e5e7eb"],
            borderWidth: 2,
            borderColor: "#ffffff",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "70%",
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
      },
    });

    return () => chartRef.current?.destroy();
  }, [completed, total]);

  return (
    <div className="p-6 bg-white rounded shadow w-full" style={{ height: "350px" }}>
      <h2 className="text-xl font-semibold mb-4">Overall Progress</h2>
      <div className="w-full h-[260px]">
        <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  );
}
