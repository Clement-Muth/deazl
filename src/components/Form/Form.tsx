import clsx from "clsx";
import type { ComponentType, ReactNode } from "react";
import {
  type FieldValues,
  Form as FormHookForm,
  type FormProps as FormHookProps,
  FormProvider,
  type UseFormReturn
} from "react-hook-form";
import type { FormActionsProps } from "~/components/Form/FormActions";
import FormActions from "~/components/Form/FormActions";

export interface FormProps<T> extends Omit<FormHookProps<any, any>, "onSubmit"> {
  onSubmit: (data: T) => void;
  children: ReactNode;
  className?: string;
  methods: UseFormReturn<any, any, undefined>;
  actions?: FormActionsProps;
  wrapper?: ComponentType<{ children: ReactNode }>;
  disableActions?: boolean;
}

const Form = <T extends FieldValues>({
  methods,
  children,
  onSubmit,
  className,
  disableActions,
  actions,
  wrapper: Wrapper
}: FormProps<T>) => {
  // NOTE – Prevent bypass disabled submit button
  const isValid = !Object.keys(methods.formState.errors)
    .filter((key) => methods.formState.errors[key])
    .some((v) => v);
  const content = (
    <FormProvider {...methods}>
      <FormHookForm
        onSubmit={({ data }) => isValid && onSubmit(data as T)}
        className={clsx("flex flex-col gap-4", className)}
      >
        {children}
        <FormActions disableActions={disableActions} {...actions} />
      </FormHookForm>
    </FormProvider>
  );

  return Wrapper ? <Wrapper>{content}</Wrapper> : <>{content}</>;
};

export default Form;
