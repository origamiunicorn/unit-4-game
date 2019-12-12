# Monster Bash
Find the live website here: https://origamiunicorn.github.io/unit-4-game/

Monster Bash is a game made with JavaScript and the jQuery library for a class project. This is all part of a homework assignment for UCLA's Fullstack Web Development Coding Bootcamp (September 2019 to March 2020).

The game begins by presenting the player with a series of monster cards from television and film, and have the player select one to be their fighter. Each of these monsters has three values, of which one is visible. Those values include their Health Points (HP), their Attack Power (AP), and their Counter-Attack Power (CAP). Health Points are visible below the image of the monster on each monster's card. 

When a player selects a monster from under the "Welcome to the Monster Bask" header, their selected monster is dynamically moved below the "Your Monster" header. After selecting their monster of choice, the remaining monsters are dynamically moved below the "Monsters Available to Fight" header and given a red background.

The player is then able to select a monster to fight. (Monsters may only be fought one at a time. It is not possible to fight multiple monsters at once.) When a monster is selected, they're dynamically moved below the "Defending Monster" header and given a green background. 

Prior to selecting a monster to fight, selecting the "Attack!" button instructs users there is no monster to fight, and they should select a monster to continue battle. After selecting a monster to fight, selecting the "Attack!" button will do the following:

* Take the player's monster's HP and subtract the defending monster's CAP, returning a new reduced HP value.
* Take the defending monster's HP and subtract the player's monster's AP, returning a new reduced HP value.

Each time the player selects the "Attack!" button, the player's monster's AP increases by the value of that monster's original AP. For example, if a monster has an AP value of 5, then each time the "Attack!" button is selected, that monster's AP goes up by 5. If a monster has an AP value of 8, then each time the "Attack!" button is selected, their AP goes up by 8. Etc. 

These increases in AP are accumulative across monsters, and are key to surviving all five battles to emerge the victor.

The player's monster and the defending monster will continue to fight until one or both have a HP value that's less than or equal to 0. Then...

* If the player's monster still has HP, and there are more monsters below the "Monsters Available to Fight" header, the player will be told they have defeated the monster they were fighting, and instructed to select another monster to fight.
* If the player's monster still has HP, and there are no more monsters below the "Monsters Available to Fight" header, the player will be told they have defeated all the monsters, and congratulated on their win. They're able to select the "Begin Again" button to play the game again if they so choose.
* If the player's monster has HP less than or equal to 0, a game over is announced. The "Begin Again" button is displayed below the text display stating the game is over, allowing the player to start the game over again.

In this case, the "Begin Again" button is hidden until one of two conditions occurs. One, the player's monster has defeated all other monsthers, or two, the player's monster has been defeated by another monster. When this button is selected, the game page is refreshed and restored to its original state.

## Game Objective

The goal of the game is to strategically choose your opponents to incur the least amount of damage to your monster while inflicting the greatest amount of damage to defending monsters in the fewest number of attacks. By fighting monsters with lower CAP, a player can increase their monster's AP and withstand the multiple attacks it takes in order to defeat those earlier enemies. It is possible to win, or to lose, with any of the monsters provided as player choices at the start of the game.

## Languages Used
* CSS3
* HTML5
* JavScript

## Libraries Used
* jQuery

## Features
CSS Grid was used to lay the game out in a way to show the player's monster and defending monster on the same level. 

jQuery was used to write the game script, making use of its built in functions or expansions on vanilla JavaScript to ease the process.

Monster Images were taken from image searches, most being screencaps from their films/television series.
Unsplash provided the background image, found here: (https://unsplash.com/photos/NRQV-hBF10M)
