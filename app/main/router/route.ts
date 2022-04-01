import { ENV } from '../../registry'
import Methods from './method'

export default function router(version: number, path: string) {
    let base_url = ENV.APP_API_URL
    if (!base_url?.split('/')[1]?.length) {
        base_url = ''
    }
    return new Methods(base_url + '/v' + version + path)
}