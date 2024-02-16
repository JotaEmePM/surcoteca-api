export interface CreateEmailLogDto {
    reason: string
    data: string
    to_user: string
    from: string
    to: string
    subject: string
    text: string
    resend_response: string
}