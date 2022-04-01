import { Response, Request, Express } from 'express'
import { Responser, Jwt, Route, ENV, Errors } from '../../registry'


class AuthController {

    route(version: number) {
        Route.router(version, '/auth').GET(this.generate)
        Route.router(version, '/auth').POST(this.generate)
        Route.router(version, '/auth/login/phone').POST(this.loginPhone)
    }

    async loginPhone(req: Request, res: Response) {
        const phone = req.body.phone
        return Responser.good(phone, res)
    }

    async generate(req: Request, res: Response) {
        const token = await Jwt.encode(ENV.JWT_SECRET).catch(err => err)
        return Responser.good({ token }, res)
    }

}

export default new AuthController()
