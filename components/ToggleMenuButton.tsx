import { Ionicons } from "@expo/vector-icons"
import React from "react"
import { TouchableOpacity } from "react-native"
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated"

interface ToggleMenuButtonProps {
   onPress: () => void
   isExpanded: boolean
}

export function ToggleMenuButton(props: ToggleMenuButtonProps) {
   const rotation = useSharedValue(0)

   React.useEffect(() => {
      if (props.isExpanded) {
         rotation.value = withSpring(360, {
            damping: 10,
            stiffness: 100,
            mass: 0.6,
            velocity: 20,
         })
      } else {
         rotation.value = withSpring(0, {
            damping: 12,
            stiffness: 100,
            mass: 0.6,
            velocity: 20,
         })
      }
   }, [props.isExpanded, rotation])

   const animatedStyle = useAnimatedStyle(() => {
      return {
         transform: [{ rotate: `${rotation.value}deg` }],
      }
   })

   return (
      <TouchableOpacity
         className="w-16 h-16 rounded-full bg-blue-500 justify-center items-center z-10 absolute bottom-0 right-0 shadow-lg"
         onPress={props.onPress}
         activeOpacity={0.8}
      >
         <Animated.View style={animatedStyle}>
            <Ionicons name={props.isExpanded ? "close" : "menu"} size={24} color="#fff" />
         </Animated.View>
      </TouchableOpacity>
   )
}
