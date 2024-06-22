const overWrapper = document.getElementById("over__wrapper");
const totalOver = 4;
const totalWicket = 10;
var targetScore = 0;
var teamPlaying = "1"
var detailObj = {
    1: {
        score: 0,
        wicket: 0,
        over: 0.0
    },
    2: {
        score: 0,
        wicket: 0,
        over: 0.0
    }
};

function bodyColorManipulation(team) {
    if(team == 1) {
        document.querySelector("body").style.backgroundColor = "lightblue"
    } else if(team == 2) {
        document.querySelector("body").style.backgroundColor = "lightyellow"
    } else {
        document.querySelector("body").style.backgroundColor = "white"
    }
}

function scoreManipulation(team, value) {
    if (value === "0" || value === "W") {
        detailObj[team]["score"] += 0;
    } else if (value === "WD" || value === "N") {
        detailObj[team]["score"] += 1;
    } else {
        value = Number(value);
        detailObj[team]["score"] += value;
    }
    renderScore(team, detailObj[team]["score"]);
}

function wicketManipulation(team, value) {
    if (value === "W") {
        detailObj[team]["wicket"] += 1;
        renderWicket(1, detailObj[team]["wicket"])
    }
}

function overManipulation(team, value) {
    if (value !== "WD" && value !== "N") {
        detailObj[team]["over"] = Number((detailObj[team]["over"] + 0.1).toFixed(1));
        if ((detailObj[team]["over"] % 1).toFixed(1) == 0.6) {
            detailObj[team]["over"] += 0.4
        }
    }            
    if((detailObj[team]["over"] % 1).toFixed(1) == 0.1) {
        renderCurrentScore(true, value)
    } else {
        renderCurrentScore(false, value)
    }
    renderOver(team, detailObj[team]["over"]);
}

function winningCondition() {
    if (detailObj[2].score > detailObj[1].score ) {
        return true
    }
}