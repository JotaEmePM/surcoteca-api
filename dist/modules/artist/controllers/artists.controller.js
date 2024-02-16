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
const debug_1 = __importDefault(require("debug"));
const artist_service_1 = __importDefault(require("../services/artist.service"));
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const log = (0, debug_1.default)('app:artists-controller');
class ArtistController {
    listArtists(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const artists = yield artist_service_1.default.list(100, 0);
            res.status(200).send(artists);
        });
    }
    createArtist(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const artistId = yield artist_service_1.default.create(req.body);
            res.status(201).send({ id: artistId });
        });
    }
}
exports.default = new ArtistController();
//# sourceMappingURL=artists.controller.js.map