const button = document.querySelectorAll(".button");

button.forEach(element => {
    element.addEventListener("click", () => {
        var value = element.getAttribute("data-run");
        if (teamPlaying == 1) {
            bodyColorManipulation(1)
            scoreManipulation(1, value);
            wicketManipulation(1, value)
            overManipulation(1, value);

            if(detailObj["1"]["over"] === totalOver || detailObj["1"]["wicket"] === totalWicket) {
                teamPlaying = 2;
                targetScore = detailObj["1"]["score"]
                bodyColorManipulation(2)
            }
        } else if (teamPlaying == 2) {
            bodyColorManipulation(3)
            scoreManipulation(2, value);
            wicketManipulation(2, value)
            overManipulation(2, value);

            if(detailObj["2"]["score"] >= targetScore) {
                console.log("player 2 won");
            }

            if(detailObj["2"]["over"] === totalOver || detailObj["2"]["wicket"] === totalWicket) {
                teamPlaying = 3
                if(detailObj["2"]["score"] < targetScore) {
                    console.log("player 2 loose");
                }
            }
        }
    })
});