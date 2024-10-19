import { LandingLayout } from "@/components/pages/landing/layout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_landing")({
  component: LandingLayout,
});
