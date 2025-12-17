"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

type Toast = {
  id: number;
  message: string;
};

type ToastContextValue = {
  showToast: (message: string) => void;
};

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string) => {
    setToasts((prev) => [...prev, { id: Date.now(), message }]);
  }, []);

  useEffect(() => {
    if (toasts.length === 0) return;

    const timers = toasts.map((toast) =>
      setTimeout(() => {
        setToasts((prev) => prev.filter((item) => item.id !== toast.id));
      }, 2500)
    );

    return () => timers.forEach((timer) => clearTimeout(timer));
  }, [toasts]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="pointer-events-none fixed bottom-5 right-5 z-[999] flex flex-col gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="rounded-2xl border border-white/10 bg-[#0f1119]/90 px-4 py-3 text-sm font-medium text-white shadow-[0_18px_40px_rgba(0,0,0,0.4)] backdrop-blur"
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return ctx;
}
