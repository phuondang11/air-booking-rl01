import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

const ToastsContext = createContext(null);

let idCounter = 1;

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const add = useCallback((t) => {
    const id = String(idCounter++);
    const item = { id, ...t };
    setToasts((s) => [...s, item]);
    return id;
  }, []);

  const remove = useCallback((id) => setToasts((s) => s.filter((t) => t.id !== id)), []);

  useEffect(() => {
    const timers = toasts.map((t) => {
      if (t.duration === 0) return null;
      const timeout = setTimeout(() => remove(t.id), t.duration || 3000);
      return timeout;
    });
    return () => timers.forEach((t) => t && clearTimeout(t));
  }, [toasts, remove]);

  return (
    <ToastsContext.Provider value={{ toasts, add, remove }}>
      {children}
    </ToastsContext.Provider>
  );
};

export const useToasts = () => {
  const ctx = useContext(ToastsContext);
  if (!ctx) throw new Error("useToasts must be used within ToastProvider");
  return ctx;
};
