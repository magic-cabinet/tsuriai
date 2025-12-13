import { createContext, FC, PropsWithChildren, useCallback, useContext, useMemo } from "react"
import { useMMKVString } from "react-native-mmkv"

/**
 * User roles in the Tsuriai marketplace
 */
export type UserRole = "buyer" | "seller" | "both" | "admin"

/**
 * User profile data
 */
export interface User {
  id?: string
  email: string
  name?: string
  role: UserRole
}

export type AuthContextType = {
  isAuthenticated: boolean
  authToken?: string
  authEmail?: string
  user?: User
  setAuthToken: (token?: string) => void
  setAuthEmail: (email: string) => void
  setUserRole: (role: UserRole) => void
  logout: () => void
  validationError: string
}

export const AuthContext = createContext<AuthContextType | null>(null)

export interface AuthProviderProps {}

export const AuthProvider: FC<PropsWithChildren<AuthProviderProps>> = ({ children }) => {
  const [authToken, setAuthToken] = useMMKVString("AuthProvider.authToken")
  const [authEmail, setAuthEmail] = useMMKVString("AuthProvider.authEmail")
  const [userRole, setUserRole] = useMMKVString("AuthProvider.userRole")

  const logout = useCallback(() => {
    setAuthToken(undefined)
    setAuthEmail("")
    setUserRole(undefined)
  }, [setAuthEmail, setAuthToken, setUserRole])

  const validationError = useMemo(() => {
    if (!authEmail || authEmail.length === 0) return "can't be blank"
    if (authEmail.length < 6) return "must be at least 6 characters"
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(authEmail)) return "must be a valid email address"
    return ""
  }, [authEmail])

  const user: User | undefined = useMemo(() => {
    if (!authEmail) return undefined
    return {
      email: authEmail,
      role: (userRole as UserRole) || "buyer",
    }
  }, [authEmail, userRole])

  const handleSetUserRole = useCallback((role: UserRole) => {
    setUserRole(role)
  }, [setUserRole])

  const value = {
    isAuthenticated: !!authToken,
    authToken,
    authEmail,
    user,
    setAuthToken,
    setAuthEmail,
    setUserRole: handleSetUserRole,
    logout,
    validationError,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within an AuthProvider")
  return context
}
