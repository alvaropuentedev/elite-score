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
const optionsNews = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '3aefc1e7bamshd83a082017e807dp1102d7jsn7ea4642214b9',
        'X-RapidAPI-Host': 'allscores.p.rapidapi.com'
    }
}
NAV_BASEBALL_LINK.addEventListener('click', () => {
    CONTAINER.innerHTML = ''
    createMenu()
    document.querySelector('.box-score-reload').style.display = 'none'
})

// ONLOAD MENU
window.addEventListener('load', () => {
    createMenu()
    document.querySelector('.box-score-reload').style.display = 'none'
})
// GET TIME
const toDateTime = (secs) => {
    const t = new Date(1970, 0, 1)
    t.setSeconds(secs)
    let hours = t.getHours() + 2
    const minutes = String(t.getMinutes()).padStart(2, '0')
    const day = t.getDate()
    const month = t.getMonth() + 1
    hours = hours % 24
    return day + '/' + month + '  ' + hours + ':' + minutes
}
// FUNC CREATE MENU
const createMenu = (MATCH_ID, awayTeamName, homeTeamName) => {
    // ///////////////////////////////////MENU////////////////////////
    const navMenuContainer = document.createElement('nav')
    navMenuContainer.id = 'nav-menu'
    navMenuContainer.setAttribute('class', 'navbar navbar-expand-lg sticky-top navbar-light bg-dark rounded d-flex justify-content-evenly justify-content-center')
    CONTAINER.appendChild(navMenuContainer)
    // NEWS
    const optionLiveMatch = document.createElement('span')
    optionLiveMatch.id = 'option-menu'
    optionLiveMatch.setAttribute('class', 'text-white material-icons')
    optionLiveMatch.textContent = 'newspaper'
    navMenuContainer.appendChild(optionLiveMatch)
    optionLiveMatch.addEventListener('click', () => { fetchNews() })
    // SCHEDULE
    const optionSchedule = document.createElement('span')
    optionSchedule.id = 'option-menu'
    optionSchedule.setAttribute('class', 'option-schedule text-white material-icons')
    optionSchedule.textContent = 'calendar_month'
    navMenuContainer.appendChild(optionSchedule)
    optionSchedule.addEventListener('click', () => {
        const date = new Date()
        const day = date.getDate()
        const month = date.getMonth() + 1
        const year = date.getFullYear()

        const todayDate = `${day}/${month}/${year}`
        fetchDataSchedule(todayDate)
        console.log(todayDate)
    })
    // LINEUPS REFRESH
    const optionRefresh = document.createElement('span')
    optionRefresh.id = 'option-menu'
    optionRefresh.setAttribute('class', 'box-score-reload text-white material-icons')
    optionRefresh.textContent = 'refresh'
    navMenuContainer.appendChild(optionRefresh)
    optionRefresh.addEventListener('click', () => { fetchLineups(MATCH_ID, awayTeamName, homeTeamName) })
}

// FETCH NEWS
const fetchNews = async () => {
    const urlNews = 'https://allscores.p.rapidapi.com/api/allscores/news?sport=7&timezone=Europe%2FMadrid&langId=1'
    const res = await fetch(urlNews, optionsNews)
    // const resLive = await fetch('liveBaseballMatch.json')
    const dataNews = await res.json()
    getNews(dataNews)
    console.log(dataNews)
}

// LIVE SCORES
const getNews = (dataNews) => {
    console.log(dataNews)
    CONTAINER.innerHTML = ''
    // MENU
    createMenu()
    document.querySelector('.box-score-reload').style.display = 'none'
    const newsContainer = document.createElement('div')
    newsContainer.id = 'news-container'
    newsContainer.setAttribute('class', 'd-flex justify-content-evenly')
    CONTAINER.appendChild(newsContainer)
    for (let i = 0; i < dataNews.news.length; i++) {
        const newsDiv = document.createElement('div')
        newsDiv.id = 'news-div'
        newsDiv.setAttribute('class', 'card')
        newsDiv.setAttribute('style', 'width: 18rem;')
        newsContainer.appendChild(newsDiv)
        const imgNews = document.createElement('img')
        imgNews.id = 'img-news'
        imgNews.setAttribute('class', 'card-img-top')
        imgNews.src = dataNews.news[i].image
        newsDiv.appendChild(imgNews)
        const divBodyCardNews = document.createElement('div')
        divBodyCardNews.id = 'div-body-card-news'
        divBodyCardNews.setAttribute('class', 'card-body d-flex flex-column p-2')
        newsDiv.appendChild(divBodyCardNews)
        const publishDateNews = document.createElement('span')
        publishDateNews.id = 'publish-date-news'
        publishDateNews.textContent = dataNews.news[i].publishDate
        divBodyCardNews.appendChild(publishDateNews)
        const titleNews = document.createElement('a')
        titleNews.id = 'title-news'
        titleNews.setAttribute('class', 'card-title')
        titleNews.href = dataNews.news[i].url
        titleNews.textContent = dataNews.news[i].title
        divBodyCardNews.appendChild(titleNews)
    }
}
// FETCH LINEUPS
const fetchLineups = async (MATCH_ID, awayTeamName, homeTeamName) => {
    try {
        const urlTeamLineupBaseball = `https://baseballapi.p.rapidapi.com/api/baseball/match/${MATCH_ID}/lineups`
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
// /////////////////////////////////////// SHOW LINEUPS ////////////////////////////////////////////////////////////////
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
    divAwayTeamName.id = awayTeamName.toLowerCase()
    divAwayTeamName.setAttribute('class', 'away-team-name fw-bold text-center')
    divAwayTeamName.textContent = awayTeamName.toUpperCase()
    elementRowAway.appendChild(divAwayTeamName)
    // AWAY BATTERS BAR
    const battersAwaySeparator = document.createElement('div')
    battersAwaySeparator.id = 'batters-' + awayTeamName.toLowerCase()
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
    pitchersAwaySeparator.id = 'pitchers-' + awayTeamName.toLowerCase()
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
    divHomeTeamName.id = homeTeamName.toLowerCase()
    divHomeTeamName.setAttribute('class', 'home-team-name fw-bold text-center')
    divHomeTeamName.textContent = homeTeamName.toUpperCase()
    elementRowHome.appendChild(divHomeTeamName)
    // HOME BATTERS BAR
    const battersHomeSeparator = document.createElement('div')
    battersHomeSeparator.id = 'batters-' + homeTeamName.toLowerCase()
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
    pitcherHomeSeparator.id = 'pitchers-' + homeTeamName.toLowerCase()
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
// FETCH SCHEDULE
const fetchDataSchedule = async (todayDate) => {
    const urlLiveScores = `https://baseballapi.p.rapidapi.com/api/baseball/matches/${todayDate}`
    const res = await fetch(urlLiveScores, options)
    // const resLive = await fetch('liveBaseballMatch.json')
    const data = await res.json()
    getSchedule(data)
    console.log(data)
}
// ////////////////////////////////////////FUNC SCHEDULE//////////////////////////////////////////////
const getSchedule = (dataSchedule) => {
    CONTAINER.innerHTML = ''
    createMenu()
    document.querySelector('.box-score-reload').style.display = 'none'
    const cardsContainer = document.createElement('div')
    cardsContainer.id = 'cards-container'
    cardsContainer.setAttribute('class', 'd-flex justify-content-center row')
    CONTAINER.appendChild(cardsContainer)
    // //////////////////GAMES NOT STARTED////////////////////////////////////////////////
    for (let i = 0; i < dataSchedule.events.length; i++) {
        if (dataSchedule.events[i].tournament.name === 'MLB' &&
            dataSchedule.events[i].status.description !== 'Ended' && dataSchedule.events[i].status.description !== 'AET') {
            // DIV MATCH CARDS
            const matchCard = document.createElement('div')
            matchCard.id = 'match-card-schedule'
            matchCard.setAttribute('class', 'col shadow rounded text-start')
            cardsContainer.appendChild(matchCard)
            const divCard = document.createElement('div')
            divCard.id = 'div-card'
            divCard.setAttribute('class', ('p-3'))
            matchCard.appendChild(divCard)
            // DIV NAME TOURNAMENT
            const nameTournament = document.createElement('div')
            nameTournament.id = 'name-tournament-schedule'
            nameTournament.textContent = dataSchedule.events[i].tournament.name
            divCard.appendChild(nameTournament)
            // DIV AWAY TEAMS CONTAINER
            const teamsContainer = document.createElement('div')
            teamsContainer.id = 'teams-container'
            divCard.appendChild(teamsContainer)
            // TABLE TEAMS
            const tableTeams = document.createElement('table')
            tableTeams.setAttribute('class', 'table')
            teamsContainer.appendChild(tableTeams)
            // THEAD
            const tableHead = document.createElement('thead')
            tableTeams.appendChild(tableHead)
            const gameTime = toDateTime(dataSchedule.events[i].startTimestamp)
            const rowHead =
                `<tr>
            <th>${gameTime}</th>
            <th>${'R'}</th>  
            <th>${'H'}</th>  
            <th>${'E'}</th>  
            </tr>`
            tableHead.innerHTML += rowHead
            // TBODY
            const tableBody = document.createElement('tbody')
            tableTeams.appendChild(tableBody)
            const nameAway = dataSchedule.events[i].awayTeam.shortName
            let currentAwayScore = dataSchedule.events[i].awayScore.current
            let hitsAway
            let errorsAway
            const awayTeamName = dataSchedule.events[i].awayTeam.shortName
            const homeTeamName = dataSchedule.events[i].homeTeam.shortName
            try {
                hitsAway = dataSchedule.events[i].awayScore.inningsBaseball.hits
                errorsAway = dataSchedule.events[i].awayScore.inningsBaseball.errors
            } catch (error) {
                hitsAway = 0
                errorsAway = 0
            }
            currentAwayScore = currentAwayScore ?? 0
            const rowAwayBody =
                `<tr>
            <td id='${awayTeamName.toLowerCase()}'>${nameAway}</td>
            <td>${currentAwayScore}</td>
            <td>${hitsAway}</td>
            <td>${errorsAway}</td>
            </tr>`
            tableBody.innerHTML += rowAwayBody
            // HOME TEAM
            const nameHome = dataSchedule.events[i].homeTeam.shortName
            let currentHomeScore = dataSchedule.events[i].homeScore.current
            let hitsHome
            let errorsHome
            try {
                hitsHome = dataSchedule.events[i].homeScore.inningsBaseball.hits
                errorsHome = dataSchedule.events[i].homeScore.inningsBaseball.errors
            } catch (error) {
                hitsHome = 0
                errorsHome = 0
            }
            currentHomeScore = currentHomeScore ?? 0
            const rowHomeBody =
                `<tr>
            <td id='${homeTeamName.toLowerCase()}'>${nameHome}</td>
            <td>${currentHomeScore}</td>
            <td>${hitsHome}</td>
            <td>${errorsHome}</td>
            </tr>`
            tableBody.innerHTML += rowHomeBody
            const cardFoot = document.createElement('div')
            cardFoot.id = 'card-foot-schedule'
            cardFoot.setAttribute('class', 'text-end')
            cardFoot.textContent = dataSchedule.events[i].status.description
            divCard.appendChild(cardFoot)
            divCard.addEventListener('click', () => {
                MATCH_ID = dataSchedule.events[i].id
                const awayTeamName = dataSchedule.events[i].awayTeam.shortName
                const homeTeamName = dataSchedule.events[i].homeTeam.shortName
                fetchLineups(MATCH_ID, awayTeamName, homeTeamName)
            })
        }
    }
    // ///////////////////SHOW GAMES ENDED//////////////////
    for (let i = 0; i < dataSchedule.events.length; i++) {
        if (dataSchedule.events[i].tournament.name === 'MLB' &&
            dataSchedule.events[i].status.description !== 'Not started' &&
            dataSchedule.events[i].status.type !== 'inprogress') {
            // DIV MATCH CARDS
            const matchCard = document.createElement('div')
            matchCard.id = 'match-card-schedule'
            matchCard.setAttribute('class', 'col shadow rounded text-start')
            cardsContainer.appendChild(matchCard)
            const divCard = document.createElement('div')
            divCard.id = 'div-card'
            divCard.setAttribute('class', ('p-3'))
            matchCard.appendChild(divCard)
            // DIV NAME TOURNAMENT
            const nameTournament = document.createElement('div')
            nameTournament.id = 'name-tournament-schedule'
            nameTournament.textContent = dataSchedule.events[i].tournament.name
            divCard.appendChild(nameTournament)
            // DIV AWAY TEAMS CONTAINER
            const teamsContainer = document.createElement('div')
            teamsContainer.id = 'teams-container'
            divCard.appendChild(teamsContainer)
            // TABLE TEAMS
            const tableTeams = document.createElement('table')
            tableTeams.setAttribute('class', 'table')
            teamsContainer.appendChild(tableTeams)
            // THEAD
            const tableHead = document.createElement('thead')
            tableTeams.appendChild(tableHead)
            const gameTime = toDateTime(dataSchedule.events[i].startTimestamp)
            const rowHead =
                `<tr>
            <th>${gameTime}</th>
            <th>${'R'}</th>  
            <th>${'H'}</th>  
            <th>${'E'}</th>  
            </tr>`
            tableHead.innerHTML += rowHead
            // TBODY
            const tableBody = document.createElement('tbody')
            tableTeams.appendChild(tableBody)
            const nameAway = dataSchedule.events[i].awayTeam.shortName
            let currentAwayScore = dataSchedule.events[i].awayScore.current
            let hitsAway
            let errorsAway
            const awayTeamName = dataSchedule.events[i].awayTeam.shortName
            const homeTeamName = dataSchedule.events[i].homeTeam.shortName
            try {
                hitsAway = dataSchedule.events[i].awayScore.inningsBaseball.hits
                errorsAway = dataSchedule.events[i].awayScore.inningsBaseball.errors
            } catch (error) {
                hitsAway = 0
                errorsAway = 0
            }
            currentAwayScore = currentAwayScore ?? 0
            const rowAwayBody =
                `<tr>
            <td id='${awayTeamName.toLowerCase()}'>${nameAway}</td>
            <td>${currentAwayScore}</td>
            <td>${hitsAway}</td>
            <td>${errorsAway}</td>
            </tr>`
            tableBody.innerHTML += rowAwayBody
            // HOME TEAM
            const nameHome = dataSchedule.events[i].homeTeam.shortName
            let currentHomeScore = dataSchedule.events[i].homeScore.current
            let hitsHome
            let errorsHome
            try {
                hitsHome = dataSchedule.events[i].homeScore.inningsBaseball.hits
                errorsHome = dataSchedule.events[i].homeScore.inningsBaseball.errors
            } catch (error) {
                hitsHome = 0
                errorsHome = 0
            }
            currentHomeScore = currentHomeScore ?? 0
            const rowHomeBody =
                `<tr>
            <td id='${homeTeamName.toLowerCase()}'>${nameHome}</td>
            <td>${currentHomeScore}</td>
            <td>${hitsHome}</td>
            <td>${errorsHome}</td>
            </tr>`
            tableBody.innerHTML += rowHomeBody
            const cardFoot = document.createElement('div')
            cardFoot.id = 'card-foot-schedule'
            cardFoot.setAttribute('class', 'text-end')
            cardFoot.textContent = dataSchedule.events[i].status.description
            divCard.appendChild(cardFoot)
            divCard.addEventListener('click', () => {
                MATCH_ID = dataSchedule.events[i].id
                const awayTeamName = dataSchedule.events[i].awayTeam.shortName
                const homeTeamName = dataSchedule.events[i].homeTeam.shortName
                fetchLineups(MATCH_ID, awayTeamName, homeTeamName)
            })
        }
    }
}
