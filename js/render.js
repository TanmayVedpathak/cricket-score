function renderScore(team) {
    const element = document.querySelector(`[data-runs='${team || teamPlaying}']`);
    element.innerText = detailObj[team || teamPlaying]["score"];
}

function renderWicket(team) {
    const element = document.querySelector(`[data-wickets='${team || teamPlaying}']`);
    element.innerText = detailObj[team || teamPlaying]["wicket"];
}

function renderOver(team) {
    const element = document.querySelector(`[data-overs='${team || teamPlaying}']`);
    element.innerText = detailObj[team || teamPlaying]["over"];
}

function renderLastBall(overComplete, value) {
    const className = returnClass(value);
    if (overComplete) {
        setTimeout(() => {
            recentOver = [];
            localStorage.setItem("recentOver", recentOver);
            overWrapper.innerHTML = ""
        }, 1000)
    }

    overWrapper.innerHTML += `<div class="currentBall ${className}">${value}</div>`;
}

function insertInRecord(value) {
    const record = document.querySelector(`.record-${teamPlaying}`);
    const currentOver = Math.floor(detailObj[teamPlaying].over / 1);
    const className = returnClass(value);

    if (detailObj[teamPlaying].record.hasOwnProperty(currentOver)) {
        detailObj[teamPlaying].record[currentOver].push(value)
    } else {
        detailObj[teamPlaying].record[currentOver] = [...value];
    }

    if (!record.querySelector(`.currentRecord-${currentOver}`)) {
        record.innerHTML += `<div class="currentRecord currentRecord-${currentOver}"></div>`;
    }

    const currentRecord = document.querySelector(`.record-${teamPlaying} .currentRecord-${currentOver}`);

    currentRecord.innerHTML += `<div class="currentBall ${className}">${value}</div>`;
}

function renderRecords(obj, team) {
    if (Object.keys(obj).length !== 0) {
        const record = document.querySelector(`.record-${team}`);
        for (over in obj) {
            if (!record.querySelector(`.currentRecord-${over}`)) {
                record.innerHTML += `<div class="currentRecord currentRecord-${over}"></div>`;
            }
            const currentRecord = document.querySelector(`.record-${team} .currentRecord-${over}`);
            obj[over].forEach(run => {
                const className = returnClass(run);
                currentRecord.innerHTML += `<div class="currentBall ${className}">${run}</div>`;
            });
        }
    }
}