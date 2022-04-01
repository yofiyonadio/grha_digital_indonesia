import { Response, Request } from 'express'
import { App } from './routes'
import { app } from '../../server'
import { Middleware } from '../../registry'

class Methods {
    private path: string

    constructor(path: string) {
        this.path = path
    }

    private middleware(auth: boolean): void {
        app.use((req, res, next) => {
            Middleware.default(req, res, next, auth)
        })
    }

    GET(func: (req: Request, res: Response) => any, auth: boolean = false) {
        this.middleware(auth)
        App.route(this.path).get(func)
    }

    POST(func: (req: Request, res: Response) => any, auth: boolean = false) {
        this.middleware(auth)
        App.route(this.path).post(func)
    }

    PUT(func: (req: Request, res: Response) => any, auth: boolean = false) {
        this.middleware(auth)
        App.route(this.path).put(func)
    }

    DELETE(func: (req: Request, res: Response) => any, auth: boolean = false) {
        this.middleware(auth)
        App.route(this.path).delete(func)
    }

    ALL(func: (req: Request, res: Response) => any, auth: boolean = false) {
        this.middleware(auth)
        App.route(this.path).all(func)
    }
}

export default Methods