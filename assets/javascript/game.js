$(document).ready(function () {
    var charaSelect = 0;
    var charHP;
    var enemyHP;
    var charAttack;
    var enemyCounter;
    var attackNum = 0;
    var enemyName;

    // Hide the reset button
    $("#playItAgain").hide();

    // On click of character card...
    function chooseYourFighter() {
        $(".characterCard").click(function () {
            // ... move clicked card to #theChosenOne div.
            $(this).detach().appendTo("#theChosenOne");
            charHP = parseInt($("#theChosenOne").children("div").attr("hp"));
            charAttack = parseInt($("#theChosenOne").children("div").attr("ap"));

            // Find all divs left in #atTheBeginning, add enemyFighters class, set background to red, and move to #beMyEnemy div.
            var remainingCharacters = $("#atTheBeginning").find("div");
            remainingCharacters.addClass("enemyFighters").css("background-color", "rgba(255, 0, 0, 0.3)").detach().appendTo("#beMyEnemy");

            charaSelect++; // Increase character selection by one increment
            // If a user has selected a character, then turn off the click event (do not select more).
            if (charaSelect >= 1) {
                $(".characterCard").off("click");
            }

            // For the enemy fighters, make new click event. On click, change background to green, move enemy card to #aFleshWound div.
            $(".enemyFighters").click(function () {
                // Look for enemy in #aFleshWound first, prevent enemy population if one is present.
                var myChild = $("#aFleshWound").children("div");
                if (myChild.attr("hp")) {
                    $("#theWord").html("<span class='inFight'>Your current battle has not ended! <br /> Please finish your fight before selecting another monster.</span>");
                    return;
                }

                $(this).removeClass("enemyFighters").addClass("activeEnemy").css("background-color", "rgba(0, 255, 0, 0.3)").detach().appendTo("#aFleshWound");
                enemyHP = parseInt($("#aFleshWound").children("div").attr("hp"));
                enemyCounter = parseInt($("#aFleshWound").children("div").attr("cap"));
                enemyName = $("#aFleshWound").find(".characterName").text();
            });
        });
    }

    $("#overNineThousand").click(function (e) {
        e.preventDefault();

        // make a variable that checks if #aFleshWound has an enemy in it. If not, then return and do nothing.
        var isEnemyThere = $("#aFleshWound").children("div");

        if (isEnemyThere.length > 0) {
            // Allow each value (enemy or char HP) to be subtracted from on click; with attackNum increasing each click, the charAttack will increase with each subsequent fight.
            enemyHP -= (charAttack + (charAttack * attackNum));
            charHP -= enemyCounter;

            // Update the visible HP on the character cards
            $("#theChosenOne").find(".healthPoints").text(charHP);
            $("#aFleshWound").find(".healthPoints").text(enemyHP);

            // Announce the damage done to both parties.
            $("#theWord").html("<span class='playerDamage'>You attacked " + enemyName + " for " + (charAttack + (charAttack * attackNum)) + " damage. </span> <br />");
            $("#theWord").append("<span class='enemyDamage'> " + enemyName + " attacked you in return for " + enemyCounter + " damage. </span> <br />");

            lookingForWin();
        } else {
            $("#theWord").html("<span class='noEnemy'>There's no monster to fight! <br /> Please select a monster to continue battle.</span>");
            return;
        }
        attackNum++;
    });

    function lookingForWin() {
        // If neither character nor enemy have zero (or less) HP left, take their current HP, subtract the enemy attack value, and then update text to page. But am not updating right now their scores, look at this and what needs to happen. Happens once! 
        var leftStanding = $("#beMyEnemy").children("div");

        if (charHP > 0 && enemyHP <= 0 && leftStanding.length <= 0) {
            // You won!
            $("#theWord").html("<span class='winner'>You have defeated all monsters! <br /> Congratulations! You've won!</span>");
            $(".activeEnemy").detach().appendTo("#graveyard").hide();
            // And display a "Restart" button that on click reloads the page.
            $("#playItAgain").show().click(function () {
                location.reload(true);
            });
        } else if (charHP > 0 && enemyHP <= 0 && leftStanding.length > 0) {
            // State in #theWord that you won, and detach the enemy characterCard. State "select another enemy".
            $("#theWord").html("<span>You have defeated " + enemyName + "! <br /> Select another monster to fight.</span>");
            $(".activeEnemy").detach().appendTo("#graveyard").hide();
        } else if (charHP <= 0 && enemyHP >= 0 || charHP <= 0 && enemyHP <= 0) {
            $("#theWord").html("<span class='defeated'>Game over, man... <br /> Game Over!</span>");
            // And display a "Restart" button that on click reloads the page.
            $("#playItAgain").show().click(function () {
                location.reload(true);
            });
        }
    };
    chooseYourFighter();
}
);