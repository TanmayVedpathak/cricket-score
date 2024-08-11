function renderScore() {
    const element = document.querySelector(`[data-runs='${teamPlaying}']`);
    element.innerText = detailObj[teamPlaying]["score"];
}

function renderWicket() {
    const element = document.querySelector(`[data-wickets='${teamPlaying}']`);
    element.innerText = detailObj[teamPlaying]["wicket"];
}

function renderOver() {
    const element = document.querySelector(`[data-overs='${teamPlaying}']`);
    element.innerText = detailObj[teamPlaying]["over"];
}

function renderLastBall(overComplete, value) {
    const className = returnClass(value);
    if (overComplete) {
        setTimeout(() => {
            overWrapper.innerHTML = ""
        }, 1000)
    }

    overWrapper.innerHTML += `<div class="currentBall ${className}">${value}</div>`;
}

function insertInRecord(team, value) {
    const record = document.querySelector(`.record-${team}`);
    const currentOver = Math.floor(detailObj[team].over / 1);
    const className = returnClass(value);
    
    if(!record.querySelector(`.currentRecord-${currentOver}`)) {
        record.innerHTML += `<div class="currentRecord currentRecord-${currentOver}"></div>`;
    }

    const currentRecord = document.querySelector(`.record-${team} .currentRecord-${currentOver}`);

    currentRecord.innerHTML += `<div class="currentBall ${className}">${value}</div>`;
}