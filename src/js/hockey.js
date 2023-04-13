const container = document.querySelector('#container')
const navHockey = document.querySelector('#nav-hockey')
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '3aefc1e7bamshd83a082017e807dp1102d7jsn7ea4642214b9',
        'X-RapidAPI-Host': 'icehockeyapi.p.rapidapi.com'
    }
}

// NAV MENU
navHockey.addEventListener('click', () => {
    fetchData()
})

// FETCH API
const fetchData = async () => {
    /* const urlLiveScores = 'https://icehockeyapi.p.rapidapi.com/api/ice-hockey/matches/live'
    const resLive = await fetch(urlLiveScores, options) */
    const resLive = await fetch('liveHockeyGames.json')
    const dataLive = await resLive.json()
    console.log(dataLive)
    createMatches(dataLive)
}

// LIVE SCORES
const createMatches = (resLive) => {
    console.log(resLive.events.length)
    console.log(resLive)
    container.innerHTML = ''
    if (resLive.events.length > 0) {
        const elementRow = document.createElement('div')
        elementRow.id = 'baseball-match'
        elementRow.setAttribute('class', 'd-flex justify-content-between row')
        container.appendChild(elementRow)
        for (let i = 0; i < resLive.events.length; i++) {
            const elementCol = document.createElement('div')
            elementCol.id = 'baseball-match'
            elementCol.setAttribute('class', 'col p-2 shadow rounded')
            elementRow.appendChild(elementCol)
            // HOME TEAM
            const elementHome = document.createElement('p')
            elementHome.setAttribute('class', 'home-team')
            elementHome.id = resLive.events[i].homeTeam.shortName
            elementHome.textContent = resLive.events[i].homeTeam.shortName
            elementCol.appendChild(elementHome)
            // SCORE HOME
            const scoreHome = document.createElement('p')
            scoreHome.id = 'score-home'
            scoreHome.textContent = resLive.events[i].homeScore.current
            elementCol.appendChild(scoreHome)
            // AWAY TEAM
            const elementAway = document.createElement('p')
            elementAway.setAttribute('class', 'away-team')
            elementAway.id = resLive.events[i].awayTeam.shortName
            elementAway.textContent = resLive.events[i].awayTeam.shortName
            elementCol.appendChild(elementAway)
            // SCORE AWAY
            const scoreAway = document.createElement('p')
            scoreAway.id = 'score-away'
            scoreAway.textContent = resLive.events[i].awayScore.current
            elementCol.appendChild(scoreAway)
            const separator = document.createElement('hr')
            elementCol.appendChild(separator)
            // SHOW ACTUAL INNING
            const currentInning = document.createElement('p')
            currentInning.id = 'current-inning'
            currentInning.textContent = resLive.events[i].status.description
            elementCol.appendChild(currentInning)
            // BUTTON LINEUPS
            const lineupsBtn = document.createElement('button')
            lineupsBtn.id = 'boton-lineups'
            lineupsBtn.setAttribute('class', 'btn btn-primary')
            lineupsBtn.textContent = 'Lineups'
            elementCol.appendChild(lineupsBtn)
            lineupsBtn.addEventListener('click', () => {
                container.innerHTML = ''
                const showLineup = document.createElement('p')
                showLineup.id = 'show-lineup'
                const matchId = resLive.events[i].id
                console.log(matchId)
                fetchLineups(matchId)
            })
        }
    } else {
        const elementNoMatches = document.createElement('p')
        elementNoMatches.setAttribute('class', 'mt-3 text-center')
        elementNoMatches.textContent = 'No Matches Found'
        container.appendChild(elementNoMatches)
    }
}

const fetchLineups = async (matchId) => {
    const urlTeamLineup = 'https://baseballapi.p.rapidapi.com/api/hockey/match/' + matchId + '/lineups'
    const resLineup = await fetch(urlTeamLineup, options)
    const dataLineup = await resLineup.json()
    console.log(dataLineup)
}
