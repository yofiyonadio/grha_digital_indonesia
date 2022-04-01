import { Enums, Schema, Joi } from '../../registry'
import { ParrentRecord } from '../../record'
import { ParrentInterface, TableInteface } from '../../interface'
import joi from 'joi'

export interface MovieInterface extends ParrentInterface {
    name: string
    status: Enums.MovieStatus
    desc?: string
}

export const MovieValidator = (data: MovieInterface) => {
    return Joi({
        key: {
            ... new ParrentRecord().parrentJoi(),
            name: joi.string(),
            status: joi.string().valid(...Object.values(Enums.MovieStatus)),
            desc: joi.string().allow(''),
        },
        data
    })
}
export class MovieRecord extends ParrentRecord {

    public table() {
        return {
            schema: Schema.app,
            name: 'movie',
        }
    }

    public columns(): TableInteface[] {
        return [
            ...this.parrentColumns(),
            {
                name: 'name',
                type: 'VARCHAR (50)',
                nullable: false,
                unique: true,
            },
            {
                name: 'status',
                type: Object.values(Enums.MovieStatus),
                nullable: false,
                default: Enums.MovieStatus.COMINGSOON,
            },
            {
                name: 'desc',
                type: 'VARCHAR (255)',
                nullable: true,
            },
        ]
    }

}

export default new MovieRecord()