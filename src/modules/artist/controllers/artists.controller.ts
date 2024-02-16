import debug from 'debug';
import express from 'express';
import artistsService from '../services/artist.service';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const log: debug.IDebugger = debug('app:artists-controller');

class ArtistController {
    async listArtists(req: express.Request, res: express.Response) {
        const artists = await artistsService.list(100, 0);
        res.status(200).send(artists);
    }

    async createArtist(req: express.Request, res: express.Response) {        
        const artistId = await artistsService.create(req.body);
        res.status(201).send({ id: artistId });
    }
}

export default new ArtistController();