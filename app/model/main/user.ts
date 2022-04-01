import { Enums, Schema, Joi } from '../../registry'
import { ParrentRecord } from '../../record'
import { ParrentInterface, TableInteface } from '../../interface'
import joi from 'joi'

export interface UserInterface extends ParrentInterface {
    email: string
    phone?: number
    password?: string
    token?: string
    role?: Enums.UserRole
    status?: Enums.UserStatus
    desc?: string
}

export const UserValidator = (data: UserInterface) => {
    return Joi({
        key: {
            ... new ParrentRecord().parrentJoi(),
            email: joi.string(),
            phone: joi.number(),
            password: joi.string(),
            token: joi.string(),
            role: joi.string().valid(...Object.values(Enums.UserRole)),
            status: joi.string().valid(...Object.values(Enums.UserStatus)),
            desc: joi.string().allow(''),
        },
        data
    })
}
export class UserRecord extends ParrentRecord {

    public table() {
        return {
            schema: Schema.app,
            name: 'user',
        }
    }

    public columns(): TableInteface[] {
        return [
            ...this.parrentColumns(),
            {
                name: 'email',
                type: 'VARCHAR (50)',
                nullable: true,
                unique: true,
            },
            {
                name: 'phone',
                type: 'BIGINT',
                nullable: true,
                unique: true,
            },
            {
                name: 'password',
                type: 'VARCHAR (255)',
                nullable: true,
            },
            {
                name: 'token',
                type: 'VARCHAR (255)',
                nullable: true,
            },
            {
                name: 'role',
                type: Object.values(Enums.UserRole),
                nullable: true,
                default: Enums.UserRole.USER,
            },
            {
                name: 'status',
                type: Object.values(Enums.UserStatus),
                nullable: true,
                default: Enums.UserStatus.PENDING,
            },
            {
                name: 'desc',
                type: 'VARCHAR (255)',
                nullable: true,
            },
        ]
    }

    public seeder(): UserInterface[] {
        return [
            {
                email: 'admin@gmail.com',
                phone: 8123456789,
                role: Enums.UserRole.ADMIN,
                status: Enums.UserStatus.ACTIVED,
            },
            {
                email: 'user@gmail.com',
                phone: 8111111111,
                role: Enums.UserRole.USER,
                status: Enums.UserStatus.ACTIVED,
            }
        ]
    }


}

export default new UserRecord()