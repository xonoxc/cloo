import "~/global.css"

import { DarkTheme, DefaultTheme, Theme, ThemeProvider } from "@react-navigation/native"
import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import * as React from "react"
import { useIsomorphicLayoutEffect } from "~/utils/isomoriphicEffect"
import { NAV_THEME } from "~/lib/constants"
import { useColorScheme } from "~/lib/useColorScheme"
import { PortalHost } from "@rn-primitives/portal"
import { ThemeToggle } from "~/components/ThemeToggle"
import { setAndroidNavigationBar } from "~/lib/android-navigation-bar"
import { authService } from "~/services/auth/auth"
import { useAuthStore } from "~/store/auth"
import { ApplicationError } from "~/utils/error/error"
import { ToastContainer, ToastProvider } from "~/hooks/useToast"
import { SafeAreaProvider, initialWindowMetrics } from "react-native-safe-area-context"

const LIGHT_THEME: Theme = {
   ...DefaultTheme,
   colors: NAV_THEME.light,
}
const DARK_THEME: Theme = {
   ...DarkTheme,
   colors: NAV_THEME.dark,
}

export { ErrorBoundary } from "expo-router"

export default function RootLayout() {
   const hasMounted = React.useRef(false)
   const { colorScheme, isDarkColorScheme } = useColorScheme()
   const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false)
   const [isAuthLoaded, setIsAuthLoaded] = React.useState(false)
   const { login, logout, status: authStatus } = useAuthStore()

   useIsomorphicLayoutEffect(() => {
      ;(async () => {
         if (!authStatus) {
            const res = await authService.getCurrentUser()
            if (ApplicationError.isError(res)) {
               logout()
               return
            }
            login(res as any)
         }
         setIsAuthLoaded(true)
      })()

      if (hasMounted.current) {
         return
      }

      setAndroidNavigationBar(colorScheme)
      setIsColorSchemeLoaded(true)
      hasMounted.current = true
   }, [])

   if (!isColorSchemeLoaded || !isAuthLoaded) return null

   return (
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
         <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
            <ToastProvider>
               <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
               <Stack>
                  <Stack.Protected guard={authStatus}>
                     <Stack.Screen
                        name="(application)"
                        options={{
                           title: "base layout",
                           headerRight: () => <ThemeToggle />,
                           headerShown: false,
                        }}
                     />
                  </Stack.Protected>

                  <Stack.Protected guard={!authStatus}>
                     <Stack.Screen
                        name="(auth)"
                        options={{
                           headerRight: () => <ThemeToggle />,
                           headerShown: false,
                        }}
                     />
                  </Stack.Protected>
               </Stack>
               <PortalHost />
               <ToastContainer />
            </ToastProvider>
         </ThemeProvider>
      </SafeAreaProvider>
   )
}
