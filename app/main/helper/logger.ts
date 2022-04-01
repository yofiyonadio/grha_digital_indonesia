import chalk from 'chalk'
import Color from './color'



class Loggers {
    log(log: any, thiss: object, color?: Color) {
        Logger(log, thiss, color)
    }
}

export default new Loggers()

declare global {
    function Logger(log: any, thiss: object | string, color?: Color): void
    var globals: string
}

global.globals = "hello global!"

global.Logger = (log: any, thiss: object | string, color?: Color) => {
    let class_name: string
    try {
        class_name = typeof thiss === 'string' ? thiss : (thiss as any).constructor.name
    } catch {
        class_name = ''
    }
    // tslint:disable-next-line: no-console
    if (color) console.log(class_name, ':::>', chalk.hex(color)(log))
    // tslint:disable-next-line: no-console
    else console.log(class_name, ':::>', log)
}