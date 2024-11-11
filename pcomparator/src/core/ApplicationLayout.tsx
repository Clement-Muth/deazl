import type { ReactNode } from "react";
import { SignButton } from "~/applications/Authentication/Ui/Signin/SignButton/SignButton";
import { Header } from "~/components/Header/Header";
import { Toast } from "~/components/Toast/Toast";
import { Tabbar } from "~/core/Tabbar";
import { getDevice } from "~/core/getDevice";

export interface ApplicationLayoutProps {
  children: ReactNode;
}

const ApplicationLayout = async ({ children }: ApplicationLayoutProps) => {
  const device = await getDevice();

  return (
    <>
      <Header rightArea={<SignButton />} />
      {children}
      {device === "mobile" ? <Tabbar /> : null}
      <Toast />
    </>
  );
};

export default ApplicationLayout;
