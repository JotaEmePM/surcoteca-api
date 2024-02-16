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
const artists_dao_1 = __importDefault(require("../daos/artists.dao"));
class ArtistService {
    create(resource) {
        return __awaiter(this, void 0, void 0, function* () {
            return artists_dao_1.default.addArtist(resource);
        });
    }
    list(limit, page) {
        return __awaiter(this, void 0, void 0, function* () {
            return artists_dao_1.default.getArtists(limit, page);
        });
    }
    putById(id, resource) {
        return __awaiter(this, void 0, void 0, function* () {
            return artists_dao_1.default.updateArtistById(id, resource);
        });
    }
    readById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return artists_dao_1.default.getArtistById(id);
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return artists_dao_1.default.removeArtistById(id);
        });
    }
    patchById(id, resource) {
        return __awaiter(this, void 0, void 0, function* () {
            return artists_dao_1.default.updateArtistById(id, resource);
        });
    }
}
exports.default = new ArtistService();
//# sourceMappingURL=artist.service.js.map