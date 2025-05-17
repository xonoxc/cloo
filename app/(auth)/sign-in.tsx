import React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "~/components/ui/input"
import { authService } from "~/services/auth/auth"
import Toast, { ToastProps } from "~/components/ui/toast"
import { Cross, ThumbsUp } from "lucide-react-native"

const signInSchema = z.object({
   email: z.string().email("Enter a valid email"),
   password: z.string().min(6, "Password must be 6+ characters"),
})

type SignInFormData = z.infer<typeof signInSchema>

export default function SignInScreen() {
   const [toast, setToast] = React.useState<ToastProps | undefined>(undefined)

   const {
      handleSubmit,
      formState: { isSubmitting },
   } = useForm<SignInFormData>({
      resolver: zodResolver(signInSchema),
   })

   const onSubmit = async (data: SignInFormData) => {
      const { email, password } = data

      const err = await authService.signIn(email, password)
      if (err) {
         setToast({
            ...err,
            icon: Cross,
         })
      }
      setToast({
         title: "Success",
         description: "You have successfully signed in",
         icon: ThumbsUp,
      })
   }

   React.useEffect(() => {
      if (toast)
         setTimeout(() => {
            setToast(undefined)
         }, 3000)
   }, [toast])

   return (
      <View className="flex-1 justify-center px-6 bg-white dark:bg-black">
         {toast && (
            <Toast title={toast?.title} description={toast?.description} icon={toast.icon} />
         )}

         <Text className="text-2xl font-bold mb-6 text-black dark:text-white">Sign In</Text>

         <Input placeholder="Email" keyboardType="email-address" />
         <Input placeholder="Password" secureTextEntry />

         <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            className="bg-blue-600 py-3 rounded-xl mt-4"
         >
            <Text className="text-center text-white font-medium">Sign In</Text>
         </TouchableOpacity>
      </View>
   )
}
