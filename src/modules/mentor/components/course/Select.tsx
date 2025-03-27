import React from "react";
import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFormRegister,
} from "react-hook-form";
import { Category } from "../../../../types";

interface SelectOption {
  value: Category; // Store the entire Category object
  label: string;
}

interface SelectProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  rules?: Record<string, any>;
  // Updated error type to handle broader types returned by React Hook Form
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined;
  options: SelectOption[];
  placeholder?: string;
  onChange?: (value: { id: string; title: string }) => void;
}

export const Select: React.FC<SelectProps> = ({
  label,
  name,
  register,
  rules,
  error,
  options,
  placeholder,
  onChange,
}) => {
  return (
    <div className="space-y-1">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        id={name}
        {...register(name, rules)}
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
          error
            ? "border-red-300 focus:border-red-300 focus:ring-red-200"
            : "border-gray-300 focus:border-blue-300 focus:ring-blue-200"
        }`}
        onChange={(e) => {
          const selectedValue = options.find(
            (option) => option.value.id === e.target.value
          )?.value;
          if (onChange && selectedValue) {
            onChange(selectedValue as Category); // Explicitly cast as Category
          }
        }}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value.id} value={option.value.id}>
            {option.label}
          </option>
        ))}
      </select>
      {/* Error rendering with type guard */}
      {error &&
        typeof error === "object" &&
        "message" in error &&
        error.message && (
          <p className="text-sm text-red-600">{String(error.message)}</p>
        )}
    </div>
  );
};
