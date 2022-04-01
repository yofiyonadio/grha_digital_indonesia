import { Interfaces, Joi } from '../registry'
import joi from 'joi'

class ParrentRecord {

    parrentJoi() {
        return {
            id: joi.number(),
            created_at: joi.date(),
            updated_at: joi.date(),
            deleted_at: joi.date(),
            limit: joi.number(),
            offset: joi.number(),
        }
    }

    parrentColumns(): Interfaces.TableInteface[] {
        return [
            {
                name: 'id',
                type: 'INTEGER',
                nullable: false,
                primary: true,
                identity: true
            },
            {
                name: 'created_at',
                type: 'TIMESTAMPTZ',
                nullable: true,
                default: 'NOW()'
            },
            {
                name: 'updated_at',
                type: 'TIMESTAMPTZ',
                nullable: true,
            },
            {
                name: 'deleted_at',
                type: 'TIMESTAMPTZ',
                nullable: true,
            },
        ]
    }

}



export default ParrentRecord