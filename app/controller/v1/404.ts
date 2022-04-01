import { Response, Request, Express } from 'express'
import { Responser, Route } from '../../registry'

class NotFoundContoller {

    route(version: number) {
        Route.router(version, '*').ALL(this.default)
    }

    default(req: Request, res: Response) {
        Responser.bad('Page not found', res, 404)
    }

}

export default new NotFoundContoller()
