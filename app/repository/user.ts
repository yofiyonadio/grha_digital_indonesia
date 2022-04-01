import { DB, Enums, Logger } from '../registry'

import { UserModel } from '../model'

class UserRepository {

    async get({
        filter,
    }: {
        filter?: Partial<UserModel.UserInterface>[] | Partial<UserModel.UserInterface>,
        filter_operator?: 'AND' | 'OR',
        match_case?: boolean,
        from?: {},
    } = {}): Promise<UserModel.UserInterface[]> {
        return DB.select(`
        SELECT * FROM app.user "user"
        `, {
            count: true,
            filter,
        })
    }

    async insert(datas: UserModel.UserInterface) {
        return DB.insert(datas, UserModel.default)
    }

    async update(datas: Partial<UserModel.UserInterface>) {
        return DB.update(datas, UserModel.default)
    }

    async delete(datas: { id: number }) {
        return DB.delete(datas, UserModel.default)
    }

}

export default new UserRepository()
