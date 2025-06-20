import React from "react"
import { View, Text, FlatList } from "react-native"
import { Ionicons } from "@expo/vector-icons"

export default function NoteScreen() {
   const notes = ["Text note 07/31", "App idea", "Nokuchikashi"]

   return (
      <View className="flex-1">
         <FlatList
            data={notes}
            renderItem={({ item }) => (
               <View className="flex-row items-center p-4 bg-gray-100 rounded-lg mx-4 mb-2 shadow-md">
                  <Ionicons name="document-text" size={24} color="black" className="mr-4" />
                  <Text className="text-lg flex-1">{item}</Text>
               </View>
            )}
            keyExtractor={item => item}
         />
      </View>
   )
}
