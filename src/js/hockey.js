import { showLineups } from './baseball.js'
const CONTAINER = document.querySelector('#container')
const navHockey = document.querySelector('#nav-hockey')
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '3aefc1e7bamshd83a082017e807dp1102d7jsn7ea4642214b9',
        'X-RapidAPI-Host': 'icehockeyapi.p.rapidapi.com'
    }
}
const options2 = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '3aefc1e7bamshd83a082017e807dp1102d7jsn7ea4642214b9',
        'X-RapidAPI-Host': 'allsportsapi2.p.rapidapi.com'
    }
}

// NAV MENU
navHockey.addEventListener('click', () => {
    fetchDataLiveMatch()
})

// FETCH API
const fetchDataLiveMatch = async () => {
    try {
        const urlLiveScores = 'https://icehockeyapi.p.rapidapi.com/api/ice-hockey/matches/live'
        const resLive = await fetch(urlLiveScores, options)
        // const resLive = await fetch('liveHockeyGames.json')
        const dataLive = await resLive.json()
        console.log(dataLive)
        createMatches(dataLive)
    } catch (error) {
        const urlLiveScores = 'https://allsportsapi2.p.rapidapi.com/api/ice-hockey/matches/live'
        const resLive = await fetch(urlLiveScores, options2)
        // const resLive = await fetch('liveHockeyGames.json')
        const dataLive = await resLive.json()
        console.log(dataLive)
        createMatches(dataLive)
    }
}

const createMatches = (resLive) => {
    CONTAINER.innerHTML = ''
    if (resLive.events.length > 0) {
        // DIV CARDS CONTAINER
        const cardsContainer = document.createElement('div')
        cardsContainer.id = 'cards-container'
        cardsContainer.setAttribute('class', 'd-flex justify-content-center row')
        CONTAINER.appendChild(cardsContainer)
        for (let i = 0; i < resLive.events.length; i++) {
            // DIV MATCH CARDS
            const elementCol = document.createElement('div')
            elementCol.id = 'match-card'
            elementCol.setAttribute('class', 'col p-2 shadow rounded text-start')
            cardsContainer.appendChild(elementCol)
            // DIV NAME TOURNAMENT
            const nameTournament = document.createElement('div')
            nameTournament.id = 'name-tournament'
            nameTournament.textContent = resLive.events[i].tournament.name
            elementCol.appendChild(nameTournament)
            // DIV AWAY
            const divAway = document.createElement('div')
            divAway.id = 'div-away'
            divAway.setAttribute('class', 'd-flex justify-content-between')
            elementCol.appendChild(divAway)
            // AWAY TEAM
            const elementAway = document.createElement('div')
            elementAway.setAttribute('class', 'away-team')
            elementAway.id = resLive.events[i].awayTeam.shortName
            elementAway.textContent = resLive.events[i].awayTeam.shortName
            divAway.appendChild(elementAway)
            // SCORE AWAY
            const scoreAway = document.createElement('div')
            scoreAway.id = 'score-away'
            scoreAway.textContent = resLive.events[i].awayScore.current
            divAway.appendChild(scoreAway)
            // DIV HOME
            const divHome = document.createElement('div')
            divHome.id = 'div-home'
            divHome.setAttribute('class', 'd-flex justify-content-between')
            elementCol.appendChild(divHome)
            // HOME TEAM
            const elementHome = document.createElement('div')
            elementHome.setAttribute('class', 'home-team')
            elementHome.id = resLive.events[i].homeTeam.shortName
            elementHome.textContent = resLive.events[i].homeTeam.shortName
            divHome.appendChild(elementHome)
            // SCORE HOME
            const scoreHome = document.createElement('div')
            scoreHome.id = 'score-home'
            scoreHome.textContent = resLive.events[i].homeScore.current
            divHome.appendChild(scoreHome)
            const separator = document.createElement('hr')
            elementCol.appendChild(separator)
            // SHOW ACTUAL INNING
            const currentInning = document.createElement('div')
            currentInning.id = 'current-inning'
            currentInning.textContent = resLive.events[i].status.description
            elementCol.appendChild(currentInning)
            // ON CLICK SHOW LINEUPS
            elementCol.addEventListener('click', () => {
                CONTAINER.innerHTML = ''
                const matchId = resLive.events[i].id
                const awayTeamName = resLive.events[i].awayTeam.shortName
                const homeTeamName = resLive.events[i].homeTeam.shortName
                fetchLineups(matchId, awayTeamName, homeTeamName)
            })
        }
    } else {
        const elementNoMatches = document.createElement('p')
        elementNoMatches.setAttribute('class', 'mt-3 text-center')
        elementNoMatches.textContent = 'No Matches Found'
        CONTAINER.appendChild(elementNoMatches)
    }
}

const fetchLineups = async (matchId, awayTeamName, homeTeamName) => {
    const urlTeamLineup = 'https://icehockeyapi.p.rapidapi.com/api/ice-hockey/match/' + matchId + '/lineups'
    const resLineup = await fetch(urlTeamLineup, options)
    const dataLineup = await resLineup.json()
    showLineups(dataLineup, awayTeamName, homeTeamName)
    console.log(dataLineup)
}
