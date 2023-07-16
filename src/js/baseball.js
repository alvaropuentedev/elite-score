const CONTAINER = document.querySelector('#container')
const MENU_LIST = document.querySelector('#option-menu')
let MATCH_ID, TODAY_DATE, HOME_TEAM_NAME, AWAY_TEAM_NAME

// ONLOAD WINDOW
window.addEventListener('load', () => {
    fetchDataSchedule(getTodayDate())
})

// GET TODAY DAY
const getTodayDate = () => {
    const date = new Date()
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()

    TODAY_DATE = `${day}/${month}/${year}`
    return TODAY_DATE
}

// GET TIME
const toDateTime = (secs) => {
    const t = new Date(1970, 0, 1)
    t.setSeconds(secs)
    let hours = t.getHours() + 2
    const minutes = String(t.getMinutes()).padStart(2, '0')
    let day = t.getDate()
    const month = t.getMonth() + 1
    hours = hours % 24
    if (hours === 0 || hours === 1) {
        day = day + 1
    }
    return day + '/' + month + '  ' + hours + ':' + minutes
}

// OPTION MENU
const NEWS = document.querySelector('#container-menu-news')
const SCHEDULE = document.querySelector('#container-menu-schedule')
const HIGHLIGHTS = document.querySelector('#container-menu-highlights')
const REFRESH = document.querySelector('#container-menu-refresh')
const HOME = document.querySelector('#container-menu-home')

NEWS.addEventListener('click', () => {
    fetchNews()
})
SCHEDULE.addEventListener('click', () => {
    fetchDataSchedule(getTodayDate())
})
HIGHLIGHTS.addEventListener('click', () => { fetchMatchHighlights(MATCH_ID) })
REFRESH.addEventListener('click', () => { fetchLineups(MATCH_ID, AWAY_TEAM_NAME, HOME_TEAM_NAME) })
HOME.addEventListener('click', () => { window.location = '/' })
// UNDERLINE SELECTED MENU OPTION
const menuItems = document.querySelectorAll('#option-menu li')
menuItems.forEach(item => {
    item.addEventListener('click', function () {
        menuItems.forEach(item => {
            item.classList.remove('active')
        })
        this.classList.add('active')
    })
})

// FETCH NEWS
const fetchNews = async () => {
    const urlNews = 'https://elite-score-alvaropuentedev.vercel.app/news'
    const res = await fetch(urlNews)
    // const res = await fetch('../assets/news.json')
    const dataNews = await res.json()
    getNews(dataNews)
}

// FUNC GET NEWS
const getNews = (dataNews) => {
    CONTAINER.innerHTML = ''
    // MENU
    MENU_LIST.style.display = 'block'
    document.querySelector('#container-menu-highlights').style.display = 'none'
    document.querySelector('#container-menu-refresh').style.display = 'none'
    const newsContainer = document.createElement('div')
    newsContainer.id = 'news-container'
    newsContainer.setAttribute('class', 'd-flex justify-content-evenly')
    CONTAINER.appendChild(newsContainer)
    for (let i = 0; i < dataNews.news.length; i++) {
        const newsDiv = document.createElement('article')
        newsDiv.id = 'news-div'
        newsDiv.setAttribute('class', 'card')
        newsDiv.setAttribute('style', 'width: 18rem; height: 20rem;')
        newsContainer.appendChild(newsDiv)
        const imgNews = document.createElement('img')
        imgNews.id = 'img-news'
        imgNews.setAttribute('class', 'card-img-top')
        imgNews.setAttribute('style', 'height: 10rem')
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
const fetchLineups = async (MATCH_ID, AWAY_TEAM_NAME, HOME_TEAM_NAME) => {
    try {
        const urlTeamLineupBaseball = `https://elite-score-alvaropuentedev.vercel.app/lineups?matchId=${MATCH_ID}`
        const resLineup = await fetch(urlTeamLineupBaseball)
        // const resLineup = await fetch('lineupsBaseball.json')
        const dataLineup = await resLineup.json()
        showLineups(dataLineup, AWAY_TEAM_NAME, HOME_TEAM_NAME)
    } catch (error) {
        // NO LINEUPS FOUND MESSAGE
        const noLineupsFound = document.createElement('h5')
        noLineupsFound.setAttribute('class', 'mt-3 text-center')
        noLineupsFound.textContent = 'No Lineups Found'
        CONTAINER.appendChild(noLineupsFound)
    }
}
// /////////////////////////////////////// SHOW LINEUPS ////////////////////////////////////////////////////////////////
const showLineups = (dataLineup, AWAY_TEAM_NAME, HOME_TEAM_NAME) => {
    CONTAINER.innerHTML = ''
    // MENU
    MENU_LIST.style.display = 'block'
    document.querySelector('#container-menu-highlights').style.display = 'block'
    document.querySelector('#container-menu-refresh').style.display = 'block'
    window.scrollTo()
    // ROW
    const elementRow = document.createElement('div')
    elementRow.id = 'lineups-container'
    CONTAINER.appendChild(elementRow)
    // ROW AWAY
    const elementRowAway = document.createElement('div')
    elementRowAway.id = 'lineup-match'
    elementRow.appendChild(elementRowAway)
    // AWAY TEAM NAME
    const divAwayTeamName = document.createElement('div')
    divAwayTeamName.id = AWAY_TEAM_NAME.toLowerCase()
    divAwayTeamName.setAttribute('class', 'away-team-name fw-bold text-center')
    divAwayTeamName.textContent = AWAY_TEAM_NAME.toUpperCase()
    elementRowAway.appendChild(divAwayTeamName)
    // AWAY BATTERS BAR
    const battersAwaySeparator = document.createElement('div')
    battersAwaySeparator.id = 'batters-' + AWAY_TEAM_NAME.toLowerCase()
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
    pitchersAwaySeparator.id = 'pitchers-' + AWAY_TEAM_NAME.toLowerCase()
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
    divHomeTeamName.id = HOME_TEAM_NAME.toLowerCase()
    divHomeTeamName.setAttribute('class', 'home-team-name fw-bold text-center')
    divHomeTeamName.textContent = HOME_TEAM_NAME.toUpperCase()
    elementRowHome.appendChild(divHomeTeamName)
    // HOME BATTERS BAR
    const battersHomeSeparator = document.createElement('div')
    battersHomeSeparator.id = 'batters-' + HOME_TEAM_NAME.toLowerCase()
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
    pitcherHomeSeparator.id = 'pitchers-' + HOME_TEAM_NAME.toLowerCase()
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
    const loading = document.createElement('div')
    loading.setAttribute('class', 'spinner-border')
    loading.setAttribute('role', 'status')
    CONTAINER.appendChild(loading)
    const urlSchedule = `https://elite-score-alvaropuentedev.vercel.app/schedule?todayDate=${todayDate}`
    const res = await fetch(urlSchedule)
    const data = await res.json()
    getSchedule(data)
}

// FETCH HIGHLIGHTS
const fetchMatchHighlights = async (matchId) => {
    const urlhighlight = `https://elite-score-alvaropuentedev.vercel.app/highlights?matchId=${matchId}`
    const res = await fetch(urlhighlight)
    // const resLive = await fetch('liveBaseballMatch.json')
    const data = await res.json()
    getHighlihts(data)
}
// ////////////////////////////////////////FUNC SCHEDULE//////////////////////////////////////////////
const getSchedule = (dataSchedule) => {
    CONTAINER.innerHTML = ''
    // MENU
    MENU_LIST.style.display = 'block'
    document.querySelector('#container-menu-schedule').setAttribute('class', 'active')
    document.querySelector('#container-menu-refresh').style.display = 'none'
    document.querySelector('#container-menu-highlights').style.display = 'none'
    const cardsContainer = document.createElement('div')
    cardsContainer.id = 'cards-container'
    cardsContainer.setAttribute('class', 'd-flex justify-content-center row')
    CONTAINER.appendChild(cardsContainer)
    // //////////////////GAMES NOT STARTED////////////////////////////////////////////////
    for (let i = 0; i < dataSchedule.events.length; i++) {
        if (dataSchedule.events[i].tournament.name === 'MLB' &&
            dataSchedule.events[i].status.description !== 'Ended' &&
            dataSchedule.events[i].status.description !== 'AET' &&
            dataSchedule.events[i].status.description !== 'Postponed') {
            // DIV MATCH CARDS
            const matchCard = document.createElement('card')
            matchCard.id = 'match-card-schedule'
            matchCard.setAttribute('class', 'col rounded text-start')
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
            AWAY_TEAM_NAME = dataSchedule.events[i].awayTeam.shortName
            HOME_TEAM_NAME = dataSchedule.events[i].homeTeam.shortName
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
            <td id='${AWAY_TEAM_NAME.toLowerCase()}'>${nameAway}</td>
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
            <td id='${HOME_TEAM_NAME.toLowerCase()}'>${nameHome}</td>
            <td>${currentHomeScore}</td>
            <td>${hitsHome}</td>
            <td>${errorsHome}</td>
            </tr>`
            tableBody.innerHTML += rowHomeBody
            const cardFoot = document.createElement('div')
            cardFoot.id = 'card-foot-schedule'
            cardFoot.setAttribute('class', 'text-end text-secondary')
            cardFoot.textContent = dataSchedule.events[i].status.description
            divCard.appendChild(cardFoot)
            divCard.addEventListener('click', () => {
                MATCH_ID = dataSchedule.events[i].id
                AWAY_TEAM_NAME = dataSchedule.events[i].awayTeam.shortName
                HOME_TEAM_NAME = dataSchedule.events[i].homeTeam.shortName
                fetchLineups(MATCH_ID, AWAY_TEAM_NAME, HOME_TEAM_NAME)
            })
        }
    }

    // ////// TITLE GAMES ENDED ///////
    const gamesEndedTitle = document.createElement('h2')
    gamesEndedTitle.id = 'games-ended-title'
    gamesEndedTitle.setAttribute('class', 'text-center')
    gamesEndedTitle.textContent = 'GAMES ENDED'
    cardsContainer.appendChild(gamesEndedTitle)

    // ///////////////////SHOW GAMES ENDED//////////////////
    for (let i = 0; i < dataSchedule.events.length; i++) {
        if (dataSchedule.events[i].tournament.name === 'MLB' &&
            dataSchedule.events[i].status.description !== 'Not started' &&
            dataSchedule.events[i].status.type !== 'inprogress') {
            // DIV MATCH CARDS
            const matchCard = document.createElement('card')
            matchCard.id = 'match-card-schedule'
            matchCard.setAttribute('class', 'col rounded text-start')
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
// GET HIGHLIGHTS
const getHighlihts = (dataHighlights) => {
    CONTAINER.innerHTML = ''
    // MENU
    MENU_LIST.style.display = 'block'
    document.querySelector('#container-menu-highlights').style.display = 'none'
    document.querySelector('#container-menu-refresh').style.display = 'none'
    const highlightContainer = document.createElement('div')
    highlightContainer.id = 'highlights-container'
    highlightContainer.setAttribute('class', 'd-flex')
    CONTAINER.appendChild(highlightContainer)
    const divHighlights = document.createElement('div')
    divHighlights.id = 'div-highlights'
    divHighlights.setAttribute('style', 'width: 50%;')
    divHighlights.setAttribute('class', '')
    highlightContainer.appendChild(divHighlights)
    const divBodyHighlights = document.createElement('div')
    divBodyHighlights.setAttribute('class', '')
    divHighlights.appendChild(divBodyHighlights)
    const titleHighlights = document.createElement('a')
    titleHighlights.id = 'title-highlights'
    titleHighlights.setAttribute('class', '')
    titleHighlights.href = dataHighlights.highlights[0].url
    divBodyHighlights.appendChild(titleHighlights)
    const imgHightlights = document.createElement('img')
    imgHightlights.id = 'card-img-hightlights'
    imgHightlights.setAttribute('class', 'card-img-top')
    imgHightlights.setAttribute('style', 'border-radius: 12px;')
    imgHightlights.src = dataHighlights.highlights[0].thumbnailUrl
    titleHighlights.appendChild(imgHightlights)
}
