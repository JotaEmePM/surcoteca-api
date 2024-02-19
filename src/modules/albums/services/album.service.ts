import { CRUD } from "../../../common/interfaces/crud.interface"
import albumsDao from "../daos/albums.dao"

class AlbumService implements CRUD {
    async list(limit: number, page: number) {
        return albumsDao.getAlbums(limit, page)
    }

    async create(resource: any) {
        return albumsDao.addAlbum(resource)
    }

    async putById(id: string, resource: any): Promise<any> {
        return albumsDao.updateAlbumById(id, resource)
    }

    async readById(id: string) {
        return albumsDao.getAlbumById(id)
    }

    async deleteById(id: string): Promise<any> {
        return albumsDao.removeAlbumById(id)
    }

    async patchById(id: string, resource: any): Promise<any> {
        return albumsDao.updateAlbumById(id, resource)
    }
}

export default new AlbumService()
