import React, { useContext } from "react"
import { createContext } from "react"
import { ToastProps } from "~/components/ui/toast"
import Toast from "~/components/ui/toast"

export interface ToastContextProps {
   toast: ToastProps | null
   showToast: (toast: ToastProps, duration?: number) => void
   dismissToast: () => void
}

type Timeout = ReturnType<typeof setTimeout> | null

const ToastContext = createContext<ToastContextProps | undefined>(undefined)

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
   const [toast, setToast] = React.useState<ToastProps | null>(null)
   const timeoutRef = React.useRef<Timeout>(null)

   const showToast = (toastProps: ToastProps, duration = 3000) => {
      setToast(toastProps)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => {
         setToast(null)
         timeoutRef.current = null
      }, duration)
   }

   const dismissToast = () => {
      setToast(null)
      if (timeoutRef.current) {
         clearTimeout(timeoutRef.current)
         timeoutRef.current = null
      }
   }

   React.useEffect(() => {
      return () => {
         if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
         }
      }
   }, [])

   return (
      <ToastContext.Provider value={{ toast, dismissToast, showToast }}>
         {children}
      </ToastContext.Provider>
   )
}

export function useToast() {
   const context = useContext(ToastContext)
   if (!context) {
      throw new Error("useToast must be used within a ToastProvider")
   }
   return context
}

export const ToastContainer = () => {
   const { toast } = useToast()
   return toast && <Toast title={toast.title} description={toast.description} icon={toast.icon} />
}
