"use client";

import { useToast } from "@/hooks/use-toast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";

interface ToastType {
  id: string;
  title?: React.ReactNode; // Updated to ReactNode
  description?: React.ReactNode; // Updated to ReactNode
  action?: React.ReactNode;
  [key: string]: any; // For any additional props
}

export function Toaster() {
  const { toasts } = useToast();

  return (
      <ToastProvider>
        {toasts.map(({ id, title, description, action, ...props }: ToastType) => (
            <Toast key={id} {...props}>
              <div className="grid gap-1">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && (
                    <ToastDescription>{description}</ToastDescription>
                )}
              </div>
              {action}
              <ToastClose />
            </Toast>
        ))}
        <ToastViewport />
      </ToastProvider>
  );
}
