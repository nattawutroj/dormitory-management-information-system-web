import { LoginIndex } from "@/components/pages/login";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/login")({
  component: LoginIndex,
});
