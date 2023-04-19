const CONTAINER = document.querySelector('#container')
const NAV_BASEBALL_LINK = document.querySelector('#nav-baseball')
let MATCH_ID
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
    toDateTime(1681848314)
})
function toDateTime (secs) {
    const t = new Date(1970, 0, 1)
    t.setSeconds(secs)
    console.log(t)
}
// FUNC CREATE MENU
const createMenu = (MATCH_ID, awayTeamName, homeTeamName) => {
    // MENU
    const navMenuContainer = document.createElement('nav')
    navMenuContainer.id = 'nav-menu'
    navMenuContainer.setAttribute('class', 'navbar navbar-expand-lg sticky-top navbar-light bg-dark rounded d-flex justify-content-center')
    CONTAINER.appendChild(navMenuContainer)
    const optionLiveMatch = document.createElement('span')
    optionLiveMatch.id = 'option-menu'
    optionLiveMatch.setAttribute('class', 'text-white pointer mt-2')
    optionLiveMatch.textContent = 'Live'
    navMenuContainer.appendChild(optionLiveMatch)
    optionLiveMatch.addEventListener('click', () => { fetchDataLiveMatch() })
    const optionNews = document.createElement('span')
    optionNews.id = 'option-menu'
    optionNews.setAttribute('class', 'box-score-reload text-white pointer mt-2 ms-3')
    optionNews.textContent = 'Reload'
    navMenuContainer.appendChild(optionNews)
    optionNews.addEventListener('click', () => { fetchLineups(MATCH_ID, awayTeamName, homeTeamName) })
}

// FETCH LIVE MATCH
const fetchDataLiveMatch = async () => {
    // const urlLiveScores = 'https://baseballapi.p.rapidapi.com/api/baseball/matches/live'
    // const resLive = await fetch(urlLiveScores, options)
    const resLive = await fetch('liveBaseballMatch.json')
    const dataLive = await resLive.json()
    createMatches(dataLive)
    console.log(dataLive)
}

// LIVE SCORES
const createMatches = (resLive) => {
    CONTAINER.innerHTML = ''
    // MENU
    createMenu()
    document.querySelector('.box-score-reload').innerHTML = ''
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
                    MATCH_ID = resLive.events[i].id
                    const awayTeamName = resLive.events[i].awayTeam.shortName
                    const homeTeamName = resLive.events[i].homeTeam.shortName
                    fetchLineups(MATCH_ID, awayTeamName, homeTeamName)
                })
            }
        }
    }
    if (resLive.events.length < 1 || resLive.events[0].tournament.name !== 'MLB') {
        const elementNoMatches = document.createElement('h5')
        elementNoMatches.id = 'no-match-found'
        elementNoMatches.setAttribute('class', 'mt-3 text-center')
        elementNoMatches.textContent = 'No Matches Found'
        CONTAINER.appendChild(elementNoMatches)
    }
}
// FETCH LINEUPS
const fetchLineups = async (MATCH_ID, awayTeamName, homeTeamName) => {
    try {
        const urlTeamLineupBaseball = 'https://baseballapi.p.rapidapi.com/api/baseball/match/' + MATCH_ID + '/lineups'
        const resLineup = await fetch(urlTeamLineupBaseball, options)
        // const resLineup = await fetch('lineupsBaseball.json')
        const dataLineup = await resLineup.json()
        showLineups(dataLineup, awayTeamName, homeTeamName)
        console.log(dataLineup)
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
    CONTAINER.innerHTML = ''
    // MENU
    createMenu(MATCH_ID, awayTeamName, homeTeamName)
    // ROW
    const elementRow = document.createElement('div')
    elementRow.id = 'box-score-container'
    CONTAINER.appendChild(elementRow)
    // ROW AWAY
    const elementRowAway = document.createElement('div')
    elementRowAway.id = 'lineup-match'
    elementRow.appendChild(elementRowAway)
    // AWAY TEAM NAME
    const divAwayTeamName = document.createElement('div')
    divAwayTeamName.id = awayTeamName
    divAwayTeamName.setAttribute('class', 'away-team-name fw-bold text-center')
    divAwayTeamName.textContent = awayTeamName
    elementRowAway.appendChild(divAwayTeamName)
    // AWAY BATTERS BAR
    const battersAwaySeparator = document.createElement('div')
    battersAwaySeparator.id = 'batters-' + awayTeamName
    battersAwaySeparator.setAttribute('class', 'text-center m-2')
    battersAwaySeparator.textContent = 'BATTERS'
    elementRowAway.appendChild(battersAwaySeparator)
    // TABLE AWAY
    const tableAway = document.createElement('table')
    tableAway.id = 'box-score-away-table'
    tableAway.setAttribute('class', 'table table-striped')
    elementRowAway.appendChild(tableAway)
    // THEAD AWAY
    const theadAway = document.createElement('thead')
    tableAway.appendChild(theadAway)
    const rowHeadAway =
    `<tr>
    <th>${'Player'}</th>
            <th>${'AB'}</th>
            <th>${'R'}</th>
            <th>${'H'}</th>
            <th>${'RBI'}</th>
            <th>${'BB'}</th>
            <th>${'K'}</th>
            <th>${'SB'}</th>
            <th>${'HR'}</th>
            </tr>`
    theadAway.innerHTML += rowHeadAway
    // TABLE BODY
    const tableBodyAway = document.createElement('tbody')
    tableAway.appendChild(tableBodyAway)
    // TABLE AWAY LINEUP
    for (let i = 0; i < dataLineup.away.players.length; i++) {
        if (dataLineup.away.players[i].position !== 'P') {
            let atBat = dataLineup.away.players[i].statistics.battingAtBats
            let runs = dataLineup.away.players[i].statistics.battingRuns
            let hits = dataLineup.away.players[i].statistics.battingHits
            let rbi = dataLineup.away.players[i].statistics.battingRbi
            let baseOnBalls = dataLineup.away.players[i].statistics.battingBaseOnBalls
            let strikeOuts = dataLineup.away.players[i].statistics.battingStrikeOuts
            let stolenBases = dataLineup.away.players[i].statistics.battingStolenBases
            let homeRuns = dataLineup.away.players[i].statistics.battingHomeRuns
            const myDefault = 0
            atBat = atBat ?? myDefault
            runs = runs ?? myDefault
            hits = hits ?? myDefault
            rbi = rbi ?? myDefault
            baseOnBalls = baseOnBalls ?? myDefault
            strikeOuts = strikeOuts ?? myDefault
            stolenBases = stolenBases ?? myDefault
            homeRuns = homeRuns ?? myDefault
            const rowCellaway =
            `<tr>
            <td>${dataLineup.away.players[i].player.shortName +
            ' (' + dataLineup.away.players[i].player.position + ')'}</td>
            <td>${atBat}</td>
            <td>${runs}</td>
            <td>${hits}</td>
            <td>${rbi}</td>
            <td>${baseOnBalls}</td>
            <td>${strikeOuts}</td>
            <td>${stolenBases}</td>
            <td>${homeRuns}</td>
            </tr>`
            tableBodyAway.innerHTML += rowCellaway
        }
    }
    // AWAY PITCHERS BAR
    const pitchersAwaySeparator = document.createElement('div')
    pitchersAwaySeparator.id = 'pitchers-' + awayTeamName
    pitchersAwaySeparator.setAttribute('class', 'text-center m-2')
    pitchersAwaySeparator.textContent = 'PITCHERS'
    elementRowAway.appendChild(pitchersAwaySeparator)
    // TABLE PITCHERS AWAY
    const tablePitchersAway = document.createElement('table')
    tablePitchersAway.id = 'box-score-away-pitchers-table'
    tablePitchersAway.setAttribute('class', 'table table-striped')
    elementRowAway.appendChild(tablePitchersAway)
    // THEAD PITCHERS AWAY
    const theadPitchersAway = document.createElement('thead')
    tablePitchersAway.appendChild(theadPitchersAway)
    const rowHeadPitchersAway =
    `<tr>
    <th>${'Player'}</th>
            <th>${'IP'}</th>
            <th>${'H'}</th>
            <th>${'R'}</th>
            <th>${'ER'}</th>
            <th>${'BB'}</th>
            <th>${'SO'}</th>
            <th>${'HR'}</th>
            </tr>`
    theadPitchersAway.innerHTML += rowHeadPitchersAway
    // TABLE PITCHERS BODY
    const tableBodyPitchersAway = document.createElement('tbody')
    tablePitchersAway.appendChild(tableBodyPitchersAway)
    // AWAY PITCHERS
    for (let i = 0; i < dataLineup.away.players.length; i++) {
        if (dataLineup.away.players[i].position === 'P') {
            const rowCellPitchersAway =
            `<tr>
            <td>${dataLineup.away.players[i].player.shortName}</td>
            <td>${dataLineup.away.players[i].statistics.pitchingInningsPitched}</td>
            <td>${dataLineup.away.players[i].statistics.pitchingHits}</td>
            <td>${dataLineup.away.players[i].statistics.pitchingRuns}</td>
            <td>${dataLineup.away.players[i].statistics.pitchingEarnedRuns}</td>
            <td>${dataLineup.away.players[i].statistics.pitchingBaseOnBalls}</td>
            <td>${dataLineup.away.players[i].statistics.pitchingStrikeOuts}</td>
            <td>${dataLineup.away.players[i].statistics.pitchingHomeRuns}</td>
            </tr>`
            tableBodyPitchersAway.innerHTML += rowCellPitchersAway
        }
    }
    // ROW HOME
    const elementRowHome = document.createElement('div')
    elementRowHome.id = 'lineup-match'
    elementRow.appendChild(elementRowHome)
    // HOME TEAM NAME
    const divHomeTeamName = document.createElement('div')
    divHomeTeamName.id = homeTeamName
    divHomeTeamName.setAttribute('class', 'home-team-name fw-bold text-center')
    divHomeTeamName.textContent = homeTeamName
    elementRowHome.appendChild(divHomeTeamName)
    // HOME BATTERS BAR
    const battersHomeSeparator = document.createElement('div')
    battersHomeSeparator.id = 'batters-' + homeTeamName
    battersHomeSeparator.setAttribute('class', 'text-center m-2')
    battersHomeSeparator.textContent = 'BATTERS'
    elementRowHome.appendChild(battersHomeSeparator)
    // TABLE HOME
    const tableHome = document.createElement('table')
    tableHome.id = 'box-score-home-table'
    tableHome.setAttribute('class', 'table table-striped')
    elementRowHome.appendChild(tableHome)
    // THEAD HOME
    const theadHome = document.createElement('thead')
    tableHome.appendChild(theadHome)
    const rowHeadHome =
    `<tr>
    <th>${'Player'}</th>
            <th>${'AB'}</th>
            <th>${'R'}</th>
            <th>${'H'}</th>
            <th>${'RBI'}</th>
            <th>${'BB'}</th>
            <th>${'K'}</th>
            <th>${'SB'}</th>
            <th>${'HR'}</th>
            </tr>`
    theadHome.innerHTML += rowHeadHome
    // TABLE BODY
    const tableBodyHome = document.createElement('tbody')
    tableHome.appendChild(tableBodyHome)
    // TABLE HOME LINEUP
    for (let i = 0; i < dataLineup.home.players.length; i++) {
        if (dataLineup.home.players[i].position !== 'P') {
            let atBat = dataLineup.home.players[i].statistics.battingAtBats
            let runs = dataLineup.home.players[i].statistics.battingRuns
            let hits = dataLineup.home.players[i].statistics.battingHits
            let rbi = dataLineup.home.players[i].statistics.battingRbi
            let baseOnBalls = dataLineup.home.players[i].statistics.battingBaseOnBalls
            let strikeOuts = dataLineup.home.players[i].statistics.battingStrikeOuts
            let stolenBases = dataLineup.home.players[i].statistics.battingStolenBases
            let homeRuns = dataLineup.home.players[i].statistics.battingHomeRuns
            const myDefault = 0
            atBat = atBat ?? myDefault
            runs = runs ?? myDefault
            hits = hits ?? myDefault
            rbi = rbi ?? myDefault
            baseOnBalls = baseOnBalls ?? myDefault
            strikeOuts = strikeOuts ?? myDefault
            stolenBases = stolenBases ?? myDefault
            homeRuns = homeRuns ?? myDefault
            const rowCellHome =
            `<tr>
            <td>${dataLineup.home.players[i].player.shortName +
            ' (' + dataLineup.home.players[i].player.position + ')'}</td>
            <td>${atBat}</td>
            <td>${runs}</td>
            <td>${hits}</td>
            <td>${rbi}</td>
            <td>${baseOnBalls}</td>
            <td>${strikeOuts}</td>
            <td>${stolenBases}</td>
            <td>${homeRuns}</td>
            </tr>`
            tableBodyHome.innerHTML += rowCellHome
        }
    }
    // HOME SEPARATOR
    const pitcherHomeSeparator = document.createElement('div')
    pitcherHomeSeparator.id = 'pitchers-' + homeTeamName
    pitcherHomeSeparator.setAttribute('class', 'text-center m-2')
    pitcherHomeSeparator.textContent = 'PITCHERS'
    elementRowHome.appendChild(pitcherHomeSeparator)
    // TABLE PITCHERS HOME
    const tablePitchersHome = document.createElement('table')
    tablePitchersHome.id = 'box-score-home-pitchers-table'
    tablePitchersHome.setAttribute('class', 'table table-striped')
    elementRowHome.appendChild(tablePitchersHome)
    // THEAD PITCHERS HOME
    const theadPitchersHome = document.createElement('thead')
    tablePitchersHome.appendChild(theadPitchersHome)
    const rowHeadPitchersHome =
    `<tr>
    <th>${'Player'}</th>
            <th>${'IP'}</th>
            <th>${'H'}</th>
            <th>${'R'}</th>
            <th>${'ER'}</th>
            <th>${'BB'}</th>
            <th>${'SO'}</th>
            <th>${'HR'}</th>
            </tr>`
    theadPitchersHome.innerHTML += rowHeadPitchersHome
    // TABLE PITCHERS BODY
    const tableBodyPitchersHome = document.createElement('tbody')
    tablePitchersHome.appendChild(tableBodyPitchersHome)
    // HOME PITCHERS
    for (let i = 0; i < dataLineup.home.players.length; i++) {
        if (dataLineup.home.players[i].position === 'P') {
            const rowCellPitchersHome =
            `<tr>
            <td>${dataLineup.home.players[i].player.shortName}</td>
            <td>${dataLineup.home.players[i].statistics.pitchingInningsPitched}</td>
            <td>${dataLineup.home.players[i].statistics.pitchingHits}</td>
            <td>${dataLineup.home.players[i].statistics.pitchingRuns}</td>
            <td>${dataLineup.home.players[i].statistics.pitchingEarnedRuns}</td>
            <td>${dataLineup.home.players[i].statistics.pitchingBaseOnBalls}</td>
            <td>${dataLineup.home.players[i].statistics.pitchingStrikeOuts}</td>
            <td>${dataLineup.home.players[i].statistics.pitchingHomeRuns}</td>
            </tr>`
            tableBodyPitchersHome.innerHTML += rowCellPitchersHome
        }
    }
}
