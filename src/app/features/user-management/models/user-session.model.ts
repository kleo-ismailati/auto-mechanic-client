export interface UserSession {
    token: string
    type: string
    id: number
    username: string
    email: string
    roles: string[]
}
