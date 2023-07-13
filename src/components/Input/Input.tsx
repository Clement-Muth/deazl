import clsx from "clsx";
import { LegacyRef, forwardRef } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import Label from "~/components/Input/Label";

interface InputProps extends UseFormRegisterReturn {
  placeholder?: string;
  label?: string;
  error?: string;
  errorWithoutMessage?: boolean;
}

const Input = forwardRef(
  (
    { placeholder, label, error, errorWithoutMessage, ...register }: InputProps,
    ref: LegacyRef<HTMLInputElement>
  ) => {
    return (
      <div className="flex flex-col w-full items-start">
        {label || error ? <Label error={error} label={label} name={register.name} /> : null}
        <div
          className={clsx(
            "rounded-md border text-sm shadow-sm bg-white text-black hover:bg-gray-50 w-full",
            error || errorWithoutMessage ? "border-red9" : "border-gray-200"
          )}
        >
          <input
            id={register.name}
            aria-invalid
            className="rounded-md h-[36px] px-4 w-full"
            placeholder={placeholder}
            {...register}
            ref={ref}
          />
        </div>
      </div>
    );
  }
);

export default Input;