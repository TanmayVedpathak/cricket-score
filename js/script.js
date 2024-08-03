const checkboxes = document.querySelectorAll(".checkbox");
const overWrapper = document.getElementById("over__wrapper");
const modalSection = document.getElementById("modal__section");
const modalText = document.getElementById("modal__text");
const targetText = document.getElementById("target__text");
const totalOver = 4;
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
    },
    2: {
        score: 0,
        wicket: 0,
        over: 0.0,
        balls: 6 * totalOver,
    }
};

function bodyColorManipulation(team) {
    if (team == 1) {
        document.querySelector("body").style.backgroundColor = "lightblue"
    } else if (team == 2) {
        document.querySelector("body").style.backgroundColor = "lightyellow"
    } else {
        document.querySelector("body").style.backgroundColor = "white"
    }
}

function scoreManipulation(team, value) {
    if (value.includes("0")) {
        detailObj[team]["score"] += 0;
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
        detailObj[team]["score"] += singleBallRun;
    }
    renderScore(team, detailObj[team]["score"]);
}

function wicketManipulation(team, value) {
    if (/(\bW\b)/.test(value)) {
        detailObj[team]["wicket"] += 1;
        renderWicket(team, detailObj[team]["wicket"])
    }
}

function overManipulation(team, value) {
    if (!value.includes("WD") && !value.includes("N")) {
        detailObj[team]["balls"] -= 1
        detailObj[team]["over"] = Number((detailObj[team]["over"] + 0.1).toFixed(1));
        if ((detailObj[team]["over"] % 1).toFixed(1) == 0.6) {
            detailObj[team]["over"] += 0.4
        }
    }
    renderOver(team, detailObj[team]["over"]);
}

function lastBallManipulation(team, value) {
    if (detailObj[team]["over"] % 1 == 0 && detailObj[team]["over"] !== 0) {
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

// function enableCheckbox() {
//     let validationArray = [];
//     if(singleBallText) {
//         singleBallText.split("+").forEach(singleRun => {
//             validationArray.push(...checkboxValidation[singleRun])
//         })
//     }
//     console.log("validationArray", validationArray)
//     checkboxes.forEach(checkbox => {
//         if(!validationArray) {
//             checkbox.disabled = false;
//         } else if(validationArray.includes(checkbox.getAttribute("id"))) {
//             checkbox.disabled = false;
//         }
//     })
// }