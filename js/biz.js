const button = document.querySelectorAll(".button");
const modalButton = document.querySelector(".modal__button");
const submitButton = document.getElementById("submitBtn");

checkboxes.forEach(element => {
    element.addEventListener("change", () => {
        var value = element.getAttribute("id");
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
            singleBallText = singleBallText.replace(/\+$/, "");
            enableCheckbox(value)
        }
    })
});

modalButton.addEventListener("click", function () {
    window.location.reload();
})

submitButton.addEventListener("click", function () {
    if (singleBallText) {
        scoreManipulation(teamPlaying, singleBallText);
        wicketManipulation(teamPlaying, singleBallText);
        overManipulation(teamPlaying, singleBallText);
        lastBallManipulation(teamPlaying, singleBallText)
        if (teamPlaying == 1) {
            bodyColorManipulation(1)
            if (detailObj["1"]["over"] === totalOver || detailObj["1"]["wicket"] === totalWicket) {
                teamPlaying = 2;
                targetScore = detailObj["1"]["score"] + 1;
                bodyColorManipulation(2);
                targetText.innerText = `Need ${targetScore - detailObj[2].score} runs in ${detailObj[2].balls} balls`;
            }
        } else if (teamPlaying == 2) {
            if (detailObj["2"]["score"] >= targetScore) {
                teamPlaying = 3
                modalSection.style.display = "flex";
                modalText.innerText = `Team 2 won by ${totalWicket - detailObj["2"]["wicket"]} wickets`
            } else if (detailObj["2"]["over"] === totalOver || detailObj["2"]["wicket"] === totalWicket) {
                teamPlaying = 3
                if (detailObj["2"]["score"] < targetScore) {
                    modalSection.style.display = "flex";
                    modalText.innerText = `Team 1 won by ${targetScore - detailObj["2"]["score"] - 1} runs`
                } else if (detailObj["2"]["score"] === targetScore) {
                    modalSection.style.display = "flex";
                    modalText.innerText = "Tie"
                }
            }
            targetText.innerText = `Need ${targetScore - detailObj[2].score} runs in ${detailObj[2].balls} balls`;
        }
        checkboxManipulation();
        singleBallText = "";
        enableCheckbox();
    }
})