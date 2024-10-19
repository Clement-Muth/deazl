"use client";

import type { ReactNode } from "react";
import { Header } from "~/components/Header/Header";

export interface ApplicationLayoutProps {
  children: ReactNode;
}

const ApplicationLayout = ({ children }: ApplicationLayoutProps) => {
  return (
    <>
      <Header>{/* <ThemeSwitcher /> */}</Header>
      {children}
    </>
  );
};

export default ApplicationLayout;