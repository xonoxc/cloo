import { Tabs } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import { useTheme } from "@react-navigation/native"

export default function ApplicationLayout() {
   const { colors, dark } = useTheme()

   return (
      <Tabs
         screenOptions={{
            tabBarActiveTintColor: dark ? "#fff" : "#000",
            headerShadowVisible: false,

            headerTitleStyle: {
               fontSize: 40,
               fontWeight: "bold",
               color: colors.text,
            },
            headerStyle: {
               marginBottom: 100,
            },
            tabBarStyle: {
               backdropFilter: "blur(10px)",
               opacity: 0.8,
               height: 60,
               paddingTop: 10,
               borderRadius: 10,
            },
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
