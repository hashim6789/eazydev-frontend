// src/components/UI/Input.tsx - Reusable Input component
import React from "react";
import { FieldError, UseFormRegister } from "react-hook-form";

interface InputProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  rules?: Record<string, any>;
  error?: FieldError;
  type?: string;
  placeholder?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  name,
  register,
  rules,
  error,
  type = "text",
  placeholder,
}) => {
  return (
    <div className="space-y-1">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name, rules)}
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
          error
            ? "border-red-300 focus:border-red-300 focus:ring-red-200"
            : "border-gray-300 focus:border-blue-300 focus:ring-blue-200"
        }`}
      />
      {error && <p className="text-sm text-red-600">{error.message}</p>}
    </div>
  );
};

export default Input;
