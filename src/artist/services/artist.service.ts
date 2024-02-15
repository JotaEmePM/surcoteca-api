/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CRUD } from "../../common/interfaces/crud.interface";
import artistsDao from "../daos/artists.dao";
import { CreateArtistDto } from "../dto/create.artist.dto";

class ArtistService implements CRUD {
        
    async create(resource: CreateArtistDto) {
        return artistsDao.addArtist(resource)
    }

    async list(limit: number, page: number) {
        return artistsDao.getArtists(limit, page);
    }
    
    async putById(id: string, resource: any): Promise<any> {
        return artistsDao.updateArtistById(id, resource);
    }

    async readById(id: string) {
        return artistsDao.getArtistById(id)
    }

    async deleteById(id: string): Promise<any> {
        return artistsDao.removeArtistById(id)
    }

    async patchById(id: string, resource: any): Promise<any> {
        return artistsDao.updateArtistById(id, resource);
    }

}

export default new ArtistService()