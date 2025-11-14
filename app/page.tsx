// frontend/app/page.tsx
import { redirect } from "next/navigation";

export default function HomePage() {
  // redirect visitors to login
  redirect("/login");
}
