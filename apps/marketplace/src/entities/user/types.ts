export type User = {
  id: string
  email: string
  name?: string
}

export type AuthTokens = {
  accessToken: string
  refreshToken?: string
}

export type LoginResponse = {
  user: User
  tokens: AuthTokens
}
