import { View, Text, Image } from "react-native"
import { Button } from "~/components/ui/button"
import { authService } from "~/services/auth/auth"
import { useAuthStore } from "~/store/auth"
import { ApplicationError } from "~/utils/error/error"
import { Ionicons } from "@expo/vector-icons"
import getRelativeTime from "~/utils/date"
import AnimatedScreen from "~/components/AnimatedScreen"
import { FadeIn } from "react-native-reanimated"
import { ThemeToggle } from "~/components/ThemeToggle"

export default function Screen() {
   const { logout, userData } = useAuthStore()

   const handleLogoutPress = async () => {
      const error = await authService.signOut()
      if (ApplicationError.isError(error)) {
         console.log("Logout error:", error)
         return
      }
      logout()
   }

   return (
      <AnimatedScreen animation={FadeIn}>
         <View className="flex-1 px-4 items-center justify-center bg-background">
            {/* User Avatar or Default Icon */}

            <View className="absolute top-4 right-4">
               <ThemeToggle />
            </View>
            <View className="w-full">
               {!!userData && (
                  <>
                     {userData?.avatar ? (
                        <Image
                           source={{ uri: userData.avatar }}
                           className="w-20 h-20 rounded-full mb-4"
                        />
                     ) : (
                        <View className="w-20 h-20 bg-gray-300 rounded-full items-center justify-center mb-4">
                           <Text>{userData.name.charAt(0).toUpperCase()}</Text>
                        </View>
                     )}

                     {/* User Name and Email */}
                     <Text className="text-2xl font-bold mb-2 text-foreground">
                        {userData.name}
                     </Text>
                     <Text className="text-gray-600 mb-4">{userData.email}</Text>

                     {/* Verification Status */}
                     <View className="mb-4">
                        <Text className="text-lg font-semibold mb-2 text-foreground">
                           Account Verification
                        </Text>
                        <View className="flex-row items-center mb-1">
                           <Text className="mr-2 text-foreground">Email:</Text>
                           {userData?.emailVerification ? (
                              <Ionicons name="checkmark-circle" size={20} color="green" />
                           ) : (
                              <Ionicons name="close-circle" size={20} color="red" />
                           )}
                        </View>
                        <View className="flex-row items-center mb-1">
                           <Text className="mr-2 text-foreground">Phone:</Text>
                           {userData.phoneVerification ? (
                              <Ionicons name="checkmark-circle" size={20} color="green" />
                           ) : (
                              <Ionicons name="close-circle" size={20} color="red" />
                           )}
                        </View>
                        <View className="flex-row items-center mb-1">
                           <Text className="mr-2 text-foreground">MFA:</Text>
                           {userData.mfa ? (
                              <Ionicons name="checkmark-circle" size={20} color="green" />
                           ) : (
                              <Ionicons name="close-circle" size={20} color="red" />
                           )}
                        </View>
                        <View className="flex-row items-center">
                           <Text className="mr-2 text-foreground">Overall:</Text>
                           {userData.isVerified ? (
                              <Ionicons name="checkmark-circle" size={20} color="green" />
                           ) : (
                              <Ionicons name="close-circle" size={20} color="red" />
                           )}
                        </View>
                     </View>

                     {/* Account Dates */}
                     <View className="mb-4">
                        <Text className="text-lg font-semibold mb-2 text-foreground">
                           Account Dates
                        </Text>
                        <View className="flex-row justify-between mb-1">
                           <Text className="text-foreground">Created At:</Text>
                           <Text className="text-foreground">
                              {getRelativeTime(userData.$createdAt)}
                           </Text>
                        </View>
                        <View className="flex-row justify-between">
                           <Text className="text-foreground">Registration:</Text>
                           <Text className="text-foreground">
                              {getRelativeTime(userData.registration)}
                           </Text>
                        </View>
                     </View>
                  </>
               )}

               {/* Logout Button */}
               <Button
                  className="rounded-2xl bg-violet-400 text-white p-5"
                  onPress={handleLogoutPress}
               >
                  <Text>Logout</Text>
               </Button>
            </View>
         </View>
      </AnimatedScreen>
   )
}
