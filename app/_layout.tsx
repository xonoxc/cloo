import "~/global.css"

import { DarkTheme, DefaultTheme, Theme, ThemeProvider } from "@react-navigation/native"
import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import * as React from "react"
import { Platform } from "react-native"
import { NAV_THEME } from "~/lib/constants"
import { useColorScheme } from "~/lib/useColorScheme"
import { PortalHost } from "@rn-primitives/portal"
import { ThemeToggle } from "~/components/ThemeToggle"
import { setAndroidNavigationBar } from "~/lib/android-navigation-bar"
import { authService } from "~/services/auth/auth"
import { useAuthStore } from "~/store/auth"
import { ApplicationError } from "~/utils/error/error"
import { ToastContainer, ToastProvider } from "~/hooks/useToast"
import { NavigationContainer } from "@react-navigation/native"

const LIGHT_THEME: Theme = {
   ...DefaultTheme,
   colors: NAV_THEME.light,
}
const DARK_THEME: Theme = {
   ...DarkTheme,
   colors: NAV_THEME.dark,
}

export {
   // Preventing redirects from being shown in the web console
   ErrorBoundary,
} from "expo-router"

export default function RootLayout() {
   const hasMounted = React.useRef(false)
   const { colorScheme, isDarkColorScheme } = useColorScheme()
   const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false)
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
      })()

      if (hasMounted.current) {
         return
      }

      if (Platform.OS === "web") {
         // Adds the background color to the html element to prevent white background on overscroll.
         document.documentElement.classList.add("bg-background")
      }

      setAndroidNavigationBar(colorScheme)
      setIsColorSchemeLoaded(true)
      hasMounted.current = true
   }, [])

   if (!isColorSchemeLoaded) return null

   return (
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
   )
}

const useIsomorphicLayoutEffect =
   Platform.OS === "web" && typeof window === "undefined" ? React.useEffect : React.useLayoutEffect
