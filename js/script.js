const checkboxes = document.querySelectorAll(".checkbox");
const overWrapper = document.getElementById("over__wrapper");
const modalSection = document.getElementById("modal__section");
const modalText = document.getElementById("modal__text");
const targetText = document.getElementById("target__text");
const totalOver = 2;
const totalWicket = 10;
const checkboxValidation = {
    "0": ["1", "2", "3", "4", "5", "6", "N", "W", "WD"],
    "1": ["0"],
    "2": ["0"],
    "3": ["0"],
    "4": ["0"],
    "5": ["0"],
    "6": ["0"],
    "N": ["0", "W"],
    "W": ["0", "N"],
    "WD": ["0"],
}
var targetScore = 0;
var teamPlaying = "1";
var singleBallText = "";
var detailObj = {
    1: {
        score: 0,
        wicket: 0,
        over: 0.0,
        balls: 6 * totalOver,
        record: {},
    },
    2: {
        score: 0,
        wicket: 0,
        over: 0.0,
        balls: 6 * totalOver,
        record: {},
    }
};
var recentOver = [];

function bodyColorManipulation() {
    if (teamPlaying == 1) {
        document.querySelector("body").style.backgroundColor = "lightblue"
    } else if (teamPlaying == 2) {
        document.querySelector("body").style.backgroundColor = "lightyellow"
    } else {
        document.querySelector("body").style.backgroundColor = "white"
    }
}

function scoreManipulation(value) {
    if (value.includes("0")) {
        detailObj[teamPlaying]["score"] += 0;
    } else {
        let singleBallRun = 0;
        let runsArray = value.split("+");
        runsArray.forEach(run => {
            if (run === "W") {
                singleBallRun += 0;
            } else if (run === "WD" || run === "N") {
                singleBallRun += 1;
            } else {
                run = Number(run);
                singleBallRun += run;
            }
        });
        detailObj[teamPlaying]["score"] += singleBallRun;
    }
    renderScore();
}

function wicketManipulation(value) {
    if (/(\bW\b)/.test(value)) {
        detailObj[teamPlaying]["wicket"] += 1;
        renderWicket()
    }
}

function overManipulation(value) {
    if (!value.includes("WD") && !value.includes("N")) {
        detailObj[teamPlaying]["balls"] -= 1
        detailObj[teamPlaying]["over"] = Number((detailObj[teamPlaying]["over"] + 0.1).toFixed(1));
        if ((detailObj[teamPlaying]["over"] % 1).toFixed(1) == 0.6) {
            detailObj[teamPlaying]["over"] += 0.4
        }
    }
    renderOver();
}

function lastBallManipulation(value) {
    recentOver.push(value);
    localStorage.setItem("recentOver", JSON.stringify(recentOver));
    if (detailObj[teamPlaying]["over"] % 1 == 0 && detailObj[teamPlaying]["over"] !== 0) {
        renderLastBall(true, value)
    } else {
        renderLastBall(false, value)
    }
}

function checkboxManipulation() {
    checkboxes.forEach(checkbox => {
        {
            checkbox.checked = false;
        }
    })
}

function disableCheckbox(checkboxValue) {
    checkboxes.forEach(checkbox => {
        if (checkboxValidation[checkboxValue].includes(checkbox.getAttribute("id"))) {
            checkbox.disabled = true;
        }
    })
}

function enableCheckbox() {
    let validationArray = new Set();
    if (singleBallText) {
        singleBallText.split("+").forEach(singleRun => {
            if (singleRun) {
                checkboxValidation[singleRun].forEach(validValue => validationArray.add(validValue));
            }
        });
    }
    checkboxes.forEach(checkbox => {
        if ([...validationArray].length === 0) {
            checkbox.disabled = false;
        } else if (![...validationArray].includes(checkbox.getAttribute("id"))) {
            checkbox.disabled = false;
        }
    })
}

function returnClass(value) {
    let className = "";

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

    return className;
}

function emptyLocalStorage() {
    localStorage.removeItem("detailObj");
    localStorage.removeItem("teamPlaying");
    localStorage.removeItem("recentOver");
    localStorage.removeItem("targetScore");
}