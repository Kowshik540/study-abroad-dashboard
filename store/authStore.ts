'use client'

import { create } from 'zustand'

interface AuthState {
  user: any
  token: string | null
  login: (data: any) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,

  login: (data) => {
    localStorage.setItem('token', data.token)

    set({
      user: data,
      token: data.token
    })
  },

  logout: () => {
    localStorage.removeItem('token')

    set({
      user: null,
      token: null
    })
  }
}))