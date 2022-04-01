import _joi from 'joi'
import { Errors, ErrorModel } from '../../registry'

const Joi = (
    {
        key,
        data
    }: {
        key: object,
        data: object
    }) => {
    if (!_joi.object().keys(key).validate(data).error) {
        return true
    } else {
        throw new ErrorModel({
            type: Errors.Type.BadRequest,
            error: 'parameter type not valid'
        })
    }
}

export default Joi