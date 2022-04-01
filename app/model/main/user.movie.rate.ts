import { Enums, Schema, Joi } from '../../registry'
import { ParrentRecord } from '../../record'
import UserRecord from './user'
import MovieRecord from './movie'
import { ParrentInterface, TableInteface, RelationInterface } from '../../interface'
import joi from 'joi'

export interface UserMovieRateInterface extends ParrentInterface {
    user_id: number
    movie_id: number,
    rate: 1 | 2 | 3 | 4 | 5
}

export const UserMovieRateValidator = (data: UserMovieRateInterface) => {
    return Joi({
        key: {
            ... new ParrentRecord().parrentJoi(),
            user_id: joi.number(),
            movie_id: joi.number(),
            rate: joi.number(),
        },
        data
    })
}
export class UserMovieRateRecord extends ParrentRecord {

    public table() {
        return {
            schema: Schema.app,
            name: 'user_movie_rate',
        }
    }

    public columns(): TableInteface[] {
        return [
            ...this.parrentColumns(),
            {
                name: 'user_id',
                type: 'INTEGER',
                nullable: false,
            },
            {
                name: 'movie_id',
                type: 'INTEGER',
                nullable: false,
            },
            {
                name: 'rate',
                type: 'INTEGER',
                nullable: false,
            }
        ]
    }

    public relation(): RelationInterface[] {
        return [
            {
                ref_table: UserRecord,
                ref_column: 'id',
                foreign_column: 'user_id'
            },
            {
                ref_table: MovieRecord,
                ref_column: 'id',
                foreign_column: 'movie_id'
            }
        ]
    }

}

export default new UserMovieRateRecord()