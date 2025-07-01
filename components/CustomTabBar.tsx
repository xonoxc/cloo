import { View } from "react-native"
import { CustomTabButton } from "./CustomTabButton"
import { ToggleMenuButton } from "./ToggleMenuButton"
import { useState } from "react"
import { BottomTabBarProps } from "@react-navigation/bottom-tabs"

export function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
   const [isExpanded, setIsExpanded] = useState(false)

   return (
      <View className="absolute bottom-8 right-8 flex-row items-center space-x-4 bg-white/80 dark:bg-neutral-900/80 rounded-xl px-4 py-2 shadow-lg">
         {state.routes.map((route, idx) => {
            const { options } = descriptors[route.key]
            const label = options.title || route.name
            const isFocused = state.index === idx
            const icon =
               route.name === "folders"
                  ? "folder"
                  : route.name === "notes"
                    ? "document-text"
                    : "settings"

            const onPress = () => {
               const event = navigation.emit({
                  type: "tabPress",
                  target: route.key,
                  canPreventDefault: true,
               })
               if (!isFocused && !event.defaultPrevented) {
                  navigation.navigate(route.name)
                  setTimeout(() => {
                     setIsExpanded(true)
                  }, 1000)
               }
            }

            return (
               <CustomTabButton
                  key={route.key}
                  icon={icon}
                  index={idx}
                  isExpanded={isExpanded}
                  isFocused={isFocused}
                  onPress={onPress}
                  exrtraActionOnPress={() => setIsExpanded(false)}
               >
                  {label}
               </CustomTabButton>
            )
         })}
         <ToggleMenuButton onPress={() => setIsExpanded(prev => !prev)} isExpanded={isExpanded} />
      </View>
   )
}
