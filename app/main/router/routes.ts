import { Express } from 'express'
import { ControllerV1 } from '../../registry'
import router from './route'

let App: Express
class Routes {
    router(version: number, path: string) {
        return router(version, path)
    }

    routing(app: Express) {
        App = app
        app.route('/').all(ControllerV1.HomeController.welcome)
        Object.values(ControllerV1).filter(i => !((i as any).constructor.name).includes('NotFoundContoller')).forEach(controller => controller.route(1))
        app.route('*').all(ControllerV1.NotFoundContoller.default)
    }

}

export { App }
export default Routes
