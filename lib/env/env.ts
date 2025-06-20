import { z } from "zod"

const envSchema = z.object({
   EXPO_PUBLIC_APPWRITE_ENDPOINT: z.string().url(),
   EXPO_PUBLIC_APPWRIE_PROJECT_ID: z.string(),
   EXPO_PUBLIC_APPWRITE_PLATFORM_ID: z.string(),
})

const result = envSchema.safeParse(process.env)
if (!result.success) {
   console.error("Invalid environment variables", result.error.format())
   process.exit(1)
}

export const env = result.data
