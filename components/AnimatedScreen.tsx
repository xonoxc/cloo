import React, { useCallback, useState } from "react"
import Animated from "react-native-reanimated"

import { useFocusEffect } from "expo-router"

export default function AnimatedScreen({
   children,
   animation,
}: {
   children: React.ReactNode
   animation: Animated.AnimateStyle<any>
}) {
   const [key, setKey] = useState(0)

   useFocusEffect(
      useCallback(() => {
         setKey(prevKey => prevKey + 1)
      }, [])
   )

   return (
      <Animated.View key={key} style={{ flex: 1 }} entering={animation}>
         {children}
      </Animated.View>
   )
}
