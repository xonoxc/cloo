import * as React from "react"
import { View, Text } from "react-native"
import { Link } from "expo-router"
import { Button } from "~/components/ui/button"
import { authService } from "~/services/auth/auth"
import { useAuthStore } from "~/store/auth"
import { ApplicationError } from "~/utils/error/error"

export default function Screen() {
   const { logout } = useAuthStore()

   const handleLogoutPress = async () => {
      const error = await authService.signOut()
      if (ApplicationError.isError(error)) {
         console.log("Logout error:", error)
         return
      }
      logout()
   }

   return (
      <View className="flex items-center justify-center h-screen-safe">
         <Text className="dark:text-white text-black  px-3">hi from cloo</Text>

         <Link href={"/sign-in"} className="text-blue-500">
            go to login
         </Link>

         <Button
            className="bg-slate-500 text-white p-5"
            onPress={handleLogoutPress}
         >
            <Text> Logout </Text>
         </Button>
      </View>
   )
}
