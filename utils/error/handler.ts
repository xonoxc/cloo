import { AppwriteException } from "react-native-appwrite"

export type FormattedError = {
   title: string
   description: string
}

interface AppErrorHandler {
   handleErrors: (error: unknown) => FormattedError | null
}

class AuthErrorHandler implements AppErrorHandler {
   // i'll handle all possbile errors here
   public handleErrors(error: unknown): FormattedError | null {
      if (error instanceof AppwriteException) {
         const type = error.type

         switch (type) {
            case "user_password_mismatch":
               return {
                  title: "Password Mismatch",
                  description: "The password and confirmation password do not match.",
               }
            case "password_recently_used":
               return {
                  title: "Password Recently Used",
                  description: "Please choose a different password that hasn't been used recently.",
               }
            case "password_personal_data":
               return {
                  title: "Password Contains Personal Data",
                  description:
                     "The password should not include your name, email, phone, or user ID.",
               }
            case "user_phone_not_found":
               return {
                  title: "Phone Number Not Found",
                  description: "No phone number is associated with this account.",
               }
            case "user_missing_id":
               return {
                  title: "Missing OAuth2 ID",
                  description: "The OAuth2 provider did not return a valid user ID.",
               }
            case "user_oauth2_bad_request":
               return {
                  title: "OAuth2 Request Error",
                  description: "The OAuth2 provider rejected the request.",
               }
            case "user_jwt_invalid":
               return {
                  title: "Invalid JWT Token",
                  description: "The provided JWT token is not valid.",
               }
            case "user_blocked":
               return {
                  title: "User Blocked",
                  description: "This user account has been blocked.",
               }
            case "user_invalid_token":
               return {
                  title: "Invalid Token",
                  description: "The token provided is not valid.",
               }
            case "user_email_not_whitelisted":
               return {
                  title: "Email Not Whitelisted",
                  description: "Registration is restricted to specific email addresses.",
               }
            case "user_invalid_code":
               return {
                  title: "Invalid Code",
                  description: "The code provided is not valid.",
               }
            case "user_ip_not_whitelisted":
               return {
                  title: "IP Not Whitelisted",
                  description: "Registration is restricted to specific IP addresses.",
               }
            case "user_invalid_credentials":
               return {
                  title: "Invalid Credentials",
                  description: "The email or password is incorrect.",
               }
            case "user_anonymous_console_prohibited":
               return {
                  title: "Anonymous Access Prohibited",
                  description: "Anonymous access is not allowed for console projects.",
               }
            case "user_session_already_exists":
               return {
                  title: "Session Already Exists",
                  description: "A session is already active. Please log out first.",
               }
            case "user_unauthorized":
               return {
                  title: "Unauthorized",
                  description: "You are not authorized to perform this action.",
               }
            case "user_oauth2_unauthorized":
               return {
                  title: "OAuth2 Unauthorized",
                  description: "OAuth2 provider rejected the request.",
               }
            case "team_invalid_secret":
               return {
                  title: "Invalid Team Secret",
                  description: "The team invitation secret is invalid.",
               }
            case "team_invite_mismatch":
               return {
                  title: "Invite Mismatch",
                  description: "This invite does not belong to the current user.",
               }
            case "user_not_found":
               return {
                  title: "User Not Found",
                  description: "No user was found with the provided ID.",
               }
            case "user_session_not_found":
               return {
                  title: "Session Not Found",
                  description: "No active session was found for the user.",
               }
            case "user_identity_not_found":
               return {
                  title: "Identity Not Found",
                  description:
                     "The requested identity does not exist. Sign in with an OAuth provider first.",
               }
            case "team_not_found":
               return {
                  title: "Team Not Found",
                  description: "No team was found with the provided ID.",
               }
            case "team_invite_not_found":
               return {
                  title: "Invite Not Found",
                  description: "The requested team invitation could not be found.",
               }
            case "team_membership_mismatch":
               return {
                  title: "Membership Mismatch",
                  description: "The membership ID does not belong to the specified team.",
               }
            case "membership_not_found":
               return {
                  title: "Membership Not Found",
                  description: "The requested membership could not be found.",
               }
            case "user_already_exists":
               return {
                  title: "User Already Exists",
                  description: "A user with the same ID, email, or phone number already exists.",
               }
            case "user_email_already_exists":
               return {
                  title: "Email Already Exists",
                  description: "This email address is already registered.",
               }
            case "user_phone_already_exists":
               return {
                  title: "Phone Number Already Exists",
                  description: "This phone number is already registered.",
               }
            case "team_invite_already_exists":
               return {
                  title: "Invite Already Exists",
                  description: "The user has already been invited or is a team member.",
               }
            case "team_already_exists":
               return {
                  title: "Team Already Exists",
                  description: "A team with the same ID already exists.",
               }
            case "membership_already_confirmed":
               return {
                  title: "Membership Already Confirmed",
                  description: "The membership has already been confirmed.",
               }
            case "user_password_reset_required":
               return {
                  title: "Password Reset Required",
                  description: "This user must reset their password to continue.",
               }
            case "user_oauth2_provider_error":
               return {
                  title: "OAuth2 Provider Error",
                  description: "The OAuth2 provider returned an error.",
               }
            case "user_count_exceeded":
               return {
                  title: "User Limit Exceeded",
                  description: "The project has reached its user limit.",
               }
            case "user_auth_method_unsupported":
               return {
                  title: "Unsupported Authentication Method",
                  description:
                     "The selected authentication method is not supported or is disabled.",
               }
            default:
               return {
                  title: "Authentication Error",
                  description: error.message,
               }
         }
      }

      if (error instanceof Error) {
         return {
            title: "Unexpected Error",
            description: error.message,
         }
      }

      console.log("Unknown error", error)
      return null
   }
}

export const authErrorHandler = new AuthErrorHandler()
