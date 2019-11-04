$(document).ready(function () {

    console.log("I am console log.");

    var charaSelect = 0;
    var attackNum = 0;
    var charHP;
    var enemyHP;
    var charAttack;
    var enemyCounter;
    var attackNum = 0;

    // Hide the reset button
    $("#playItAgain").hide();

    // On click of character card...
    function chooseYourFighter() {
        $(".characterCard").click(function () {
            console.log(this); // To see which DIV was selected

            // ... move clicked card to #theChosenOne div.
            $(this).detach().appendTo("#theChosenOne");
            charHP = parseInt($("#theChosenOne").children("div").attr("hp"));
            charAttack = parseInt($("#theChosenOne").children("div").attr("ap"));

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
                enemyHP = parseInt($("#aFleshWound").children("div").attr("hp"));
                enemyCounter = parseInt($("#aFleshWound").children("div").attr("cap"));

            });
        });
    }

    $("#overNineThousand").click(function (e) {
        e.preventDefault();

        // Allow each value (enemy or char HP) to be subtracted from on click; with attackNum increasing each click, the charAttack will increase with each subsequent fight.
        enemyHP -= (charAttack + (charAttack * attackNum));
        console.log(enemyHP);
        charHP -= enemyCounter;
        console.log(charHP);

        attackNum++;

        lookingForWin();

    });

    function lookingForWin() {
        // If neither character nor enemy have zero (or less) HP left, take their current HP, subtract the enemy attack value, and then update text to page. But am not updating right now their scores, look at this and what needs to happen. Happens once! 

        if (charHP > 0 && enemyHP > 0) {

            // Update the visible HP on the character cards
            $("#theChosenOne").find(".healthPoints").text(charHP);
            $("#aFleshWound").find(".healthPoints").text(enemyHP);

            // State on page what happened.
            $("#theWord").html("<span class='playerDamage'>You attacked " + $("#aFleshWound").find(".characterName").text() + " for " + (charAttack + (charAttack * attackNum)) + " damage. </span> <br />");
            $("#theWord").append("<span class='enemyDamage'> " + $("#aFleshWound").find(".characterName").text() + " attacked you back for " + enemyCounter + " damage. </span> <br />");

        } else if (enemyHP <= 0) {

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

    };

    chooseYourFighter();

}
);