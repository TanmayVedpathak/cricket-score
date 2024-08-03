function renderScore(team, score) {
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

function renderLastBall(overComplete, value) {
    let className = ""
    if (overComplete) {
        setTimeout(() => {
            overWrapper.innerHTML = ""
        }, 1000)
    }

    switch (value) {
        case "0":
            className = "dot";
            break;
        case "WD":
            className = "wide";
            break;
        case "W":
            className = "wicket";
            break;
        case "N":
            className = "no-ball";
            break;
        case "6":
            className = "six";
            break;
        case "4":
            className = "four";
            break;
        default:
            break;
    }

    overWrapper.innerHTML += `<div class="currentBall ${className}">${value}</div>`
}