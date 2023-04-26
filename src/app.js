const express = require('express')
const path = require('path')
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(cors())
const API_KEY = process.env.API_KEY

app.use('/css', express.static(path.join(__dirname, 'css')))
app.use('/scss', express.static(path.join(__dirname, 'scss')))
app.use('/js', express.static(path.join(__dirname, 'js')))
app.use('/assets', express.static(path.join(__dirname, 'assets')))

// let TODAY_DATE
// const getTodayDate = () => {
//     const date = new Date()
//     const day = date.getDate()
//     const month = date.getMonth() + 1
//     const year = date.getFullYear()

//     TODAY_DATE = `${day}/${month}/${year}`
//     return TODAY_DATE
// }
// FETCH HEADER
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': 'baseballapi.p.rapidapi.com'
    }
}
// FETCH NEWS
app.get('/news', (request, response) => {
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
})
// FETCH SCHEDULE BASEBALL
app.get('/schedule', (request, response) => {
    // FETCH SCHEDULE
    const fetchDataSchedule = async (todayDate) => {
        todayDate = request.query.todayDate
        const urlSchedule = `https://baseballapi.p.rapidapi.com/api/baseball/matches/${todayDate}`
        const res = await fetch(urlSchedule, options)
        const dataSchedule = await res.json()
        response.json(dataSchedule)
    }
    fetchDataSchedule()
})
// FETCH SCHEDULE BASEBALL
app.get('/lineups', (request, response) => {
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
})
app.get('/', (request, response) => {
    response.sendFile(path.resolve(__dirname, 'index.html'))
})
app.get('/baseball', (request, response) => {
    response.sendFile(path.resolve(__dirname, 'baseball.html'))
})
app.get('/hockey', (request, response) => {
    response.sendFile(path.resolve(__dirname, 'hockey.html'))
})
app.get('/soccer', (request, response) => {
    response.sendFile(path.resolve(__dirname, 'soccer.html'))
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
