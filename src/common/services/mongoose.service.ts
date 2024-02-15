import debug from 'debug';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

const log: debug.IDebugger = debug('app:mongoose-service');

class MongooseService {
    private count = 0;
    private mongooseOptions = {
    };

    constructor() {
        dotenv.config();
        this.connectWithRetry();
    }

    getMongoose() {
        return mongoose;
    }

    connectWithRetry = () => {
        log('Attempting MongoDB connection (will retry if needed)');

        const mongo_url: string = process.env.MONGO_URL || '';

        mongoose
            .connect(mongo_url, this.mongooseOptions)
            .then(() => {
                log('MongoDB is connected');
            })
            .catch((err) => {
                const retrySeconds = 5;
                log(
                    `MongoDB connection unsuccessful (will retry #${++this
                        .count} after ${retrySeconds} seconds):`,
                    err
                );
                setTimeout(this.connectWithRetry, retrySeconds * 1000);
            });
    };
}
export default new MongooseService();