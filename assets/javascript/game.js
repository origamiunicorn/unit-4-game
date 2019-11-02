$(document).ready(function () {

    console.log("I am console log.");

    var charaSelect = 0;
    // var enemySelect = 0;
    var wins = 0;
    var attackNum = 0;
    var attackPower;
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
                console.log(this);
                $(this).css("background-color", "green").detach().appendTo("#aFleshWound");
            });

            // Ideally, turn off click event again. Havng trouble here as it's instead stopping this enemy click event as a whole from happening when I have "off" in use.
            // enemySelect++;
            // if (enemySelect >= 1) {
            //     $(".enemyFighters").off("click");
            // }
        });
    }

    $("#overNineThousand").click(function (e) {
        e.preventDefault();
        var charHP = parseInt($("#theChosenOne").children("div").attr("hp"));
        console.log(jQuery.type(charHP) + " " + charHP);
        var enemyHP = parseInt($("#aFleshWound").children("div").attr("hp"));
        var charAttack = parseInt($("#theChosenOne").children("div").attr("ap"));
        var charAttackIncrease = parseInt($("#theChosenOne").children("div").attr("ap"));
        var enemyCounter = parseInt($("#aFleshWound").children("div").attr("cap"));

        attackPower = charAttack;
        attackNum++
        if (attackNum > 1) {
            attackPower = attackPower + charAttackIncrease;
            return attackPower;
        }

        if (charHP > 0 && enemyHP > 0) {
            var reduceEnemy = enemyHP - attackPower;
            var reduceChara = charHP - enemyCounter;

            // Update the visible HP on the character cards
            $("#theChosenOne").find(".healthPoints").text(reduceChara);
            $("#aFleshWound").find(".healthPoints").text(reduceEnemy);

            // State on page what happened.
            $("#theWord").html("<span class='playerDamage'>You attacked " + $("#theChosenOne").find(".characterName").text() + " for " + attackPower + " damage. </span> <br />");
            $("#theWord").append("<span class='enemyDamage'> " + $("#aFleshWound").find(".characterName").text() + " attacked you back for " + enemyCounter + " damage. </span> <br />");

        } else if (enemyHP === 0) {
            alert("Enemy lost!")

            // State in #theWord that you won, and detach the enemy characterCard. Reactivate? The enemy onClick capability.

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