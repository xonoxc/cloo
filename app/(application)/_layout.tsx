import { Tabs } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "@react-navigation/native"
import { CustomTabBar } from "~/components/CustomTabBar"

export default function ApplicationLayout() {
   const { dark } = useTheme()

   return (
      <Tabs
         tabBar={props => <CustomTabBar {...props} />}
         screenOptions={{
            tabBarActiveTintColor: dark ? "#fff" : "#000",
            headerShown: false,
         }}
      >
         <Tabs.Screen
            name="folders"
            options={{
               title: "cloo",
               tabBarIcon: ({ color, size }) => (
                  <Ionicons name="folder" size={size} color={color} />
               ),
            }}
         />
         <Tabs.Screen
            name="notes"
            options={{
               title: "notes",
               tabBarIcon: ({ color, size }) => (
                  <Ionicons name="document-text" size={size} color={color} />
               ),
            }}
         />

         <Tabs.Screen
            name="accounts/acc"
            options={{
               title: "account",
               tabBarIcon: ({ color, size }) => (
                  <Ionicons name="settings" size={size} color={color} />
               ),
            }}
         />
      </Tabs>
   )
}
