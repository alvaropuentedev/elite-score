const CONTAINER = document.querySelector('#container')
const NAV_BASEBALL_LINK = document.querySelector('#nav-baseball')
// FETCH HEADER
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '3aefc1e7bamshd83a082017e807dp1102d7jsn7ea4642214b9',
        'X-RapidAPI-Host': 'baseballapi.p.rapidapi.com'
    }
}

// NAV MENU
NAV_BASEBALL_LINK.addEventListener('click', () => {
    fetchDataLiveMatch()
})

// FETCH LIVE MATCH
const fetchDataLiveMatch = async () => {
    const urlLiveScores = 'https://baseballapi.p.rapidapi.com/api/baseball/matches/live'
    const resLive = await fetch(urlLiveScores, options)
    // const resLive = await fetch('baseballprueba.json')
    const dataLive = await resLive.json()
    createMatches(dataLive)
    console.log(dataLive)
}

// LIVE SCORES
const createMatches = (resLive) => {
    CONTAINER.innerHTML = ''
    // MENU
    const navMenuContainer = document.createElement('nav')
    navMenuContainer.id = 'nav-menu'
    navMenuContainer.setAttribute('class', 'navbar navbar-expand-lg navbar-light bg-dark mt-5 rounded d-flex justify-content-center')
    CONTAINER.appendChild(navMenuContainer)
    const optionLiveMatch = document.createElement('span')
    optionLiveMatch.id = 'option-menu-live-match'
    optionLiveMatch.setAttribute('class', 'text-white pointer mt-2')
    optionLiveMatch.textContent = 'Live'
    navMenuContainer.appendChild(optionLiveMatch)
    optionLiveMatch.addEventListener('click', () => { fetchDataLiveMatch() })
    if (resLive.events.length > 0) {
        // DIV CARDS CONTAINER
        const cardsContainer = document.createElement('div')
        cardsContainer.id = 'cards-container'
        cardsContainer.setAttribute('class', 'd-flex justify-content-center row')
        CONTAINER.appendChild(cardsContainer)
        for (let i = 0; i < resLive.events.length; i++) {
            if (resLive.events[i].tournament.name === 'MLB') {
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
                // SEPARATOR
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
        }
    }
    if (resLive.events.length < 0) {
        const elementNoMatches = document.createElement('p')
        elementNoMatches.id = 'no-match-found'
        elementNoMatches.setAttribute('class', 'mt-3 text-center')
        elementNoMatches.textContent = 'No Matches Found'
        CONTAINER.appendChild(elementNoMatches)
    }
}
// FETCH LINEUPS
const fetchLineups = async (matchId, awayTeamName, homeTeamName) => {
    const urlTeamLineupBaseball = 'https://baseballapi.p.rapidapi.com/api/baseball/match/' + matchId + '/lineups'
    const resLineup = await fetch(urlTeamLineupBaseball, options)
    // const resLineup = await fetch('baseballPicherproblem.json')
    const dataLineup = await resLineup.json()
    showLineups(dataLineup, awayTeamName, homeTeamName)
    console.log(dataLineup)
}

// SHOW LINEUPS
export const showLineups = (dataLineup, awayTeamName, homeTeamName) => {
    // MENU
    const navMenuContainer = document.createElement('nav')
    navMenuContainer.id = 'nav-menu'
    navMenuContainer.setAttribute('class', 'navbar navbar-expand-lg navbar-light bg-dark mt-5 rounded d-flex justify-content-center')
    CONTAINER.appendChild(navMenuContainer)
    const optionLiveMatch = document.createElement('span')
    optionLiveMatch.id = 'option-menu-live-match'
    optionLiveMatch.setAttribute('class', 'text-white pointer mt-2')
    optionLiveMatch.textContent = 'Live'
    navMenuContainer.appendChild(optionLiveMatch)
    optionLiveMatch.addEventListener('click', () => { fetchDataLiveMatch() })
    // ROW
    const elementRow = document.createElement('div')
    elementRow.setAttribute('class', 'd-flex justify-content-between')
    CONTAINER.appendChild(elementRow)
    // ROW AWAY
    const elementRowAway = document.createElement('div')
    elementRowAway.id = 'lineup-match'
    elementRow.appendChild(elementRowAway)
    // AWAY TEAM NAME
    const divAwayTeamName = document.createElement('div')
    divAwayTeamName.id = awayTeamName
    divAwayTeamName.setAttribute('class', 'fw-bold text-center')
    divAwayTeamName.textContent = awayTeamName
    elementRowAway.appendChild(divAwayTeamName)
    // AWAY BATTERS BAR
    const battersAwaySeparator = document.createElement('nav')
    battersAwaySeparator.id = 'pitchers-' + awayTeamName
    battersAwaySeparator.setAttribute('class', 'text-center m-2')
    battersAwaySeparator.textContent = 'BATTERS'
    elementRowAway.appendChild(battersAwaySeparator)
    // AWAY LINEUP
    for (let i = 0; i < dataLineup.away.players.length; i++) {
        if (dataLineup.away.players[i].position !== 'P') {
            const players = document.createElement('div')
            players.textContent = (i + 1) + ' ' + dataLineup.away.players[i].player.shortName +
            ' (' + dataLineup.away.players[i].player.position + ')'
            elementRowAway.appendChild(players)
        }
    }
    // AWAY PITCHERS BAR
    const pitchersAwaySeparator = document.createElement('nav')
    pitchersAwaySeparator.id = 'pitchers-' + awayTeamName
    pitchersAwaySeparator.setAttribute('class', 'text-center m-2')
    pitchersAwaySeparator.textContent = 'PITCHERS'
    elementRowAway.appendChild(pitchersAwaySeparator)
    // AWAY PITCHERS
    for (let i = 0; i < dataLineup.away.players.length; i++) {
        if (dataLineup.away.players[i].position === 'P') {
            const homePitchers = document.createElement('div')
            homePitchers.textContent = (i + 1) + ' ' + dataLineup.away.players[i].player.shortName +
            ' (' + dataLineup.away.players[i].player.position + ')'
            elementRowAway.appendChild(homePitchers)
        }
    }
    // ROW HOME
    const elementRowHome = document.createElement('div')
    elementRowHome.id = 'lineup-match'
    elementRow.appendChild(elementRowHome)
    // HOME TEAM NAME
    const divHomeTeamName = document.createElement('div')
    divHomeTeamName.id = homeTeamName
    divHomeTeamName.setAttribute('class', 'fw-bold text-center')
    divHomeTeamName.textContent = homeTeamName
    elementRowHome.appendChild(divHomeTeamName)
    // Home BATTERS BAR
    const battersHomeSeparator = document.createElement('nav')
    battersHomeSeparator.id = 'pitchers-' + homeTeamName
    battersHomeSeparator.setAttribute('class', 'text-center m-2')
    battersHomeSeparator.textContent = 'BATTERS'
    elementRowHome.appendChild(battersHomeSeparator)
    // HOME LINEUP
    for (let i = 0; i < dataLineup.home.players.length; i++) {
        if (dataLineup.home.players[i].position !== 'P') {
            const elementDiv = document.createElement('div')
            elementDiv.textContent = (i + 1) + ' ' + dataLineup.home.players[i].player.shortName +
            ' (' + dataLineup.home.players[i].player.position + ')'
            elementRowHome.appendChild(elementDiv)
        }
    }
    // HOME SEPARATOR
    const pitcherHomeSeparator = document.createElement('nav')
    pitcherHomeSeparator.id = 'pitchers-' + homeTeamName
    pitcherHomeSeparator.setAttribute('class', 'text-center m-2')
    pitcherHomeSeparator.textContent = 'PITCHERS'
    elementRowHome.appendChild(pitcherHomeSeparator)
    // HOME PITCHERS
    for (let i = 0; i < dataLineup.home.players.length; i++) {
        if (dataLineup.home.players[i].position === 'P') {
            const homePitchers = document.createElement('div')
            homePitchers.textContent = (i + 1) + ' ' + dataLineup.home.players[i].player.shortName +
            ' (' + dataLineup.home.players[i].player.position + ')'
            elementRowHome.appendChild(homePitchers)
        }
    }
}
