import { z } from "zod"

const envSchema = z.object({
   EXPO_PUBLIC_APPWRITE_ENDPOINT: z.string().url(),
   EXPO_PUBLIC_APPWRITE_PROJECT_ID: z.string(),
})

const result = envSchema.parse(process.env)

export const env = result
