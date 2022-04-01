import moment from 'moment'


class Time {

    private pattern_timestamp = 'YYYY-MM-DD HH:mm:ss'
    private pattern_date = 'YYYY-MM-DD'
    private pattern_time = 'HH:mm:ss'

    now() {
        return moment()
    }

    dateTime(date: Date | string) {
        return moment(date)
    }

    nowString() {
        return moment().format(this.pattern_timestamp)
    }

    timeNowString() {
        return moment().format(this.pattern_time)
    }

    toDayString() {
        return moment().format(this.pattern_date)
    }

    toTimeString(date: Date | string) {
        return moment(date).format(this.pattern_time)
    }

    toDateTimeString(date: Date | string) {
        return moment(date).format(this.pattern_timestamp)
    }

    toDateString(date: Date | string) {
        return moment(date).format(this.pattern_date)
    }

}

export default new Time()