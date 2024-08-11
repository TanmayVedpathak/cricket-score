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
            enableCheckbox(value)
        }
    })
});

modalButton.addEventListener("click", function() {
    window.location.reload();
})

submitButton.addEventListener("click", function() {
    if (teamPlaying == 1) {
        bodyColorManipulation(1)
        scoreManipulation(1, singleBallText);
        wicketManipulation(1, singleBallText);
        insertInRecord(1, singleBallText);
        overManipulation(1, singleBallText);
        lastBallManipulation(1, singleBallText)

        if(detailObj["1"]["over"] === totalOver || detailObj["1"]["wicket"] === totalWicket) {
            teamPlaying = 2;
            targetScore = detailObj["1"]["score"] + 1;
            bodyColorManipulation(2);
            targetText.innerText = `Need ${targetScore - detailObj[2].score} runs in ${detailObj[2].balls} balls`;
        }
    } else if (teamPlaying == 2) {
        scoreManipulation(2, singleBallText);
        wicketManipulation(2, singleBallText);
        insertInRecord(2, singleBallText);
        overManipulation(2, singleBallText);
        lastBallManipulation(2, singleBallText)

        if(detailObj["2"]["score"] >= targetScore) {
            teamPlaying = 3
            modalSection.style.display = "flex";
            modalText.innerText = `Team 2 won by ${totalWicket - detailObj["2"]["wicket"]} wickets`
        } else if(detailObj["2"]["over"] === totalOver || detailObj["2"]["wicket"] === totalWicket) {
            teamPlaying = 3
            if(detailObj["2"]["score"] < detailObj["1"]["score"]) {
                modalSection.style.display = "flex";
                modalText.innerText = `Team 1 won by ${targetScore - detailObj["2"]["score"] - 1} runs`
            } else if (detailObj["2"]["score"] === detailObj["1"]["score"]) {
                modalSection.style.display = "flex";
                modalText.innerText = "Tie"
            }
        }

        targetText.innerText = `Need ${targetScore - detailObj[2].score} runs in ${detailObj[2].balls} balls`;
    }
    checkboxManipulation();
    singleBallText = "";
    enableCheckbox();
})