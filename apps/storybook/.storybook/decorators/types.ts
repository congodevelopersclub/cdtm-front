export type StoryAuthSession = {
  userId: string
  email: string
} | null

export type StoryAuthParameters = {
  session?: StoryAuthSession
}
