import { Tabs } from "expo-router"
import { Ionicons } from "@expo/vector-icons"

export default function ApplicationLayout() {
   return (
      <Tabs
         screenOptions={{
            tabBarActiveTintColor: "white",
            tabBarStyle: {
               backgroundColor: "#0f1014",
               height: 70,
               paddingTop: 10,
               borderRadius: 10,
            },
         }}
      >
         <Tabs.Screen
            name="folders"
            options={{
               title: "folders",
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
