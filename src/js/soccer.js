// import { showLineups } from './baseball'
const CONTAINER = document.querySelector('#container')
const NAV_SOCCER_LINK = document.querySelector('#nav-soccer')
// FETCH HEADER
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '3aefc1e7bamshd83a082017e807dp1102d7jsn7ea4642214b9',
        'X-RapidAPI-Host': 'allsportsapi2.p.rapidapi.com'
    }
}
const options2 = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '3aefc1e7bamshd83a082017e807dp1102d7jsn7ea4642214b9',
        'X-RapidAPI-Host': 'footapi7.p.rapidapi.com'
    }
}

// NAV MENU
NAV_SOCCER_LINK.addEventListener('click', () => {
    fetchDataLiveMatch()
})
window.addEventListener('load', () => {
    createMenu()
    document.querySelector('.box-score-reload').style.display = 'none'
})

// FETCH API
const fetchDataLiveMatch = async () => {
    try {
        const urlLiveScores = 'https://allsportsapi2.p.rapidapi.com/api/matches/live'
        const resLive = await fetch(urlLiveScores, options)
        // const resLive = await fetch('live-soccer-match.json')
        const dataLive = await resLive.json()
        console.log(dataLive)
        createMatches(dataLive)
    } catch (error) {
        const urlLiveScores = 'https://footapi7.p.rapidapi.com/api/matches/live'
        const resLive = await fetch(urlLiveScores, options2)
        // const resLive = await fetch('live-soccer-match.json')
        const dataLive = await resLive.json()
        console.log(dataLive)
        createMatches(dataLive)
    }
}
// FUNC CREATE MENU
const createMenu = () => {
    // MENU
    const navMenuContainer = document.createElement('nav')
    navMenuContainer.id = 'nav-menu'
    navMenuContainer.setAttribute('class', 'navbar navbar-expand-lg navbar-light d-flex justify-content-center')
    CONTAINER.appendChild(navMenuContainer)
    // LIVE
    const optionLiveMatch = document.createElement('span')
    optionLiveMatch.id = 'option-menu'
    optionLiveMatch.setAttribute('class', 'text-white material-icons')
    optionLiveMatch.textContent = 'live_tv'
    navMenuContainer.appendChild(optionLiveMatch)
    optionLiveMatch.addEventListener('click', () => { fetchDataLiveMatch() })
}

// LIVE SCORES
const createMatches = (resLive) => {
    CONTAINER.innerHTML = ''
    // MENU
    createMenu()
    if (resLive.events.length > 0) {
        // DIV CARDS CONTAINER
        const cardsContainer = document.createElement('div')
        cardsContainer.id = 'cards-container'
        cardsContainer.setAttribute('class', 'd-flex justify-content-center row')
        CONTAINER.appendChild(cardsContainer)
        for (let i = 0; i < resLive.events.length; i++) {
            const getTournamentCountry = resLive.events[i].tournament.category.name
            if (getTournamentCountry === 'Spain' || getTournamentCountry === 'England' ||
            getTournamentCountry === 'Germany' || getTournamentCountry === 'Italy' ||
            getTournamentCountry === 'France' || getTournamentCountry === 'Norway' || getTournamentCountry === 'Austria' ||
            getTournamentCountry === 'USA' || getTournamentCountry === 'Europe') {
                // DIV MATCH CARDS
                const elementCol = document.createElement('div')
                elementCol.id = 'match-card'
                elementCol.setAttribute('class', 'col p-2 shadow rounded text-start')
                cardsContainer.appendChild(elementCol)
                // CONTAINER NAME TOURNAMENT
                const containerNameTournament = document.createElement('div')
                containerNameTournament.setAttribute('class', '')
                elementCol.appendChild(containerNameTournament)
                // NAME TOURNAMENT
                const nameTournament = document.createElement('div')
                nameTournament.id = 'name-tournament'
                nameTournament.textContent = resLive.events[i].tournament.name
                containerNameTournament.appendChild(nameTournament)
                // COUNTRY TOURNAMENT
                const countryTournament = document.createElement('div')
                countryTournament.id = 'country-tournament'
                countryTournament.setAttribute('class', 'text-secondary')
                countryTournament.textContent = resLive.events[i].tournament.category.name
                containerNameTournament.appendChild(countryTournament)
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
        if (resLive.events.length < 1) {
            const elementNoMatches = document.createElement('h5')
            elementNoMatches.setAttribute('class', 'mt-3 text-center')
            elementNoMatches.textContent = 'No Matches Found'
            CONTAINER.appendChild(elementNoMatches)
        }
    }
}

const fetchLineups = async (matchId, awayTeamName, homeTeamName) => {
    try {
        const urlTeamLineup = 'https://baseballapi.p.rapidapi.com/api/baseball/match/' + matchId + '/lineups'
        const resLineup = await fetch(urlTeamLineup, options)
        // const resLineup = await fetch('lineupsBaseball.json')
        const dataLineup = await resLineup.json()
        console.log(dataLineup)
        showLineups(dataLineup, awayTeamName, homeTeamName)
    } catch (error) {
        // NO LINEUPS FOUND MESSAGE
        const noLineupsFound = document.createElement('h5')
        noLineupsFound.setAttribute('class', 'mt-3 text-center')
        noLineupsFound.textContent = 'No Lineups Found'
        CONTAINER.appendChild(noLineupsFound)
    }
}
// SHOW LINEUPS
const showLineups = (dataLineup, awayTeamName, homeTeamName) => {
    // MENU
    createMenu()
    console.log(dataLineup.home.players.length)
    const elementRow = document.createElement('div')
    elementRow.id =
    elementRow.setAttribute('class', 'd-flex justify-content-between')
    CONTAINER.appendChild(elementRow)
    // HOME ROW
    const elementRowHome = document.createElement('div')
    elementRowHome.id = 'lineup-match'
    elementRow.appendChild(elementRowHome)
    // HOME TEAM NAME
    const divHomeTeamName = document.createElement('div')
    divHomeTeamName.id = homeTeamName
    divHomeTeamName.setAttribute('class', 'fw-bold text-center')
    divHomeTeamName.textContent = homeTeamName
    elementRowHome.appendChild(divHomeTeamName)
    const formationHome = document.createElement('div')
    formationHome.setAttribute('class', 'text-center')
    formationHome.textContent = dataLineup.home.formation
    elementRowHome.appendChild(formationHome)
    // HOME LINEUP
    for (let i = 0; i < dataLineup.home.players.length; i++) {
        const elementDiv = document.createElement('div')
        elementDiv.textContent = (i + 1) + ' ' + dataLineup.home.players[i].player.shortName +
        ' (' + dataLineup.home.players[i].player.position + ')'
        elementRowHome.appendChild(elementDiv)
        if (i === 10) {
            const substituteSeparation = document.createElement('hr')
            elementRowHome.appendChild(substituteSeparation)
        }
        console.log(dataLineup.home.players[i].player.shortName)
    }
    // AWAY ROW
    const elementRowAway = document.createElement('div')
    elementRowAway.id = 'lineup-match'
    elementRowAway.setAttribute('class', 'tex')
    elementRow.appendChild(elementRowAway)
    // AWAY TEAM NAME
    const divAwayTeamName = document.createElement('div')
    divAwayTeamName.id = awayTeamName
    divAwayTeamName.setAttribute('class', 'fw-bold text-center')
    divAwayTeamName.textContent = awayTeamName
    elementRowAway.appendChild(divAwayTeamName)
    const formationAway = document.createElement('div')
    formationAway.setAttribute('class', 'text-center')
    formationAway.textContent = dataLineup.away.formation
    elementRowAway.appendChild(formationAway)
    // AWAY LINEUP
    for (let i = 0; i < dataLineup.away.players.length; i++) {
        const elementDiv2 = document.createElement('div')
        elementDiv2.textContent = (i + 1) + ' ' + dataLineup.away.players[i].player.shortName +
        ' (' + dataLineup.away.players[i].player.position + ')'
        elementDiv2.setAttribute('class', '')
        elementRowAway.appendChild(elementDiv2)
        console.log(dataLineup.home.players[i].player.shortName)
        if (i === 10) {
            const substituteSeparation = document.createElement('hr')
            elementRowAway.appendChild(substituteSeparation)
        }
    }
}
