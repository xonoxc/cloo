import { Stack } from "expo-router"
import { KeyboardAvoidingView, Platform } from "react-native"

export default function AuthLayout() {
   return (
      <KeyboardAvoidingView
         behavior={Platform.OS === "ios" ? "padding" : undefined}
         className="flex-1"
      >
         <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="sign-in" options={{ headerShown: false }} />
            <Stack.Screen name="sign-up" options={{ headerShown: false }} />
         </Stack>
      </KeyboardAvoidingView>
   )
}
