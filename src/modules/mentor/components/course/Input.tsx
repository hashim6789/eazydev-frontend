import React from "react";
import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFormRegister,
} from "react-hook-form";

interface InputProps<T> {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  rules?: Record<string, any>;
  error?:
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | string
    | undefined;
  type?: string;
  placeholder?: string;
  initialValue?: T;
}

export const Input: React.FC<
  InputProps<string | number | boolean | undefined>
> = ({
  label,
  name,
  register,
  rules,
  error,
  type = "text",
  placeholder,
  initialValue,
}) => {
  return (
    <div className="space-y-1">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={name}
        type={type}
        defaultValue={initialValue as string | number | undefined}
        {...register(name, rules)}
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
          error
            ? "border-red-300 focus:border-red-300 focus:ring-red-200"
            : "border-gray-300 focus:border-blue-300 focus:ring-blue-200"
        }`}
        placeholder={placeholder}
      />
      {error &&
        typeof error === "object" &&
        "message" in error &&
        error.message && (
          <p className="text-sm text-red-600">{String(error.message)}</p>
        )}
    </div>
  );
};
