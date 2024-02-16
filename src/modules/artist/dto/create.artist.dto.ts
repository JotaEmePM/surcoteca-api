export interface CreateArtistDto {
    id: string
    name: string
    genres: [string]

    spotify_id: string
    spotify_images: [string]
    spotify_uri: string
    spotify_href: string
    spotify_followers: number
    spotify_popularity: number
    spotify_type: string

    created: {type: Date}    
}