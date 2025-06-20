import { AppwriteException } from "react-native-appwrite"
import { ApplicationError } from "./error"

interface AppErrorHandler {
   handleErrors: (error: unknown) => ApplicationError | null
}

class AuthErrorHandler implements AppErrorHandler {
   public handleErrors(error: unknown): ApplicationError | null {
      if (error instanceof AppwriteException) {
         const type = error.type

         switch (type) {
            case "user_password_mismatch":
               return new ApplicationError(
                  "Password Mismatch",
                  "The password and confirmation password do not match."
               )
            case "password_recently_used":
               return new ApplicationError(
                  "Password Recently Used",
                  "Please choose a different password that hasn't been used recently."
               )
            case "password_personal_data":
               return new ApplicationError(
                  "Password Contains Personal Data",
                  "The password should not include your name, email, phone, or user ID."
               )
            case "user_phone_not_found":
               return new ApplicationError(
                  "Phone Number Not Found",
                  "No phone number is associated with this account."
               )
            case "user_missing_id":
               return new ApplicationError(
                  "Missing OAuth2 ID",
                  "The OAuth2 provider did not return a valid user ID."
               )
            case "user_oauth2_bad_request":
               return new ApplicationError(
                  "OAuth2 Request Error",
                  "The OAuth2 provider rejected the request."
               )
            case "user_jwt_invalid":
               return new ApplicationError(
                  "Invalid JWT Token",
                  "The provided JWT token is not valid."
               )
            case "user_blocked":
               return new ApplicationError("User Blocked", "This user account has been blocked.")
            case "user_invalid_token":
               return new ApplicationError("Invalid Token", "The token provided is not valid.")
            case "user_email_not_whitelisted":
               return new ApplicationError(
                  "Email Not Whitelisted",
                  "Registration is restricted to specific email addresses."
               )
            case "user_invalid_code":
               return new ApplicationError("Invalid Code", "The code provided is not valid.")
            case "user_ip_not_whitelisted":
               return new ApplicationError(
                  "IP Not Whitelisted",
                  "Registration is restricted to specific IP addresses."
               )
            case "user_invalid_credentials":
               return new ApplicationError(
                  "Invalid Credentials",
                  "The email or password is incorrect."
               )
            case "user_anonymous_console_prohibited":
               return new ApplicationError(
                  "Anonymous Access Prohibited",
                  "Anonymous access is not allowed for console projects."
               )
            case "user_session_already_exists":
               return new ApplicationError(
                  "Session Already Exists",
                  "A session is already active. Please log out first."
               )
            case "user_unauthorized":
               return new ApplicationError(
                  "Unauthorized",
                  "You are not authorized to perform this action."
               )
            case "user_oauth2_unauthorized":
               return new ApplicationError(
                  "OAuth2 Unauthorized",
                  "OAuth2 provider rejected the request."
               )
            case "team_invalid_secret":
               return new ApplicationError(
                  "Invalid Team Secret",
                  "The team invitation secret is invalid."
               )
            case "team_invite_mismatch":
               return new ApplicationError(
                  "Invite Mismatch",
                  "This invite does not belong to the current user."
               )
            case "user_not_found":
               return new ApplicationError(
                  "User Not Found",
                  "No user was found with the provided ID."
               )
            case "user_session_not_found":
               return new ApplicationError(
                  "Session Not Found",
                  "No active session was found for the user."
               )
            case "user_identity_not_found":
               return new ApplicationError(
                  "Identity Not Found",
                  "The requested identity does not exist. Sign in with an OAuth provider first."
               )
            case "team_not_found":
               return new ApplicationError(
                  "Team Not Found",
                  "No team was found with the provided ID."
               )
            case "team_invite_not_found":
               return new ApplicationError(
                  "Invite Not Found",
                  "The requested team invitation could not be found."
               )
            case "team_membership_mismatch":
               return new ApplicationError(
                  "Membership Mismatch",
                  "The membership ID does not belong to the specified team."
               )
            case "membership_not_found":
               return new ApplicationError(
                  "Membership Not Found",
                  "The requested membership could not be found."
               )
            case "user_already_exists":
               return new ApplicationError(
                  "User Already Exists",
                  "A user with the same ID, email, or phone number already exists."
               )
            case "user_email_already_exists":
               return new ApplicationError(
                  "Email Already Exists",
                  "This email address is already registered."
               )
            case "user_phone_already_exists":
               return new ApplicationError(
                  "Phone Number Already Exists",
                  "This phone number is already registered."
               )
            case "team_invite_already_exists":
               return new ApplicationError(
                  "Invite Already Exists",
                  "The user has already been invited or is a team member."
               )
            case "team_already_exists":
               return new ApplicationError(
                  "Team Already Exists",
                  "A team with the same ID already exists."
               )
            case "membership_already_confirmed":
               return new ApplicationError(
                  "Membership Already Confirmed",
                  "The membership has already been confirmed."
               )
            case "user_password_reset_required":
               return new ApplicationError(
                  "Password Reset Required",
                  "This user must reset their password to continue."
               )
            case "user_oauth2_provider_error":
               return new ApplicationError(
                  "OAuth2 Provider Error",
                  "The OAuth2 provider returned an error."
               )
            case "user_count_exceeded":
               return new ApplicationError(
                  "User Limit Exceeded",
                  "The project has reached its user limit."
               )
            case "user_auth_method_unsupported":
               return new ApplicationError(
                  "Unsupported Authentication Method",
                  "The selected authentication method is not supported or is disabled."
               )
            default:
               return new ApplicationError("Authentication Error", error.message)
         }
      }

      if (error instanceof Error) {
         return new ApplicationError("Unexpected Error", error.message)
      }

      console.log("Unknown error", error)
      return null
   }
}

export const authErrorHandler = new AuthErrorHandler()
