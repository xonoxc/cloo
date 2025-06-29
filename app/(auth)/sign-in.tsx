import React from "react"
import {
   View,
   Text,
   TouchableOpacity,
   KeyboardAvoidingView,
   Platform,
   ScrollView,
} from "react-native"
import { useForm, Controller } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "~/components/ui/input"
import { authService } from "~/services/auth/auth"
import { ApplicationError } from "~/utils/error/error"
import { useAuthStore } from "~/store/auth"
import { Link } from "expo-router"
import { Image } from "expo-image"

const signInSchema = z.object({
   email: z.string().email("Enter a valid email"),
   password: z.string().min(6, "Password must be 6+ characters"),
})

type SignInFormData = z.infer<typeof signInSchema>

export default function SignInScreen() {
   const { login } = useAuthStore()
   const [error, setError] = React.useState<ApplicationError | null>(null)

   const {
      control,
      handleSubmit,
      formState: { isSubmitting },
   } = useForm<SignInFormData>({
      resolver: zodResolver(signInSchema),
   })

   const onSubmit = async (data: SignInFormData) => {
      const { email, password } = data

      const err = await authService.signIn(email, password)
      if (err && ApplicationError.isError(err)) {
         console.log("SignIn error:", err)
         setError(err)
         return
      }

      const userData = await authService.getCurrentUser()
      if (userData && !ApplicationError.isError(userData)) {
         login(userData as any)
      }
   }

   return (
      <KeyboardAvoidingView
         className="flex-1"
         behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
         <ScrollView
            className="flex-1"
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
         >
            <View className="flex-1 justify-top px-6 py-52 bg-black">
               <View className="mb-8 items-center">
                  <Image
                     source={require("../../assets/images/cloo_logo.png")}
                     style={{ width: 100, height: 100 }}
                  />
                  <Text className="text-base text-gray-400 text-center mt-1">
                     Welcome back! Please sign in to your account.
                  </Text>
               </View>
               {error && (
                  <View className="bg-red-500 p-4 rounded-lg mb-4">
                     <Text className="text-white text-center">{error.title}</Text>
                     <Text className="text-white text-center">{error.description}</Text>
                  </View>
               )}

               <View className="space-y-5 mb-3">
                  <View className="flex  flex-col w-full border-2  gap-3">
                     <Controller
                        control={control}
                        name="email"
                        render={({ field: { onChange, value }, formState: { errors } }) => (
                           <Input
                              placeholder="Email"
                              keyboardType="email-address"
                              value={value}
                              onChangeText={onChange}
                              error={errors.email?.message}
                              className="border border-[#cccccc] text-white bg-black rounded-xl p-4"
                           />
                        )}
                     />

                     <Controller
                        control={control}
                        name="password"
                        render={({ field: { onChange, value }, formState: { errors } }) => (
                           <Input
                              placeholder="Password"
                              secureTextEntry
                              value={value}
                              onChangeText={onChange}
                              error={errors.password?.message}
                              className="border border-[#cccccc] text-white bg-black  rounded-xl p-4"
                           />
                        )}
                     />
                  </View>

                  <TouchableOpacity
                     onPress={handleSubmit(onSubmit)}
                     disabled={isSubmitting}
                     className="bg-violet-600 py-4 rounded-2xl mt-2 shadow-lg"
                  >
                     <Text className="text-center text-white font-semibold text-lg">
                        {isSubmitting ? "Signing In..." : "Login"}
                     </Text>
                  </TouchableOpacity>
               </View>

               <TouchableOpacity className="mt-6">
                  <Text className="text-center text-gray-400 text-sm">
                     Don’t have an account?
                     <Link href="/sign-up" className="ml-1">
                        <Text className="text-violet-500 font-semibold">Sign up</Text>
                     </Link>
                  </Text>
               </TouchableOpacity>
            </View>
         </ScrollView>
      </KeyboardAvoidingView>
   )
}
