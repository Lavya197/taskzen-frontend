"use client";

import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function ProgressChart({ completed, total }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");

    const remaining = Math.max(total - completed, 0);

    // Destroy old chart to avoid memory issues
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Completed", "Remaining"],
        datasets: [
          {
            data: [completed, remaining],
            backgroundColor: ["#10b981", "#e5e7eb"], // consistent theme
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
