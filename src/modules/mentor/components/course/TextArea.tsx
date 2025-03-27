import React from "react";
import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFormRegister,
} from "react-hook-form";

interface TextareaProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  rules?: Record<string, any>;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  placeholder?: string;
  rows?: number;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  name,
  register,
  rules,
  error,
  placeholder,
  rows = 3,
}) => {
  return (
    <div className="space-y-1">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <textarea
        id={name}
        placeholder={placeholder}
        rows={rows}
        {...register(name, rules)}
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
          error
            ? "border-red-300 focus:border-red-300 focus:ring-red-200"
            : "border-gray-300 focus:border-blue-300 focus:ring-blue-200"
        }`}
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
