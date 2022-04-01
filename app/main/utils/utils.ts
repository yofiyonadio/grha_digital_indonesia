import { Request } from 'express'
import { Interfaces, Time } from '../../registry'

export function SQLString(text: string | any): string {
    return "'" + text + "'"
}

export function SQLObject(text: string | any): string {
    return '"' + text + '"'
}

export function SQLValue(text: string | any): string {
    return (text instanceof Date) ? SQLString(Time.toDateTimeString(text)) : SQLString(text)
}

export function SQLClean(string: any): string {
    /*
    return string.split('\n').join(' ').split('\r').join(' ').split('\t').join(' ').replace(/\s\s+/g, ' ').split(' ,').join(',').split(',  ').join(', ').replace(/[;;]+/g, ';')
    */
    return string.replace(/[\n|\r|\t]+/g, ' ').replace(/\s\s+/g, ' ').replace(/ ,/g, ',').replace(/, /g, ',').replace(/,  /g, ',').replace(/[;;]+/g, ';')
}

export function isNumber(value: any): boolean {
    return !isNaN(parseInt(value, 10))
}

export function isNumberOrNull(value: any): boolean {
    if (!isNaN(parseInt(value, 10))) {
        return true
    }
    if (value === null || value === undefined) {
        return true
    }
    return false
}

export function toNumber(value: any): number {
    return value * 1
}

export function queryModel(req: Request, record: Interfaces.TableInteface[]) {
    try {
        if (Object.keys(req.query).length > 0) {
            const offset = req.query.offset ? toNumber(req.query.offset) : undefined
            const limit = req.query.limit ? toNumber(req.query.limit) : undefined
            let _obj: any = record.map((i: any) => {
                let _query: any = req.query[i.name]
                if (!isNaN(_query * 1)) {
                    _query = parseInt(_query, 10)
                }
                return _query !== undefined ? { [i.name]: _query } : undefined
            }).filter((i: any) => !!i)

            if (_obj.length > 0) {
                _obj = _obj.reduce((first: any, item: any) => {
                    return { ...first, ...item }
                })
            } else {
                _obj = {}
            }
            if (isNumber(offset)) (_obj as any).offset = offset
            if (isNumber(limit)) (_obj as any).limit = limit

            if (!isNumberOrNull(offset) || !isNumberOrNull(limit)) {
                throw 'queryModel ::> offset or limit must a number'
            }

            if (_obj) {
                return _obj
            } else {
                throw _obj
            }

        }
        return {}
    } catch (e) {
        throw e
    }
}