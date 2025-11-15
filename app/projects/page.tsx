"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CreateProjectModal from "@/components/projects/CreateProjectModal";
import { apiGet } from "@/lib/api";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    try {
      // apiGet already returns JSON
      const json = await apiGet("/projects");

      if (json.success) {
        setProjects(json.data);
      } else {
        console.error("API error:", json.message);
      }
    } catch (err) {
      console.error("Failed to fetch projects", err);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <h1 className="text-xl font-semibold">Projects</h1>

        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
        >
          + New Project
        </button>
      </div>

      {/* PROJECT LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <div
            key={project.id}
            onClick={() => router.push(`/projects/${project.id}`)}
            className="p-5 bg-white border border-gray-200 rounded-lg shadow-sm 
                       hover:shadow-md transition cursor-pointer"
          >
            <h2 className="text-lg font-semibold">{project.name}</h2>
            <p className="text-gray-500 mt-1">{project.description}</p>
          </div>
        ))}
      </div>

      <CreateProjectModal
        open={open}
        setOpen={setOpen}
        refresh={(newProject) => {
          fetchProjects();
          if (newProject?.id) router.push(`/projects/${newProject.id}`);
        }}
      />
    </div>
  );
}
