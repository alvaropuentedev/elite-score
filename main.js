const container = document.querySelector('#container')
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '3aefc1e7bamshd83a082017e807dp1102d7jsn7ea4642214b9',
        'X-RapidAPI-Host': 'baseballapi.p.rapidapi.com'
    }
}

fetch('https://baseballapi.p.rapidapi.com/api/baseball/matches/live', options)
    .then(response => response.json())
    .then(response => createMatches(response))
    .catch(err => console.error(err))

const createMatches = (response) => {
    console.log(response.events.length)
    for (let i = 0; i < response.events.length; i++) {
        console.log(response[i])
        const elementHome = document.createElement('p')
        elementHome.id = response.events[i].homeTeam.name
        elementHome.textContent = response.events[i].homeTeam.name
        container.appendChild(elementHome)
        const scoreHome = document.createElement('p')
        scoreHome.id = 'score-home'
        scoreHome.textContent = response.events[i].homeScore.current
        container.appendChild(scoreHome)
        const elementAway = document.createElement('p')
        elementAway.id = response.events[i].awayTeam.name
        elementAway.textContent = response.events[i].awayTeam.name
        container.appendChild(elementAway)
        const scoreAway = document.createElement('p')
        scoreAway.id = 'score-away'
        scoreAway.textContent = response.events[i].awayScore.current
        container.appendChild(scoreAway)
        const separator = document.createElement('hr')
        container.appendChild(separator)
    }
}

// console.log(response.events[0].awayTeam.name))
