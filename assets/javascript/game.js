$(document).ready(function () {

    console.log("I am console log.");

    var charaSelect = 0;
    var attackNum = 0;

    $("#playItAgain").hide();

    // On click of character card...
    function chooseYourFighter() {
        $(".characterCard").click(function () {
            console.log(this); // To see which DIV was selected

            // ... move clicked card to #theChosenOne div.
            $(this).detach().appendTo("#theChosenOne");


            // Find all divs left in #atTheBeginning...
            var remainingCharacters = $("#atTheBeginning").find("div");
            // ... add enemyFighters class, set background to red, and move to #beMyEnemy div.
            remainingCharacters.addClass("enemyFighters").css("background-color", "red").detach().appendTo("#beMyEnemy");

            charaSelect++; // Increase character selection by one increment
            // If a user has selected a character, then turn off the click event (do not select more).
            if (charaSelect >= 1) {
                $(".characterCard").off("click");
            }

            // For the enemy fighters, make new click event. On click, change background to green, move enemy card to #aFleshWound div.
            $(".enemyFighters").click(function () {
                var myChild = $("#aFleshWound").children("div");
                console.log(myChild);

                if (myChild.attr("hp")) {
                    alert("Please face off with your first defender first!");
                    return;
                }

                $(this).addClass("activeEnemy").css("background-color", "green").detach().appendTo("#aFleshWound");

            });
        });
    }

    $("#overNineThousand").click(function (e) {
        e.preventDefault();

        // Turn all my values for HP, attack power, and counterattack power into numbers after pulling from the two different relevant character cards. Thought: make empty variables, then define them initially as values from document.

        var charHP = parseInt($("#theChosenOne").children("div").attr("hp"));
        var enemyHP = parseInt($("#aFleshWound").children("div").attr("hp"));
        var charAttack = parseInt($("#theChosenOne").children("div").attr("ap"));
        var charAttackIncrease = parseInt($("#theChosenOne").children("div").attr("ap"));
        var enemyCounter = parseInt($("#aFleshWound").children("div").attr("cap"));

        var newCharHP = parseInt($("#theChosenOne").find(".healthPoints").text());
        var newEnemyHP = parseInt($("#aFleshWound").find(".healthPoints").text());

        // An attempt to allow attackPower of the chosen character to be only their initial attack power, and then to increase it by that attack power after the first "fight".
        var attackPower = charAttack;
        if (attackNum >= 1) {
            attackPower = charAttack += (charAttackIncrease * attackNum);
            console.log("Combined Attack Power: " + attackPower);
        }
        attackNum++

        // If neither character nor enemy have zero (or less) HP left, take their current HP, subtrack the enemy attack value, and then update text to page. But am not updating right now their scores, look at this and what needs to happen. Happens once! 

        if (newCharHP > 0 && newEnemyHP > 0) {

            charHP = charHP -= enemyCounter;
            enemyHP = enemyHP -= attackPower;

            // Update the visible HP on the character cards
            $("#theChosenOne").find(".healthPoints").text(charHP);
            $("#aFleshWound").find(".healthPoints").text(enemyHP);

            // State on page what happened.
            $("#theWord").html("<span class='playerDamage'>You attacked " + $("#aFleshWound").find(".characterName").text() + " for " + charAttack + " damage. </span> <br />");
            $("#theWord").append("<span class='enemyDamage'> " + $("#aFleshWound").find(".characterName").text() + " attacked you back for " + enemyCounter + " damage. </span> <br />");

        } else if (newEnemyHP <= 0) {

            // State in #theWord that you won, and detach the enemy characterCard. State "select another enemy".
            // Okay, instead, make a hidden div to place all defeated enemies after defeat.

            var enemyName;
            enemyName = $("#aFleshWound").find(".characterName").text();

            $("#theWord").html("<span>You have defeated " + enemyName + ", you can select another enemy to fight.</span>")
            $(".activeEnemy").detach().appendTo("#graveyard").hide();


        } else {
            $("#theWord").html("<span>You have been defeated... GAME OVER!</span>")

            // And display a "Restart" button that on click reloads the page.
            $("#playItAgain").show().click(function () {
                location.reload(true);
            });
        }

    })

    chooseYourFighter();

}
);