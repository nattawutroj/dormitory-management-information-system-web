import { Outlet } from "@tanstack/react-router";
import { NavbarLanding } from "./element/navbar";

export const LandingLayout = () => {
  return (
    <>
      <NavbarLanding />
      <Outlet />
    </>
  );
};
