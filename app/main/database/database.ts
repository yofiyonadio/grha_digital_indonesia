import { Pool, PoolClient } from 'pg'
import { Color, ENV, Utils as U } from '../../registry'
import Migrate from './migrate'


class DB {

    db_pool: Pool

    async pool() {
        this.db_pool = new Pool({
            user: ENV.DB_USER,
            host: ENV.DB_HOST,
            password: ENV.DB_PASSWORD,
            port: ENV.DB_PORT,
        })
    }

    private async SQLRunner(query: string, client: PoolClient) {
        return await client.query(U.SQLClean(query)).catch(err => {
            Logger(err, this)
            throw query
        })
    }

    async init() {
        return new Promise(async (resolve, reject) => {

            await this.pool()
            const _client = await this.db_pool.connect()
            Logger('DB Connection success!', this, Color.blue)
            await _client.query(Migrate.createDB()).catch((err: any) => err)

            if (ENV.DB_MIGRATE === 'true') {

                const Queries = [
                    Migrate.createSCHEMA(),
                    Migrate.createTABLES(),
                    Migrate.createENUMS(),
                    Migrate.createCOLUMNS(),
                    Migrate.createDATATYPES(),
                    Migrate.createINDEXING(),
                    Migrate.createRELATIONS(),
                    Migrate.createSEEDER(),
                ]

                for (const Q of Queries) {
                    try {
                        Q.split(';').forEach(q => q.length > 0 ? Logger(U.SQLClean(q), this) : false)
                        await this.SQLRunner(Q, _client)
                    } catch (e) {
                        Logger(Q, this)
                        throw e
                    }
                }

                Logger('DB Migration success!', this, Color.blue)
            }

            _client.release()
            resolve(true)

        })
    }

    private querySelectBuilder(query: string, option: {
        count?: boolean,
        filter?: object[],
        filter_operator?: 'AND' | 'OR',
        match_case?: boolean,
        from?: {},
        where?: string,
    }): string {
        option.filter_operator ? true : option.filter_operator = 'AND'

        query = query + ' WHERE 1=1 '
        if (option.count) {
            query = query.toLowerCase().replace('select', 'SELECT count(*) OVER()::INT AS totals, ')
        }
        if (option.filter && ((option.filter as any).length > 0 || (option.filter as any).length === undefined)) {
            (option.filter as any).length === undefined ? option.filter = [option.filter] : true
            try {
                const filter_obj: any = {}
                Object.keys(option.filter[0]).forEach(i => filter_obj[i] = [])
                option.filter.forEach((item: any) => {
                    Object.keys(item).forEach(i => {
                        try {
                            filter_obj[i].push(item[i])
                        } catch {
                            filter_obj[i] = [item[i]]
                        }
                    })
                })

                const filter_join = Object.keys(filter_obj).map(i => {
                    const filter_sub = filter_obj[i].map((ii: any) => {
                        let prefix: string
                        if (option.from) {
                            prefix = Object.keys(option.from as any).length > 0 ? `"${(option.from as any)[i]}".` : ''
                        } else {
                            prefix = ''
                        }

                        if (!['offset', 'limit'].includes(i)) {
                            if (typeof ii === 'number') return `${prefix}"${i}" = ${ii}`
                            if (typeof ii === 'string') return `${prefix}"${i}" ${option.match_case ? 'ILIKE' : '='} '${ii}'`
                            return null
                        }
                        return undefined
                    }).filter((ii: any) => !!ii)
                    if (filter_sub.length > 0) {
                        return '(' + filter_sub.join(' OR ') + ')'
                    }
                    return undefined
                }).filter(i => !!i).join(' ' + option.filter_operator + ' ')
                query = query + ' ' + (filter_join.trim() ? option.filter_operator : ' ' + ' ') + ' ' + filter_join
            } catch (e) {
                Logger(e, this)
                throw e
            }
        }
        if (option.where) {
            query = query + ' AND ' + option.where
        }
        if (option.filter) {
            let offset: number
            let limit: number
            if (option.filter.length === undefined) {
                limit = (option.filter as any).limit
                offset = (option.filter as any).offset
            } else {
                limit = (option.filter[0] as any).limit
                offset = (option.filter[0] as any).offset
            }
            if (offset !== undefined) {
                query = query + ' OFFSET ' + offset
            }
            if (limit !== undefined) {
                query = query + ' LIMIT ' + limit
            }
        }
        //Logger.log(U.SQLClean(query), this)
        return query
    }

    async insert(datas: {}, record: any) {
        const schema = record.table().schema
        const table = record.table().name
        const query = `INSERT INTO "${schema}"."${table}" (${Object.keys(datas).map(i => '"' + i + '"').join(', ')}) VALUES (${Object.values(datas).map(i => "'" + i + "'").join(', ')})`
        return this.query(query)
    }

    async update(datas: {}, record: any) {
        const schema = record.table().schema
        const table = record.table().name
        const query = `
        UPDATE "${schema}"."${table}" SET
        ${Object.keys(datas).map(i => {
            let value = (datas as any)[i]
            if (value === null || value === undefined) {
                value = null
            } else {
                value = U.SQLString(value)
            }
            return U.SQLObject(i) + ' = ' + value
        })},
        "updated_at" = NOW()
        WHERE "id" = ${(datas as any).id}
        `
        return this.query(query)
    }

    async delete(datas: {}, record: any) {
        const schema = record.table().schema
        const table = record.table().name
        const query = `
        UPDATE "${schema}"."${table}" SET
        "deleted_at" = NOW()
        WHERE "id" = ${(datas as any).id}
        AND "deleted_at" IS NULL`
        return this.query(query)
    }

    async select(query: string, option?: {
        count?: boolean,
        filter?: object[] | {},
        filter_operator?: 'AND' | 'OR',
        match_case?: boolean,
        from?: {},
        where?: string,
    }): Promise<any> {
        query = option ? this.querySelectBuilder(query, option as any) : query
        return this.query(query)
    }

    async query(query: string): Promise<any> {
        return new Promise(async (resolve, reject) => {
            const _client = await this.db_pool.connect()
            await _client.query(query)
                .then(res => {
                    if (res.command === 'SELECT') {
                        _client.release()
                        resolve(res.rows)
                    }
                    if (res.command === 'INSERT' && res.rowCount > 0) {
                        _client.release()
                        resolve(true)
                    }
                    if (res.command === 'UPDATE' && res.rowCount > 0) {
                        _client.release()
                        resolve(true)
                    }
                    if (res.command === 'DELETE') {
                        _client.release()
                        resolve(true)
                    }
                    reject(false)
                }).catch(e => {
                    _client.release()
                    Logger(U.SQLClean(query), this)
                    Logger(e, this)
                    //reject('Query DB Error!')
                    reject(e.detail)
                })
        })
    }

}

export default new DB()