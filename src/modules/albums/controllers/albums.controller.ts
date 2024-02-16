import debug from 'debug'
import express from 'express'
import albumService from '../services/album.service'

const log: debug.IDebugger  = debug('app:albums-controller')

class AlbumController {
    async listAlbums(req: express.Request, res: express.Response) {
        const albums = await albumService.list(100, 0)
        res.status(200).send(albums)
    }

    async createAlbum(req: express.Request, res: express.Response) {
        const albumId = await albumService.create(req.body)
        res.status(201).send({ id: albumId })
    }
}

export default new AlbumController()
