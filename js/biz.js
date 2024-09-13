const button = document.querySelectorAll(".button");
const modalButton = document.querySelector(".modal__button");
const submitButton = document.getElementById("submitBtn");

checkboxes.forEach(element => {
    element.addEventListener("change", () => {
        var value = element.nextElementSibling.getAttribute("data-run");
        if (element.checked) {
            if (singleBallText === "") {
                singleBallText += value;
            } else {
                singleBallText += "+" + value;
            }
            disableCheckbox(value)
        } else {
            singleBallText = singleBallText.replace(value, "");
            singleBallText = singleBallText.replace("++", "+");
            singleBallText = singleBallText.replace(/^\+|\+$/g, '');
            enableCheckbox(value)
        }
    })
});

modalButton.addEventListener("click", function () {
    emptyLocalStorage();
    window.location.reload();
})

submitButton.addEventListener("click", function () {
    if (singleBallText == "") {
        return;
    }
    scoreManipulation(singleBallText);
    wicketManipulation(singleBallText);
    insertInRecord(singleBallText);
    overManipulation(singleBallText);
    lastBallManipulation(singleBallText);
    bodyColorManipulation();

    if (teamPlaying == 1) {
        if (detailObj["1"]["over"] === totalOver || detailObj["1"]["wicket"] === totalWicket) {
            teamPlaying = 2;
            targetScore = detailObj["1"]["score"] + 1;
            localStorage.setItem("targetScore", targetScore); s
            targetText.innerText = `Need ${targetScore - detailObj[2].score} runs in ${detailObj[2].balls} balls`;
        }
    } else if (teamPlaying == 2) {
        if (detailObj["2"]["score"] >= targetScore) {
            teamPlaying = 3
            modalSection.style.display = "flex";
            modalText.innerText = `Team 2 won by ${totalWicket - detailObj["2"]["wicket"]} wickets`;
        } else if (detailObj["2"]["over"] === totalOver || detailObj["2"]["wicket"] === totalWicket) {
            teamPlaying = 3
            if (detailObj["2"]["score"] < detailObj["1"]["score"]) {
                modalSection.style.display = "flex";
                modalText.innerText = `Team 1 won by ${targetScore - detailObj["2"]["score"] - 1} runs`;
            } else if (detailObj["2"]["score"] === detailObj["1"]["score"]) {
                modalSection.style.display = "flex";
                modalText.innerText = "Tie";
            }
        }
        targetText.innerText = `Need ${targetScore - detailObj[2].score} runs in ${detailObj[2].balls} balls`;
    }
    localStorage.setItem("detailObj", JSON.stringify(detailObj));
    localStorage.setItem("teamPlaying", teamPlaying);
    checkboxManipulation();
    singleBallText = "";
    enableCheckbox();
    if (teamPlaying == 3) {
        emptyLocalStorage();
    }
});

window.addEventListener("keypress", function (event) {
    if (event.key == 'Enter') {
        submitButton.dispatchEvent(new Event("click"));
    }
})

window.onload = function () {
    const obj = localStorage.getItem("detailObj");
    const currentTeamPlaying = localStorage.getItem("teamPlaying");
    const currentOver = localStorage.getItem("recentOver");
    const score = localStorage.getItem("targetScore");

    if (score) {
        targetScore = score;
    }

    if (currentTeamPlaying) {
        teamPlaying = currentTeamPlaying;
        bodyColorManipulation();
        if (teamPlaying == "2") {
            targetText.innerText = `Need ${targetScore - detailObj[2].score} runs in ${detailObj[2].balls} balls`;
        }
    }

    if (obj) {
        detailObj = JSON.parse(obj);
        for (team in detailObj) {
            for (key in detailObj[team]) {
                if (key == 'score') {
                    renderScore(team);
                }
                if (key == 'wicket') {
                    renderWicket(team);
                }
                if (key == 'over') {
                    renderOver(team);
                }
                if (key == 'record') {
                    renderRecords(detailObj[team][key], team);
                }
            }
        }
    }

    if (currentOver) {
        recentOver = JSON.parse(currentOver);
        recentOver.forEach(run => {
            renderLastBall(false, run)
        })
    }
};