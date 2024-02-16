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

        spotify_tracks_href: String
        //spotify_tracks: {        }



    })
}