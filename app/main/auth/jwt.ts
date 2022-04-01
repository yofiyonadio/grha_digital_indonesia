import jwt from 'jsonwebtoken'

import { ENV } from '../../registry'

class Jwt {

    encode(key: any) {
        return new Promise((resolve, reject) => {
            jwt.sign(key, ENV.JWT_SECRET, {}, (error, token) => {
                if (error) {
                    reject(error)
                }
                resolve(token)
            })
        })
    }

    decode(token: string) {
        return new Promise((resolve, reject) => {
            return jwt.verify(token, ENV.JWT_SECRET, (error, decoded) => {
                if (error) {
                    reject('Auth failed!')
                } else {
                    resolve(decoded)
                }
            })
        })
    }

}


export default new Jwt()
