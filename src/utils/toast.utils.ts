// toast.util.ts
import { toast } from "react-hot-toast";

export const showSuccessToast = (message: string) => {
  toast.success(message, {
    position: "bottom-center",
    duration: 4000,
  });
};

export const showErrorToast = (message: string) => {
  toast.error(message, {
    position: "bottom-center",
    duration: 4000,
  });
};

export const showInfoToast = (message: string) => {
  toast(message, {
    position: "top-right",
    duration: 4000,
    icon: "ℹ️",
  });
};

export const showLoadingToast = (message: string) => {
  toast.loading(message, {
    position: "top-right",
  });
};

export const dismissToast = () => {
  toast.dismiss();
};

export const showCustomToast = (message: string, icon?: string) => {
  toast(message, {
    position: "top-right",
    duration: 4000,
    icon: icon,
  });
};
