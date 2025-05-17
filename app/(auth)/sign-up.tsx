import React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { useForm, Controller } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "~/components/ui/input"
import { authService } from "~/services/auth/auth"
import Toast, { ToastProps } from "~/components/ui/toast"
import { Cross, ThumbsUp } from "lucide-react-native"

const signUpSchema = z.object({
   name: z.string().min(2, "Name is too short"),
   email: z.string().email("Enter a valid email"),
   password: z.string().min(6, "Password must be 6+ characters"),
})

type SignUpFormData = z.infer<typeof signUpSchema>

export default function SignUpScreen() {
   const [toast, setToast] = React.useState<ToastProps | undefined>(undefined)

   const {
      control,
      handleSubmit,
      formState: { isSubmitting },
   } = useForm<SignUpFormData>({
      resolver: zodResolver(signUpSchema),
   })

   const onSubmit = async (data: SignUpFormData) => {
      const { name, email, password } = data

      const err = await authService.register(email, password, name)
      if (err) {
         setToast({
            ...err,
            icon: Cross,
         })
         return
      }
      setToast({
         title: "Welcome aboard!",
         description: "Your account has been created successfully",
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

         <Text className="text-2xl font-bold mb-6 text-black dark:text-white">Sign Up</Text>

         <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
               <Input placeholder="Full Name" value={value} onChangeText={onChange} />
            )}
         />

         <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
               <Input
                  placeholder="Email"
                  keyboardType="email-address"
                  value={value}
                  onChangeText={onChange}
               />
            )}
         />

         <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
               <Input
                  placeholder="Password"
                  secureTextEntry
                  value={value}
                  onChangeText={onChange}
               />
            )}
         />

         <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            className="bg-green-600 py-3 rounded-xl mt-4"
         >
            <Text className="text-center text-white font-medium">Create Account</Text>
         </TouchableOpacity>
      </View>
   )
}
