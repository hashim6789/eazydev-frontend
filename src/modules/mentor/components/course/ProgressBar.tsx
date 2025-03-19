// src/components/UI/ProgressBar.tsx - Reusable ProgressBar component
import React from "react";
import { CheckCircleIcon } from "lucide-react";

interface Step {
  id: number;
  name: string;
}

interface ProgressBarProps {
  steps: Step[];
  currentStep: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  steps,
  currentStep,
}) => {
  return (
    <nav aria-label="Progress">
      <ol className="flex items-center">
        {steps.map((step, stepIdx) => (
          <li
            key={step.id}
            className={`${
              stepIdx !== steps.length - 1 ? "flex-1" : ""
            } relative`}
          >
            {step.id < currentStep ? (
              <div className="group flex items-center">
                <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-blue-600 rounded-full">
                  <CheckCircleIcon
                    className="w-6 h-6 text-white"
                    aria-hidden="true"
                  />
                </span>
                <span className="ml-4 text-sm font-medium text-gray-900">
                  {step.name}
                </span>

                {stepIdx !== steps.length - 1 && (
                  <div className="hidden md:block absolute top-5 right-0 w-full h-0.5 bg-blue-600" />
                )}
              </div>
            ) : step.id === currentStep ? (
              <div className="flex items-center" aria-current="step">
                <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-blue-600 rounded-full">
                  <span className="text-blue-600">{step.id}</span>
                </span>
                <span className="ml-4 text-sm font-medium text-blue-600">
                  {step.name}
                </span>

                {stepIdx !== steps.length - 1 && (
                  <div className="hidden md:block absolute top-5 right-0 w-full h-0.5 bg-gray-200" />
                )}
              </div>
            ) : (
              <div className="group flex items-center">
                <span className="flex-shrink-0 w-10 h-10 flex items-center justify-center border-2 border-gray-300 rounded-full">
                  <span className="text-gray-500">{step.id}</span>
                </span>
                <span className="ml-4 text-sm font-medium text-gray-500">
                  {step.name}
                </span>

                {stepIdx !== steps.length - 1 && (
                  <div className="hidden md:block absolute top-5 right-0 w-full h-0.5 bg-gray-200" />
                )}
              </div>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
