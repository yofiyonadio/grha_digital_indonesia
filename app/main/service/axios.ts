
import axios, { AxiosResponse } from 'axios'
import types from '../type'

class Axios {
    config(urls: string, datas: any, methods: types.http_method, headers?: object, auth?: {
        username: string,
        password: any
    }) {
        return new Promise((resolve, reject) => {
            axios({
                method: methods,
                url: urls,
                timeout: 900000,
                data: datas,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json; charset=utf-8',
                    ...headers
                },
                auth
            })
                .then((response: AxiosResponse) => {
                    if (response.status === 200) {
                        return resolve(response.data)
                    } else {
                        return reject(response.data)
                    }
                })
                .catch((error: any) => reject(error))
        })
    }

    get(url: string, option?: {
        data?: any,
        headers?: object,
        token?: string,
        auth?: {
            username: string,
            password: any
        }
    }): Promise<any> {
        return new Promise((resolve, reject) => {
            this.config(url, option?.data, 'GET', {
                ...{
                    Authorization: 'Bearer ' + option?.token
                },
                ...option?.headers
            }, option?.auth)
                .then(result => {
                    return resolve(result)
                })
                .catch(error => {
                    return reject(error)
                })
        })
    }

    post(url: string, option?: {
        data?: any,
        headers?: object,
        token?: string,
        auth?: {
            username: string,
            password: any
        }
    }): Promise<any> {
        return new Promise((resolve, reject) => {
            this.config(url, option?.data, 'POST', {
                ...{
                    Authorization: 'Bearer ' + option?.token
                },
                ...option?.headers
            }, option?.auth)
                .then(result => {
                    return resolve(result)
                })
                .catch(error => {
                    return reject(error)
                })
        })
    }

    method(method: types.http_method, url: string, option?: {
        data?: any,
        headers?: object,
        token?: string,
        auth?: {
            username: string,
            password: any
        }
    }): Promise<any> {
        return new Promise((resolve, reject) => {
            this.config(url, option?.data, method, {
                ...{
                    Authorization: 'Bearer ' + option?.token
                },
                ...option?.headers
            }, option?.auth)
                .then(result => {
                    return resolve(result)
                })
                .catch(error => {
                    return reject(error)
                })
        })
    }

}

export default new Axios()