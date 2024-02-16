export interface CreateUserDto {
    id: string
    username: string
    email: string
    password:string
    firstName?: string
    lastName?: string
    permissionFlags?: number
}