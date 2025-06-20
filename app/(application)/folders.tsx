import React from "react"
import { View, Text, FlatList } from "react-native"
import { Ionicons } from "@expo/vector-icons"

export default function FolderScreen() {
   const folders = ["Miljeiko", "Vodja", "Bráso 1kg"]

   return (
      <View className="flex-1">
         <View className="p-4">
            <Text className="text-2xl font-bold text-foreground">All Folders</Text>
         </View>
         <FlatList
            data={folders}
            renderItem={({ item }) => (
               <View className="flex-row items-center p-4 bg-gray-100 rounded-lg mx-4 mb-2 shadow-md">
                  <Ionicons name="folder" size={24} color="black" className="mr-4" />
                  <Text className="text-lg flex-1">{item}</Text>
               </View>
            )}
            keyExtractor={item => item}
         />
      </View>
   )
}
