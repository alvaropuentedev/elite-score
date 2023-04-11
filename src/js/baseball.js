const container = document.querySelector('#container')
const navBar = document.querySelector('#navBar')
const matchId = ''
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '3aefc1e7bamshd83a082017e807dp1102d7jsn7ea4642214b9',
        'X-RapidAPI-Host': 'baseballapi.p.rapidapi.com'
    }
}
// CREATE BUTTON ELEMENT
const btn = document.createElement('button')
btn.textContent = ('BASEBALL')
navBar.appendChild(btn)

// INITIALIZE BUTTON
btn.addEventListener('click', () => {
    fetchData()
})

// FETCH API
const fetchData = async () => {
    const urlLiveScores = 'https://baseballapi.p.rapidapi.com/api/baseball/matches/live'
    const resLive = await fetch(urlLiveScores, options)
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
        for (let i = 0; i < resLive.events.length; i++) {
            // HOME TEAM
            const elementHome = document.createElement('p')
            elementHome.setAttribute('class', 'home-team')
            elementHome.id = resLive.events[i].homeTeam.shortName
            elementHome.textContent = resLive.events[i].homeTeam.name
            container.appendChild(elementHome)
            // SCORE HOME
            const scoreHome = document.createElement('p')
            scoreHome.id = 'score-home'
            scoreHome.textContent = resLive.events[i].homeScore.current
            container.appendChild(scoreHome)
            // AWAY TEAM
            const elementAway = document.createElement('p')
            elementAway.setAttribute('class', 'away-team')
            elementAway.id = resLive.events[i].awayTeam.shortName
            elementAway.textContent = resLive.events[i].awayTeam.name
            container.appendChild(elementAway)
            // SCORE AWAY
            const scoreAway = document.createElement('p')
            scoreAway.id = 'score-away'
            scoreAway.textContent = resLive.events[i].awayScore.current
            container.appendChild(scoreAway)
            const separator = document.createElement('hr')
            container.appendChild(separator)
            // SHOW ACTUAL INNING
            const currentInning = document.createElement('p')
            currentInning.id = 'current-inning'
            currentInning.textContent = resLive.events[i].status.description
            container.appendChild(currentInning)
            // BUTTON LINEUPS
            // const lineupsBtn = document.createElement('button')
            // lineupsBtn.id = 'btn-lineups'
            // lineupsBtn.textContent = 'Lineups'
            // container.appendChild(lineupsBtn)
            // document.querySelector('#btn-lineups').addEventListener('click', () => {
            //     container.innerHTML = ''
            //     const showLineup = document.createElement('p')
            //     showLineup.id = 'show-lineup'
            //     const matchId = resLive.events[i].id
            //     console.log(matchId)
            //     fetchLineups(matchId)
            // })
        }
    } else {
        const elementNoMatches = document.createElement('p')
        elementNoMatches.setAttribute('class', 'no-matches')
        elementNoMatches.textContent = 'No Matches Found'
        container.appendChild(elementNoMatches)
    }
}

const fetchLineups = async (matchId) => {
    const urlTeamLineup = 'https://baseballapi.p.rapidapi.com/api/baseball/match/' + matchId + '/lineups'
    const resLineup = await fetch(urlTeamLineup, options)
    const dataLineup = await resLineup.json()
    console.log(dataLineup)
}
