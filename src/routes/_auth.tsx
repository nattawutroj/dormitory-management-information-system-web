import { LoginLayout } from "@/components/pages/login/layout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
  component: LoginLayout,
});
