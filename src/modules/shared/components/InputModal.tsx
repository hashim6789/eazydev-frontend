import React, { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  title: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
  children: ReactNode;
}

export const InputModal: React.FC<ModalProps> = ({
  isOpen,
  title,
  onSubmit,
  onClose,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-xl w-96 max-w-full mx-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          {children}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
