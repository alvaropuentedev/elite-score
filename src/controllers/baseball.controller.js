const path = require('path')
const API_KEY = process.env.API_KEY
const controller = {}

controller.baseball = (request, response) => {
    response.sendFile(path.resolve(__dirname, '../baseball.html'))
}
// FETCH HEADER
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': 'baseballapi.p.rapidapi.com'
    }
}

// FETCH NEWS
controller.news = (request, response) => {
    const optionsNews = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': 'allscores.p.rapidapi.com'
        }
    }
    const fetchNews = async () => {
        const urlNews = 'https://allscores.p.rapidapi.com/api/allscores/news?sport=7&timezone=Europe%2FMadrid&langId=1'
        const res = await fetch(urlNews, optionsNews)
        const dataNews = await res.json()
        response.json(dataNews)
    }
    fetchNews()
}

// FETCH SCHEDULE BASEBALL
controller.schedule = (request, response) => {
    // FETCH SCHEDULE
    const fetchDataSchedule = async (todayDate) => {
        todayDate = request.query.todayDate
        const urlSchedule = `https://baseballapi.p.rapidapi.com/api/baseball/matches/${todayDate}`
        const res = await fetch(urlSchedule, options)
        const dataSchedule = await res.json()
        response.json(dataSchedule)
    }
    fetchDataSchedule()
}
// FETCH LINEUPS BASEBALL
controller.lineups = (request, response) => {
    // FETCH LINEUPS
    const fetchLineups = async (matchId) => {
        matchId = request.query.matchId
        const urlTeamLineupBaseball = `https://baseballapi.p.rapidapi.com/api/baseball/match/${matchId}/lineups`
        const resLineup = await fetch(urlTeamLineupBaseball, options)
        // const resLineup = await fetch('lineupsBaseball.json')
        const dataLineup = await resLineup.json()
        response.json(dataLineup)
    }
    fetchLineups()
}
module.exports = controller
