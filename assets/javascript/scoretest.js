
var charHP;
var enemyHP;
var charAttack = 10;
var enemyAttack = 5;
var attackNum = 0;
var enemiesToFight = false;

charHP = 150;
enemyHP = 140;

$("#button").click(function (e) {
    e.preventDefault();

    enemyHP -= (charAttack + (charAttack * attackNum));
    console.log(enemyHP);
    charHP -= enemyAttack;
    console.log(charHP);

    attackNum++;

    checkWin();

})

function checkWin() {

    // Add something to check if enemies remain to fight, first should be with no enemies left to fight
    if (charHP > 0 && enemyHP <= 0 && enemiesToFight === true) {
        // Announce your win of the game.
        console.log("You have defeated all enemies. You win!");

    } else if (charHP > 0 && enemyHP <= 0 && enemiesToFight === false) {
        // Announce your win, and to select a new opponent.
        console.log("You have defeated this enemy. Please select your next fight.");

    } else if (charHP <= 0 && enemyHP > 0 || charHP <= 0 && enemyHP >= 0) {
        // Announce your loss, and present the RESET button.
        console.log("You have been defeated. Nooooooooooo!");
    }

}