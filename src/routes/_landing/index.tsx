import { LandingIndex } from "@/components/pages/landing/index";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_landing/")({
  component: LandingIndex,
});
