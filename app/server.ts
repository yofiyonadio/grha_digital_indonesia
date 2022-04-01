import express from 'express'
import { config } from 'dotenv'
import cors from 'cors'
import history from 'connect-history-api-fallback'
import session from 'express-session'

import { Route, DB, Logger, Color, Middleware, ENV } from './registry'

class Server { }

const _instance = new Server()

config()

const app = express()
const port = ENV.APP_PORT

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
}))

app.use(cors({
  origin: '*',
  optionsSuccessStatus: 200,
}))

//Auth.passport(app)
Route.routing(app)

const staticPath = express.static(__dirname + '/public')
app.use(staticPath)
app.use(history({
  disableDotRule: true,
  verbose: true,
}))
app.use(staticPath)

app.listen(port, async () => {
  await DB.init()
  Logger.log('  ---------------- (Grha Digital Test API) server started on: ---------------', _instance, Color.pink)
  Logger.log('  ------------------ http://localhost:' + port + ENV.APP_API_URL + ' -----------------', _instance, Color.green)
})

export {
  app
}