import { Response, Request } from 'express'
import { Express } from 'express'

import { Responser as Respon, Repositories as Repo, Enums, Interfaces, Utils as U, Route, Errors } from '../../registry'

import { UserModel } from '../../model'

class UserController {

    route(version: number) {
        Route.router(version, '/user').GET(this.get)
        Route.router(version, '/user').POST(this.insert)
        Route.router(version, '/user').PUT(this.update)
        Route.router(version, '/user').DELETE(this.delete)
    }

    async get(req: Request, res: Response) {
        try {
            const requestQuery = U.queryModel(req, UserModel.default.columns())

            UserModel.UserValidator(requestQuery)

            return await Repo.UserRepository.get({
                filter: requestQuery,
            }).then(data => Respon.good(data, res)).catch(error => { throw error })

        } catch (e) {
            Respon.bad(e, res, Errors.Code.InternalServer)
        }
    }

    async insert(req: Request, res: Response) {
        try {
            const datas = req.body
            return await Repo.UserRepository.insert(datas).then(data => Respon.good(data, res)).catch(error => { throw error })
        } catch (e) {
            Respon.bad(e, res, Errors.Code.InternalServer)
        }

    }

    async update(req: Request, res: Response) {
        try {
            const datas = req.body
            return await Repo.UserRepository.update(datas).then(data => Respon.good(data, res)).catch(error => { throw error })
        } catch (e) {
            Respon.bad(e, res, Errors.Code.InternalServer)
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const datas = req.body
            return await Repo.UserRepository.delete(datas).then(data => Respon.good(data, res)).catch(error => { throw error })
        } catch (e) {
            Respon.bad(e, res, Errors.Code.InternalServer)
        }
    }

}

export default new UserController()
