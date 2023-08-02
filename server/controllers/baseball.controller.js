const path = require('path')
const controller = {}

controller.baseball = (request, response) => {
    response.sendFile(path.resolve(__dirname, '../../public/baseball.html'))
}

const API_KEY = process.env.API_KEY

// FETCH HEADER
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': 'baseballapi.p.rapidapi.com'
    }
}
// FETCH HEADER
const optionsAllSports = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': 'allsportsapi2.p.rapidapi.com'
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

// FETCH SCHEDULE
controller.schedule = (request, response) => {
    const fetchDataSchedule = async (todayDate) => {
        todayDate = request.query.todayDate
        // const urlSchedule = `https://baseballapi.p.rapidapi.com/api/baseball/matches/${todayDate}`
        // const res = await fetch(urlSchedule, options)
        const urlSchedule = `https://allsportsapi2.p.rapidapi.com/api/baseball/matches/${todayDate}`
        const res = await fetch(urlSchedule, optionsAllSports)
        const dataSchedule = await res.json()
        response.json(dataSchedule)
    }
    fetchDataSchedule()
}

// FETCH LINEUPS BASEBALL
controller.lineups = (request, response) => {
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

// FETCH HIGHLIGHTS
controller.hightlights = (request, response) => {
    const fetchMatchHighlights = async (matchId) => {
        matchId = request.query.matchId
        const urlhighlight = `https://baseballapi.p.rapidapi.com/api/baseball/match/${matchId}/highlights`
        const resHighlights = await fetch(urlhighlight, options)
        // const resLive = await fetch('liveBaseballMatch.json')
        try {
            if (!resHighlights.ok) {
                throw new Error(`HTTP error: ${resHighlights.status}`)
            }
            const dataHightlights = await resHighlights.json()
            response.json(dataHightlights)
        } catch (error) {
            console.error(`Could not fetch data: ${error}`)
        }
    }
    fetchMatchHighlights()
}
module.exports = controller
