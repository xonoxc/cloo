import { Client, Account } from "react-native-appwrite"
import { env } from "~/lib/env/env"

export class AppwriteService {
   private client: Client
   protected account: Account

   constructor() {
      this.client = new Client()
         .setEndpoint(env.EXPO_PUBLIC_APPWRITE_ENDPOINT)
         .setProject(env.EXPO_PUBLIC_APPWRITE_PROJECT_ID)

      this.account = new Account(this.client)
   }
}
