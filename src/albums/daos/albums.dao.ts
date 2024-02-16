import { createId } from "@paralleldrive/cuid2"
import debug from "debug"
import mongooseService from "../../common/services/mongoose.service"

const log: debug.IDebugger = debug('app:albums-dao')

class AlbumsDao {
    constructor() {
        log('Created new instance of AlbumsDao')
    }

    Schema = mongooseService.getMongoose().Schema

    albumSchema = new this.Schema({
        _id: String,
        name: String,

        spotify_album_type: String,
        spotify_total_tracks: Number,
        spotify_markets: [String],
        spotify_href: String,
        spotify_images: [String],
        spotify_release_date: String,
        spotify_release_date_precision: String,
        spotify_restriction: String,
        spotify_type: String,
        spotify_uri: String,
        spotify_artist: [String],

        spotify_tracks_href: String,
        spotify_tracks: [
            {
                artist: [String],
                markets: [String],
                disk_number: Number,
                duration_ms: Number,
                explicit: Boolean,
                href: String,
                id: String,
                is_pleayable: Boolean,
                name: String,
                preview_url: String,
                track_number: Number,
                type: String,
                uri: String
            }
        ],
        spotify_genres: [String],
        spotify_label: String,
        spotify_popularity: Number,
        spotify_external_ids: {
            upc: String,
            ean: String,
            isrc: String
        }
    })

    Album = mongooseService.getMongoose().model('Albums', this.albumSchema)

    async addAlbum(albumFields: any) {
        const albumId = createId()
        const album = new this.Album({
            _ud: albumId,
            ...albumFields
        })
        await album.save()
        return album
    }

    async getAlbums(limit = 25, page = 0) {
        return this.Album.find()
            .limit(limit)
            .skip(limit * page)
            .exec()
    }

    async getAlbumById(albumId: string) {
        return this.Album.findOne({ _id: albumId }).populate('Album').exec()
    }

    async removeAlbumById(albumId: string) {
        return this.Album.deleteOne({ _id: albumId }).exec()
    }

    async updateAlbumById(albumId: string, resource: any) {
        return this.Album.findOneAndUpdate(
            { _id: albumId },
            { $set: resource },
            { new: true }
        ).exec()
    }

    async getAlbumsByArtist(artistId: string) {
        return this.Album.find({ spotify_artist: artistId }).exec()
    }

    async getAlbumsByGenre(genre: string) {
        return this.Album.find({ spotify_genres: genre }).exec()
    }

    async getAlbumsByLabel(label: string) {
        return this.Album.find({ spotify_label: label }).exec()
    }

    async getAlbumsByPopularity(popularity: number) {
        return this.Album.find({ spotify_popularity: popularity }).exec()
    }

    async getAlbumsByReleaseDate(releaseDate: string) {
        return this.Album.find({ spotify_release_date: releaseDate }).exec()
    }

    async getAlbumsByType(type: string) {
        return this.Album.find({ spotify_album_type: type }).exec()
    }

    async getAlbumsByName(name: string) {
        return this.Album.find({ name: { $regex: '.*' + name + '.*', $options: 'i' } }).exec()
    }
}

export default new AlbumsDao()