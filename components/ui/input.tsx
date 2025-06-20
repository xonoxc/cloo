import * as React from "react"
import { TextInput, Text, View, type TextInputProps } from "react-native"
import { cn } from "~/lib/utils"

interface InputProps extends TextInputProps {
   error?: string
   className?: string
}

const Input = React.forwardRef<React.ElementRef<typeof TextInput>, InputProps>(
   ({ className, error, ...props }, ref) => {
      return (
         <View className="w-full">
            <TextInput
               ref={ref}
               placeholderTextColor="#9CA3AF"
               className={cn(
                  "h-14 w-full rounded-2xl border-2 border-zinc-700 bg-zinc-900 px-5 text-white text-lg",
                  props.editable === false && "opacity-50",
                  className
               )}
               {...props}
            />
            {!!error && <Text className="text-red-500 text-xs mt-1 ml-1">{error}</Text>}
         </View>
      )
   }
)

Input.displayName = "Input"

export { Input }
