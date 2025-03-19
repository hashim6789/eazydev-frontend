// src/components/UI/RadioGroup.tsx - Reusable RadioGroup component
import React from "react";
import { FieldError, UseFormRegister } from "react-hook-form";

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  rules?: Record<string, any>;
  error?: FieldError;
  options: RadioOption[];
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  label,
  name,
  register,
  rules,
  error,
  options,
}) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="space-y-2">
        {options.map((option) => (
          <div key={option.value} className="flex items-center">
            <input
              id={`${name}-${option.value}`}
              type="radio"
              value={option.value}
              {...register(name, rules)}
              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <label
              htmlFor={`${name}-${option.value}`}
              className="ml-2 block text-sm text-gray-700"
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
      {error && <p className="text-sm text-red-600">{error.message}</p>}
    </div>
  );
};
