import { TabTriggerSlotProps } from "expo-router/ui"
import { forwardRef, PropsWithChildren } from "react"
import { Ionicons } from "@expo/vector-icons"
import { Pressable, View, Text } from "react-native"
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated"
import React from "react"

interface CustomTabButtonProps extends PropsWithChildren, TabTriggerSlotProps {
   icon: keyof typeof Ionicons.glyphMap
   isExpanded: boolean
   index: number
   exrtraActionOnPress?: () => void
}

export const CustomTabButton = forwardRef<View, CustomTabButtonProps>((props, ref) => {
   const translateY = useSharedValue(0)
   const opacity = useSharedValue(0)
   const scale = useSharedValue(1)

   React.useEffect(() => {
      if (props.isExpanded) {
         translateY.value = withSpring(-80 * props.index - 80)
         opacity.value = withSpring(1)
      } else {
         translateY.value = withSpring(0)
         opacity.value = withSpring(0)
      }
   }, [props.isExpanded, props.index, translateY, opacity])

   const animatedStyle = useAnimatedStyle(() => {
      return {
         transform: [{ translateY: translateY.value }, { scale: scale.value }],
         opacity: opacity.value,
         position: "absolute",
         bottom: 0,
         zIndex: props.index,
      }
   })

   return (
      <Animated.View style={animatedStyle}>
         <Pressable
            ref={ref}
            {...props}
            className={`
            w-16 h-16 justify-center items-center rounded-full relative
            shadow-lg right-8
            ${props.isFocused ? "bg-indigo-500" : "bg-white"}
          `}
            onPressIn={() => {
               scale.value = withSpring(0.9, { mass: 0.5, stiffness: 300 })
               props.exrtraActionOnPress?.()
            }}
            onPressOut={() => {
               scale.value = withSpring(1, { mass: 0.5, stiffness: 300 })
            }}
         >
            <Ionicons name={props.icon} size={24} color={props.isFocused ? "#fff" : "#64748B"} />
            <Text
               className={`
              mt-1 text-xs font-medium
              ${props.isFocused ? "text-white" : "text-slate-400"}
            `}
            >
               {props.children}
            </Text>
         </Pressable>
      </Animated.View>
   )
})

CustomTabButton.displayName = "CustomTabButton"
