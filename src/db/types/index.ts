export interface User {
    id: string
    email: string
    created_at: Date
}

export interface UserCredential {
    user_id: string
    password_hash: string
    updated_at: Date
}