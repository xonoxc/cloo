import { AppwriteService } from "../appwrite/client"
import { authErrorHandler } from "~/utils/error/handler"
import { ID } from "react-native-appwrite"

class AuthService extends AppwriteService {
   // method to login a user
   public async signIn(email: string, password: string) {
      try {
         await this.account.createEmailPasswordSession(email, password)
         return null
      } catch (e) {
         return authErrorHandler.handleErrors(e)
      }
   }

   // method to register a user
   public async register(email: string, password: string, name: string) {
      try {
         await this.account.create(ID.unique(), email, password, name)
         await this.signIn(email, password)
         return null
      } catch (e) {
         return authErrorHandler.handleErrors(e)
      }
   }

   // method to get current user info
   public async getCurrentUser() {
      try {
         return await this.account.get()
      } catch (e) {
         return authErrorHandler.handleErrors(e)
      }
   }
}

export const authService = new AuthService()
