//This is the DB

//State



var gameState = {
    userPokemon: '',
    rivalPokemon: '',
    pokemonDB: [
        {
            name: 'charmander',
            type: 'fire',
            hp: 39,
            attack: 52,
            defense: 43,
            level: 1,
            img: 'http://www.smogon.com/dex/media/sprites/xy/charmander.gif'
        },
        {
            name: 'bulbasaur',
            type: 'plant',
            hp: 45,
            attack: 49,
            defense: 49,
            level: 1,
            img: 'http://www.smogon.com/dex/media/sprites/xy/bulbasaur.gif'
        },
        {
            name: 'squirtle',
            type: 'water',
            hp: 44,
            attack: 48,
            defense: 65,
            level: 1,
            img: 'http://www.smogon.com/dex/media/sprites/xy/squirtle.gif'
        },
    ],
    elements: {
        pokemonsEl: document.querySelector('.select-screen').querySelectorAll('.character'),
        battleScreenEl: document.getElementById('battle-screen'),
        attackBtnsEl: document.getElementById('battle-screen').querySelectorAll('.attack')
    },
      init: function() {
          //Elements

          console.log(gameState.elements.attackBtnsEl);


          //Initial Loop
          var i = 0;
          while (i < gameState.elements.pokemonsEl.length) {
              //Add function to all characters on screen select
              gameState.elements.pokemonsEl[i].onclick = function () {
                  //current selected Pokemon's name
                  var pokemonName = this.dataset.pokemon
                  //Elements for images on battle screen
                  var player1Img = document.querySelector('.player1').getElementsByTagName('img')
                  var player2Img = document.querySelector('.player2').getElementsByTagName('img')
                  //We save the current Pokemon
                  gameState.userPokemon = pokemonName
                  //CPU picks a Pokemon
                  gameState.cpuPick()
                  gameState.elements.battleScreenEl.classList.toggle('active')

                  //Select data from current user Pokemon
                  gameState.currentPokemon = gameState.pokemonDB.filter(function (pokemon) {
                      return pokemon.name == gameState.userPokemon
                  })
                  player1Img[0].src = gameState.currentPokemon[0].img
                  //Select data from current CPU Pokemon
                  gameState.currentRivalPokemon = gameState.pokemonDB.filter(function (pokemon) {
                      return pokemon.name == gameState.rivalPokemon
                  })

                  player2Img[0].src = gameState.currentRivalPokemon[0].img

                  //Current user and CPU Pokemon initial health
                  gameState.currentPokemon[0].health = gameState.calculateInitialHealth(gameState.currentPokemon);

                  gameState.currentPokemon[0].originalHealth = gameState.calculateInitialHealth(gameState.currentPokemon);

                  gameState.currentRivalPokemon[0].health = gameState.calculateInitialHealth(gameState.currentRivalPokemon);

                  gameState.currentRivalPokemon[0].originalHealth = gameState.calculateInitialHealth(gameState.currentRivalPokemon);

                  console.log(gameState);

              };
              i++;
          };

          var a = 0
          while (a < gameState.elements.attackBtnsEl.length) {
              gameState.elements.attackBtnsEl[a].onclick = function () {
                  var attackName = this.dataset.attack
                  gameState.currentUserAttack = attackName

                  gameState.play(attackName, gameState.cpuAttack())
              }
              a++
            }
      },
    cpuAttack: function() {
        var attacks = ['rock', 'paper', 'scissors']

        return attacks[gameState.randomNumber(0, 3)]
    },

calculateInitialHealth: function (user) {
        return ((0.20 * Math.sqrt(user[0].level)) * user[0].defense) * user[0].hp
    },

attackMove: function (attack, level, stack, critical, enemy, attacker) {
        console.log(enemy.name + ' before: ' + enemy.health);
        var attackAmount = ((attack * level) * (stack + critical));
        enemy.health = enemy.health - attackAmount;

    var userHP = document.querySelector('.player1').querySelector('.stats').querySelector('.health').querySelector('.health-bar').querySelector('.inside')

    var cpuHP = document.querySelector('.player2').querySelector('.stats').querySelector('.health').querySelector('.health-bar').querySelector('.inside')
        if(enemy.owner == 'user') {
         var minusPercent = ((enemy.health * 100) / enemy.originalHealth)
         console.log(userHP)
         userHP.style.width = ((minusPercent < 0) ? 0 : minusPercent) + '%'  
        } else {
            var minusPercent = ((enemy.health * 100) / enemy.originalHealth)
            console.log(userHP)
            cpuHP.style.width = ((minusPercent < 0) ? 0 : minusPercent) + '%' 

        }
        gameState.checkWinner(enemy, attacker);
        console.log(enemy.name + ' after: ' + enemy.health);

    },

checkWinner: function (enemy, attacker) {
        if (enemy.health <= 0) {
            console.log('HEY WINNERRRRRRRRR ' + attacker.name)
        }
    },



randomNumber: function (min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    },

cpuPick: function () {
    do {
        gameState.rivalPokemon = gameState.elements.pokemonsEl[gameState.randomNumber(0, 3)].dataset.pokemon
        console.log('looping' + gameState.rivalPokemon)
    }
    while (gameState.userPokemon == gameState.rivalPokemon)
    },


    play: function (userAttack, cpuAttack) {
        var currentPokemon = gameState.currentPokemon[0];
        var currentRivalPokemon = gameState.currentRivalPokemon[0];
        currentPokemon.owner = 'user'
        currentRivalPokemon.owner = 'cpu'
        switch (userAttack) {
            case 'rock':
                if (cpuAttack == 'paper') {
                    if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
                        gameState.attackMove(currentPokemon.attack, currentPokemon.level, .8, .5, currentRivalPokemon, currentPokemon)
                        if (currentRivalPokemon.health >= 1) {
                            gameState.attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, .8, 2, currentPokemon, currentRivalPokemon)
                        }
                    }
                }
                if (cpuAttack == 'scissors') {
                    if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
                        gameState.attackMove(currentPokemon.attack, currentPokemon.level, .8, 2, currentRivalPokemon, currentPokemon)
                        if (currentRivalPokemon.health >= 1) {
                            gameState.attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, .8, .5, currentPokemon, currentRivalPokemon)
                        }
                    }
                }
                if (cpuAttack == 'rock') {
                    if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
                        gameState.attackMove(currentPokemon.attack, currentPokemon.level, .8, .1, currentRivalPokemon, currentPokemon)
                        if (currentRivalPokemon.health >= 1) {
                            gameState.attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, .8, 1, currentPokemon, currentRivalPokemon)
                        }
                    }
                }

                break;
            case 'paper':
                if (cpuAttack == 'paper') {
                    if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
                        gameState.attackMove(currentPokemon.attack, currentPokemon.level, .8, 1, currentRivalPokemon, currentPokemon)
                        if (currentRivalPokemon.health >= 1) {
                            gameState.attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, .8, 1, currentPokemon, currentRivalPokemon)
                        }
                    }
                }
                if (cpuAttack == 'scissors') {
                    if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
                        gameState.attackMove(currentPokemon.attack, currentPokemon.level, .8, .5, currentRivalPokemon, currentPokemon)
                        if (currentRivalPokemon.health >= 1) {
                            gameState.attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, .8, 2, currentPokemon, currentRivalPokemon)
                        }
                    }
                }
                if (cpuAttack == 'rock') {
                    if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
                        gameState.attackMove(currentPokemon.attack, currentPokemon.level, .8, 2, currentRivalPokemon, currentPokemon)
                        if (currentRivalPokemon.health >= 1) {
                            gameState.attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, .8, .5, currentPokemon, currentRivalPokemon)
                        }
                    }
                }
                break;
            case 'scissors':
                if (cpuAttack == 'paper') {
                    if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
                        gameState.attackMove(currentPokemon.attack, currentPokemon.level, .8, 2, currentRivalPokemon, currentPokemon)
                        if (currentRivalPokemon.health >= 1) {
                            gameState.attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, .8, .5, currentPokemon, currentRivalPokemon)
                        }
                    }
                }
                if (cpuAttack == 'scissors') {
                    if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
                        gameState.attackMove(currentPokemon.attack, currentPokemon.level, .8, 1, currentRivalPokemon, currentPokemon)
                        if (currentRivalPokemon.health >= 1) {
                            gameState.attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, .8, 1, currentPokemon, currentRivalPokemon)
                        }
                    }
                }
                if (cpuAttack == 'rock') {
                    if (currentPokemon.health >= 1 && currentRivalPokemon.health >= 1) {
                        gameState.attackMove(currentPokemon.attack, currentPokemon.level, .8, .5, currentRivalPokemon, currentPokemon)
                        if (currentRivalPokemon.health >= 1) {
                            gameState.attackMove(currentRivalPokemon.attack, currentRivalPokemon.level, .8, 2, currentPokemon, currentRivalPokemon);
                    }
                }
            }
            break;
        }
    }

};
gameState.init()



























// var attack = 20;
// var level = 10;
// var stack = 1.3;
// var defense = 39;

// // create a formula for attacks
// console.log((attack * level) * stack / 7)



// // create a formula for health
// //HP = 0.20 x Sqrt(Pokemon_level) x (HP_base_stat)
// console.log(((0.20 * Math.sqrt(level)) * defense) * 15)




// // let user choose 1 and then assign a random pokemon to battle thats not the users pokemon
// // p1 vs p2




// // when one user loses all his health declare a winner

