import { AppwriteService } from "../appwrite/client"
import { authErrorHandler } from "~/utils/error/handler"
import { ID } from "react-native-appwrite"
import { attempt } from "~/utils/error/async"

class AuthService extends AppwriteService {
   /*
    * this method helps getting the account from the server
    * **/
   public async signIn(email: string, password: string) {
      const result = await attempt(() => this.account.createEmailPasswordSession(email, password))
      if (!result.ok) {
         return authErrorHandler.handleErrors(result.error)
      }
      return null
   }

   public async register(email: string, password: string, name: string) {
      const createResult = await attempt(() =>
         this.account.create(ID.unique(), email, password, name)
      )
      if (!createResult.ok) {
         console.log("Error creating account:", createResult.error)
         return authErrorHandler.handleErrors(createResult.error)
      }
      return await this.signIn(email, password)
   }

   public async getCurrentUser() {
      const result = await attempt(() => this.account.get())
      if (!result.ok) {
         return authErrorHandler.handleErrors(result.error)
      }
      return result.data
   }

   public async signOut() {
      const result = await attempt(() => this.account.deleteSessions())
      if (!result.ok) {
         return authErrorHandler.handleErrors(result.error)
      }
      return null
   }
}

export const authService = new AuthService()
