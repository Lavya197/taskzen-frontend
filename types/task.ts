import type { StatusType } from "@/tasks/StatusBadge";

export type TaskType = {
  id: string;
  title: string;
  description: string;
  status: StatusType;
  project_id: string;
  created_at: string;
  project_name?: string; // optional fallback
  projects?: {
    name: string;
  };
};
