import { Response, Request, NextFunction } from 'express'

import { Responser, Jwt, ENV } from '../../registry'

class Middleware {

    async default(req: Request, res: Response, next: NextFunction, auth: boolean) {
        const token = req.headers.authorization?.split(' ')[1] as string

        if (auth) {
            const sign = await Jwt.decode(token).then(() => true).catch(() => false)
            if (sign) { next() } else { Responser.bad('Unauthorized', res, 401) }
        } else { next() }

    }

}

export default new Middleware()
