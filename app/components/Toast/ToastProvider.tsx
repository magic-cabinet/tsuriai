import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react"
import { StyleSheet, View } from "react-native"

import { Toast, ToastProps } from "./Toast"

export interface ToastOptions extends Omit<ToastProps, "onDismiss"> {
  /**
   * Unique identifier for the toast (auto-generated if not provided).
   */
  id?: string
}

export interface ToastContextType {
  /**
   * Show a toast notification.
   */
  showToast: (options: ToastOptions) => string
  /**
   * Hide a specific toast by ID.
   */
  hideToast: (id: string) => void
  /**
   * Hide all toasts.
   */
  hideAllToasts: () => void
  /**
   * Convenience method to show a success toast.
   */
  success: (text: string, options?: Omit<ToastOptions, "text" | "type">) => string
  /**
   * Convenience method to show an error toast.
   */
  error: (text: string, options?: Omit<ToastOptions, "text" | "type">) => string
  /**
   * Convenience method to show a warning toast.
   */
  warning: (text: string, options?: Omit<ToastOptions, "text" | "type">) => string
  /**
   * Convenience method to show an info toast.
   */
  info: (text: string, options?: Omit<ToastOptions, "text" | "type">) => string
}

const ToastContext = createContext<ToastContextType | null>(null)

interface ToastItem extends ToastOptions {
  id: string
}

/**
 * ToastProvider component that manages toast notifications with queue support.
 * Wrap your app with this provider to enable toast notifications.
 * @param {PropsWithChildren} props - The props for the `ToastProvider` component.
 * @returns {JSX.Element} The rendered `ToastProvider` component.
 * @example
 * <ToastProvider>
 *   <App />
 * </ToastProvider>
 */
export const ToastProvider: FC<PropsWithChildren> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const showToast = useCallback((options: ToastOptions): string => {
    const id = options.id || `toast-${Date.now()}-${Math.random()}`
    const newToast: ToastItem = {
      ...options,
      id,
    }

    setToasts((prevToasts) => [...prevToasts, newToast])
    return id
  }, [])

  const hideToast = useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
  }, [])

  const hideAllToasts = useCallback(() => {
    setToasts([])
  }, [])

  const success = useCallback(
    (text: string, options?: Omit<ToastOptions, "text" | "type">): string => {
      return showToast({ ...options, text, type: "success" })
    },
    [showToast],
  )

  const error = useCallback(
    (text: string, options?: Omit<ToastOptions, "text" | "type">): string => {
      return showToast({ ...options, text, type: "error" })
    },
    [showToast],
  )

  const warning = useCallback(
    (text: string, options?: Omit<ToastOptions, "text" | "type">): string => {
      return showToast({ ...options, text, type: "warning" })
    },
    [showToast],
  )

  const info = useCallback(
    (text: string, options?: Omit<ToastOptions, "text" | "type">): string => {
      return showToast({ ...options, text, type: "info" })
    },
    [showToast],
  )

  const value = useMemo(
    () => ({
      showToast,
      hideToast,
      hideAllToasts,
      success,
      error,
      warning,
      info,
    }),
    [showToast, hideToast, hideAllToasts, success, error, warning, info],
  )

  return (
    <ToastContext.Provider value={value}>
      {children}
      <View style={styles.toastContainer} pointerEvents="box-none">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            {...toast}
            onDismiss={() => hideToast(toast.id)}
          />
        ))}
      </View>
    </ToastContext.Provider>
  )
}

/**
 * Hook to access the toast context.
 * Must be used within a ToastProvider.
 * @returns {ToastContextType} The toast context.
 * @example
 * const { showToast, success, error } = useToast()
 * success("Operation completed!")
 */
export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

const styles = StyleSheet.create({
  toastContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 9999,
  },
})
