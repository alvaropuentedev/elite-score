
// GET TODAY DAY
export const getTodayDate = (TODAY_DATE) => {
    const date = new Date()
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()

    TODAY_DATE = `${day}/${month}/${year}`
    return TODAY_DATE
}
