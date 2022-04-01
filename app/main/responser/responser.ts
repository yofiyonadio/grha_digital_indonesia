import e, { Response, Request } from 'express'
import { Errors, ErrorModel } from '../../registry'

class Responser {

  good(datas: any, res: Response) {

    const data = {
      status: 'SUCCESS',
      code: 200,
      message: 'OK',
      datas,
    }

    res.status(200)
    res.json(data)
    res.end()

  }

  bad(datas: ErrorModel | Error | any, res: Response, errorCode: number) {
    Logger(datas, this)
    let _data: string
    try {
      if (datas.message) {
        _data = datas.message
      } else {
        _data = datas as any
      }
      if (datas.data.type === Errors.Type.BadRequest || datas.data.type === Errors.Code.BadRequest) {
        _data = datas.data.error
        errorCode = Errors.Code.BadRequest
      }
    } catch {
      _data = datas as any
    }
    const data = {
      status: 'ERROR',
      code: errorCode,
      message: _data,
    }

    res.status(errorCode)
    res.json(data)
    res.end()
  }

}

export default new Responser()