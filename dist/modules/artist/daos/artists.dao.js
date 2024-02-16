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
const debug_1 = __importDefault(require("debug"));
const cuid2_1 = require("@paralleldrive/cuid2");
const log = (0, debug_1.default)('app:artists-dao');
class ArtistsDao {
    constructor() {
        this.Schema = mongoose_service_1.default.getMongoose().Schema;
        this.artistSchema = new this.Schema({
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
        this.Artist = mongoose_service_1.default.getMongoose().model('Artists', this.artistSchema);
        log('Created new instance of ArtistsDao');
    }
    addArtist(artistFields) {
        return __awaiter(this, void 0, void 0, function* () {
            const artistId = (0, cuid2_1.createId)();
            const artist = new this.Artist(Object.assign({ _id: artistId }, artistFields));
            yield artist.save();
            return artistId;
        });
    }
    getArtists(limit = 25, page = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.Artist.find()
                .limit(limit)
                .skip(limit * page)
                .exec();
        });
    }
    getArtistById(artistId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.Artist.findOne({ _id: artistId }).populate('Artist').exec();
        });
    }
    removeArtistById(artistId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.Artist.deleteOne({ _id: artistId }).exec();
        });
    }
    // TODO: cambiar tipo de resource
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updateArtistById(artistId, resource) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.Artist.findOneAndUpdate({ _id: artistId }, { $set: resource }, { new: true }).exec();
        });
    }
}
exports.default = new ArtistsDao();
//# sourceMappingURL=artists.dao.js.map