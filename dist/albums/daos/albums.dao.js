"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = __importDefault(require("debug"));
const mongoose_service_1 = __importDefault(require("../../common/services/mongoose.service"));
const log = (0, debug_1.default)('app:albums-dao');
class AlbumsDao {
    constructor() {
        this.Schema = mongoose_service_1.default.getMongoose().Schema;
        this.albumSchema = new this.Schema({
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
        });
        log('Created new instance of AlbumsDao');
    }
}
//# sourceMappingURL=albums.dao.js.map