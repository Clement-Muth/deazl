"use client";

import { Trans } from "@lingui/macro";
import { Button, type ButtonProps } from "@nextui-org/react";
import clsx from "clsx";
import _ from "lodash";
import type { ComponentType, ReactNode } from "react";
import { useFormContext } from "react-hook-form";
import useDevice from "~/hooks/useDevice";

export interface FormActionsProps {
  prevProps?: Omit<ButtonProps, "ref" | "title" | "as"> & {
    title: ReactNode | string;
    as?: ReactNode | undefined;
  };
  nextProps?: Omit<ButtonProps, "ref" | "title"> & {
    title?: ReactNode | string;
  };
  className?: string;
  disableActions?: boolean;
  wrapper?: ComponentType<{ children: ReactNode }>;
  wrapperProps?: any;
}

const FormActions = ({
  nextProps,
  prevProps,
  disableActions,
  className,
  wrapper: Wrapper,
  wrapperProps
}: FormActionsProps) => {
  const form = useFormContext();
  const device = useDevice();
  const asPrev = prevProps?.as;

  const content = (
    <div
      className={clsx(
        "flex flex-col-reverse gap-2 md:flex-row",
        prevProps ? "justify-between" : "justify-end",
        "flex w-full",
        className
      )}
    >
      {prevProps ? (
        asPrev ? (
          asPrev
        ) : (
          <Button
            variant={device === "desktop" ? "light" : "bordered"}
            color={device === "desktop" ? "default" : "default"}
            type="button"
            fullWidth={device === "mobile"}
            disabled={form.formState.isSubmitting}
            {..._.omit(prevProps, "title", "as")}
            className={clsx("md:underline md:text-black-primary", prevProps.className)}
          >
            {prevProps.title}
          </Button>
        )
      ) : null}
      <Button
        type="submit"
        fullWidth={device === "mobile"}
        isLoading={form.formState.isSubmitting}
        disabled={Object.keys(form.formState.errors)
          .filter((key) => form.formState.errors[key])
          .some((v) => v)}
        {..._.omit(nextProps, "title")}
        className={clsx(nextProps?.className)}
      >
        {nextProps?.title ?? <Trans>Next</Trans>}
      </Button>
    </div>
  );

  return !disableActions ? Wrapper ? <Wrapper {...wrapperProps}>{content}</Wrapper> : content : null;
};

export default FormActions;
