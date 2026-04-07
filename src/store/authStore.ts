import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import type { AuthTokens, IUser } from '@/types/api';

interface AuthState {
  user: IUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  /** Persist-rehydration finished (safe to read tokens for API). */
  hasHydrated: boolean;
  /** Alias for tooling / docs; kept in sync with `hasHydrated`. */
  _hasHydrated: boolean;
  setAuth: (user: IUser, tokens: AuthTokens) => void;
  setTokens: (tokens: AuthTokens) => void;
  updateUser: (user: Partial<IUser>) => void;
  logout: () => void;
  setHasHydrated: (v: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      hasHydrated: false,
      _hasHydrated: false,
      setHasHydrated: (v) =>
        set({ hasHydrated: v, _hasHydrated: v }),
      setAuth: (user, tokens) =>
        set({
          user,
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
          isAuthenticated: true,
        }),
      setTokens: (tokens) =>
        set({
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
          isAuthenticated: Boolean(tokens.accessToken),
        }),
      updateUser: (partial) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...partial } : null,
        })),
      logout: () =>
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: 'ideahub-auth',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => () => {
        useAuthStore.setState({ hasHydrated: true, _hasHydrated: true });
      },
      partialize: (s) => ({
        accessToken: s.accessToken,
        refreshToken: s.refreshToken,
        user: s.user,
        isAuthenticated: s.isAuthenticated,
      }),
    }
  )
);
