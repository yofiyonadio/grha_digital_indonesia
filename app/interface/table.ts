import { Enums } from '../registry'

export default interface TableInteface {
    name: string
    type: 'VARCHAR (10)' | 'VARCHAR (50)' | 'VARCHAR (255)' | 'SERIAL' | 'TIMESTAMPTZ' | 'INTEGER' | 'BIGINT' | 'BOOLEAN' | 'TEXT' | 'JSONB' | 'DATE' | string[] | number[]
    nullable: boolean
    primary?: boolean
    unique?: boolean
    default?: string | number | boolean
    delete?: boolean
    identity?: boolean,
    sequence?: boolean
}