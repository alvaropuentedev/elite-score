const CONTAINER = document.querySelector('#container')
const NAV_SOCCER_LINK = document.querySelector('#nav-soccer')
// FETCH HEADER
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '3aefc1e7bamshd83a082017e807dp1102d7jsn7ea4642214b9',
        'X-RapidAPI-Host': 'footapi7.p.rapidapi.com'
    }
}

// NAV MENU
NAV_SOCCER_LINK.addEventListener('click', () => {
    fetchData()
})

// FETCH API
const fetchData = async () => {
    const urlLiveScores = 'https://footapi7.p.rapidapi.com/api/matches/live'
    const resLive = await fetch(urlLiveScores, options)
    // const resLive = await fetch('./liveBaseballMatch.json')
    const dataLive = await resLive.json()
    console.log(dataLive)
    createMatches(dataLive)
}

// LIVE SCORES
const createMatches = (resLive) => {
    CONTAINER.innerHTML = ''
    if (resLive.events.length > 0) {
        const elementRow = document.createElement('div')
        elementRow.id = 'cards-container'
        elementRow.setAttribute('class', 'd-flex justify-content-between row')
        CONTAINER.appendChild(elementRow)
        for (let i = 0; i < resLive.events.length; i++) {
            // DIV MATCH CARDS
            const elementCol = document.createElement('div')
            elementCol.id = 'match-card'
            elementCol.setAttribute('class', 'col p-2 shadow rounded')
            elementCol.textContent = resLive.events[i].tournament.name
            elementRow.appendChild(elementCol)
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
                fetchLineups(matchId)
            })
        }
    } else {
        const elementNoMatches = document.createElement('p')
        elementNoMatches.setAttribute('class', 'mt-3 text-center')
        elementNoMatches.textContent = 'No Matches Found'
        CONTAINER.appendChild(elementNoMatches)
    }
}

const fetchLineups = async (matchId) => {
    const urlTeamLineup = 'https://baseballapi.p.rapidapi.com/api/baseball/match/' + matchId + '/lineups'
    const resLineup = await fetch(urlTeamLineup, options)
    // const resLineup = await fetch('lineupsBaseball.json')
    const dataLineup = await resLineup.json()
    console.log(dataLineup)
    showLineups(dataLineup)
}

// SHOW LINEUPS
const showLineups = (dataLineup) => {
    console.log(dataLineup.home.players.length)
    const elementRow = document.createElement('div')
    elementRow.id =
    elementRow.setAttribute('class', 'd-flex justify-content-between')
    CONTAINER.appendChild(elementRow)
    console.log(dataLineup.home.players.length)
    const elementRowAway = document.createElement('div')
    elementRowAway.id = 'baseball-match'
    elementRowAway.setAttribute('class', '')
    elementRow.appendChild(elementRowAway)
    for (let i = 0; i < dataLineup.away.players.length; i++) {
        const elementDiv2 = document.createElement('div')
        elementDiv2.textContent = dataLineup.away.players[i].player.shortName + ' (' + dataLineup.away.players[i].player.position + ')'
        elementDiv2.setAttribute('class', '')
        elementRowAway.appendChild(elementDiv2)
        console.log(dataLineup.home.players[i].player.shortName)
    }
    const elementRowHome = document.createElement('div')
    elementRowHome.id = 'baseball-match'
    elementRowHome.setAttribute('class', '')
    elementRow.appendChild(elementRowHome)
    for (let i = 0; i < dataLineup.home.players.length; i++) {
        const elementDiv = document.createElement('div')
        elementDiv.setAttribute('class', '')
        elementDiv.textContent = dataLineup.home.players[i].player.shortName + ' (' + dataLineup.home.players[i].player.position + ')'
        elementRowHome.appendChild(elementDiv)
        console.log(dataLineup.home.players[i].player.shortName)
    }
}