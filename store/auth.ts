import { create } from "zustand"
import { userData } from "~/types/user"

interface AuthState {
   status: boolean
   userData: userData | null
   login: (user: userData) => void
   logout: () => void
}

const initialState: AuthState = {
   status: false,
   userData: null,
   login: () => {},
   logout: () => {},
}

const useAuthStore = create<AuthState>((set, get) => ({
   ...initialState,
   login: (user: userData) => set({ status: true, userData: user }),
   logout: () => {
      const status = get().status
      if (status) {
         set({ status: false, userData: null })
      }
   },
}))

export { useAuthStore }
