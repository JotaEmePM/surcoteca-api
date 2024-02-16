"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_service_1 = __importDefault(require("@/common/services/mongoose.service"));
const cuid2_1 = require("@paralleldrive/cuid2");
const debug_1 = __importDefault(require("debug"));
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
        });
        this.Album = mongoose_service_1.default.getMongoose().model('Albums', this.albumSchema);
        log('Created new instance of AlbumsDao');
    }
    addAlbum(albumFields) {
        return __awaiter(this, void 0, void 0, function* () {
            const albumId = (0, cuid2_1.createId)();
            const album = new this.Album(Object.assign({ _ud: albumId }, albumFields));
            yield album.save();
            return album;
        });
    }
    getAlbums(limit = 25, page = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.Album.find()
                .limit(limit)
                .skip(limit * page)
                .exec();
        });
    }
    getAlbumById(albumId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.Album.findOne({ _id: albumId }).populate('Album').exec();
        });
    }
    removeAlbumById(albumId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.Album.deleteOne({ _id: albumId }).exec();
        });
    }
    updateAlbumById(albumId, resource) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.Album.findOneAndUpdate({ _id: albumId }, { $set: resource }, { new: true }).exec();
        });
    }
    getAlbumsByArtist(artistId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.Album.find({ spotify_artist: artistId }).exec();
        });
    }
    getAlbumsByGenre(genre) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.Album.find({ spotify_genres: genre }).exec();
        });
    }
    getAlbumsByLabel(label) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.Album.find({ spotify_label: label }).exec();
        });
    }
    getAlbumsByPopularity(popularity) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.Album.find({ spotify_popularity: popularity }).exec();
        });
    }
    getAlbumsByReleaseDate(releaseDate) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.Album.find({ spotify_release_date: releaseDate }).exec();
        });
    }
    getAlbumsByType(type) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.Album.find({ spotify_album_type: type }).exec();
        });
    }
    getAlbumsByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.Album.find({ name: { $regex: '.*' + name + '.*', $options: 'i' } }).exec();
        });
    }
}
exports.default = new AlbumsDao();
//# sourceMappingURL=albums.dao.js.map