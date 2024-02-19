import { PermissionFlag } from '../../../common/middleware/common.permissionflag.enum';
import mongooseService from '../../../common/services/mongoose.service';

import { CreateUserDto } from '../dto/create.user.dto';
import { PatchUserDto } from '../dto/patch.user.dto';
import { PutUserDto } from '../dto/put.user.dto';

import { createId } from '@paralleldrive/cuid2';
import debug from 'debug';

const log: debug.IDebugger = debug('app:users-dao')

class UsersDao {
    constructor() {
        log('Created new instance of UsersDao')
    }

    Schema = mongooseService.getMongoose().Schema;

    // email: String,
    // password: { type: String, select: false },
    userSchema = new this.Schema({
        _id: String,
        username: String,
        email: [
            {
                id: String,
                email: String,
                verified: Boolean,
                guid: String,
                created: Date,
                endDate: Date,
                verifiedDate: Date,
            }
        ],
        password: [
            {
                id: String,
                password: { type: String, select: false },
                created: Date,
                endDate: Date
            }
        ],
        firstName: String,
        lastName: String,
        permissionFlags: Number,
    }, { id: false });

    User = mongooseService.getMongoose().model('Users', this.userSchema);

    async addUser(userFields: CreateUserDto) {
        const userId = createId()
        const user = new this.User({
            _id: userId,
            username: userFields.username,
            email: [
                {
                    id: createId(),
                    email: userFields.email,
                    verified: false,
                    guid: createId(),
                    created: new Date(),
                    endDate: null,
                    verifiedDate: null,
                }
            ],
            password: [
                {
                    id: createId(),
                    password: userFields.password,
                    created: new Date(),
                    endDate: null
                }
            ],
            permissionFlags: PermissionFlag.FREE_PERMISSION,
        });
        await user.save();
        return userId;
    }

    async getUserByEmail(email: string) {
        try {
            return this.User.findOne({ "email.email": email }).exec();
        } catch (e) {
            log(`error-> ${e}`)
        }
    }

    async getUserById(userId: string) {
        return this.User.findOne({ _id: userId }).populate('User').exec();
    }

    async getUsers(limit = 25, page = 0) {
        return this.User.find()
            .limit(limit)
            .skip(limit * page)
            .exec();
    }

    async updateUserById(
        userId: string,
        userFields: PatchUserDto | PutUserDto
    ) {
        const existingUser = await this.User.findOneAndUpdate(
            { _id: userId },
            { $set: userFields },
            { new: true }
        ).exec();

        return existingUser;
    }

    async removeUserById(userId: string) {
        return this.User.deleteOne({ _id: userId }).exec();
    }

    async getUserByEmailWithPassword(email: string) {
        return this.User.findOne({ email: email })
            .select('_id email permissionFlags +password')
            .exec();
    }
}

export default new UsersDao()