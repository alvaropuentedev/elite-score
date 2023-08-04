
// GET TIME
export const toDateTime = (secs) => {
    const t = new Date(1970, 0, 1)
    t.setSeconds(secs)
    let hours = t.getHours() + 2
    const minutes = String(t.getMinutes()).padStart(2, '0')
    let day = t.getDate()
    let month = t.getMonth() + 1
    hours = hours % 24
    if (hours === 0 || hours === 1) {
        day = day + 1
        if (day === 32) {
            day = 1
            month = month + 1
        }
    }
    return day + '/' + month + '  ' + hours + ':' + minutes
}
