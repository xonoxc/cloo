import { LucideIcon } from "lucide-react-native"
import { Alert, AlertDescription, AlertTitle } from "./alert"

export type ToastProps = {
   title: string
   description: string
   icon: LucideIcon
}

const Toast = ({ title, description, icon }: ToastProps) => {
   return (
      <Alert icon={icon} className="max-w-xl">
         <AlertTitle>{title}</AlertTitle>
         <AlertDescription>{description}</AlertDescription>
      </Alert>
   )
}

export default Toast
