// /store/useAuthStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { AuthState } from './store'

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      email: null,
      token: null,
      login: (email, token) => set({ email, token }),
      logout: () => {
        set({ email: null, token: null })
        if (typeof window !== 'undefined') {
          localStorage.removeItem('auth') 
        }
      }
    }),
    {
      name: 'auth',
    }
  )
)
