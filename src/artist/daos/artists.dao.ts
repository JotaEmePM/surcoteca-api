import debug from "debug";
import mongooseService from "../../common/services/mongoose.service";
import { CreateArtistDto } from "../dto/create.artist.dto";

import { createId } from '@paralleldrive/cuid2';

const log: debug.IDebugger = debug('app:artists-dao')

class ArtistsDao {
    constructor() {
        log('Created new instance of ArtistsDao')
    }

    Schema = mongooseService.getMongoose().Schema;

    artistSchema = new this.Schema({
        _id: String,
        name: String,
        genres: [String],

        spotify_id: String,
        spotify_images: [String],
        spotify_uri: String,
        spotify_href: String,
        spotify_followers: Number,
        spotify_popularity: Number,
        spotify_type: String
    }, { id: false });

    Artist = mongooseService.getMongoose().model('Artists', this.artistSchema);

    async addArtist(artistFields: CreateArtistDto) {
        const artistId = createId()
        const artist = new this.Artist({
            _id: artistId,
            ...artistFields
        });
        await artist.save();
        return artistId;
    }

    async getArtists(limit = 25, page = 0) {
        return this.Artist.find()
            .limit(limit)
            .skip(limit * page)
            .exec();
    }

    async getArtistById(artistId: string) {
        return this.Artist.findOne({ _id: artistId }).populate('Artist').exec();
    }

    async removeArtistById(artistId: string) {
        return this.Artist.deleteOne({ _id: artistId }).exec();
    }

    // TODO: cambiar tipo de resource
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async updateArtistById(artistId: string, resource: any) {
        return this.Artist.findOneAndUpdate(
            { _id: artistId }, 
            { $set: resource },
            { new: true }
        ).exec();
    }
}

export default new ArtistsDao()