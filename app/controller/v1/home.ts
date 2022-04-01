import { Response, Request, Express } from 'express'
import { Responser as Respon, DB, Route, Controllers } from '../../registry'
class HomeController {
    route(version: number) {
        Route.router(version, '/').ALL(this.welcome)
    }

    async welcome(req: Request, res: Response) {
        Respon.good('Grha Digital Test API Server is Running, Enjoy :)', res)
    }

}

export default new HomeController()
