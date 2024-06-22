function renderScore(team,score) {
    const element = document.querySelector(`[data-runs='${team}']`);
    element.innerText = score;
}

function renderWicket(team, wicket) {
    const element = document.querySelector(`[data-wickets='${team}']`);
    element.innerText = wicket;
}

function renderOver(team, over) {
    const element = document.querySelector(`[data-overs='${team}']`);
    element.innerText = over;
}

function renderCurrentScore(overComplete, value) {
    if (overComplete) {
        overWrapper.innerHTML = ""
    }
    overWrapper.innerHTML += `<div class="currentBall">${value}</div>`
}