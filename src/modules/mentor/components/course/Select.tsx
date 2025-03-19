// src/components/UI/Select.tsx - Reusable Select component
import React from "react";
import { FieldError, UseFormRegister } from "react-hook-form";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  rules?: Record<string, any>;
  error?: FieldError;
  options: SelectOption[];
  placeholder?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  name,
  register,
  rules,
  error,
  options,
  placeholder,
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
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-sm text-red-600">{error.message}</p>}
    </div>
  );
};
