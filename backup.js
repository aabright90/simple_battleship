// When the application loads print the text, "Press any key to start the game."
// When the user presses the key, your code will randomly place two different ships in two separate locations on the board. Each ship is only 1 unit long (In the real game ships are 2+ in length).
// The prompt will then say, "Enter a location to strike ie 'A2' "
// The user will then enter a location. If there is a ship at that location the prompt will read, "Hit. You have sunk a battleship. 1 ship remaining."
// If there is not a ship at that location the prompt will read, "You have missed!"
// If you enter a location you have already guessed the prompt will read, "You have already picked this location. Miss!"
// When both of the battleships have been destroyed the prompt will read, "You have destroyed all battleships. Would you like to play again? Y/N"
// If "Y" is selected the game starts over. If "N" then the application ends itself.
var prompt = require('prompt-sync')();



function init() {

    const regex = /[abc][123]/i

    let ships = 2

    let strikeZones = []

    const start = prompt('Press any key to start game: ')
    
    let gameBoard = {
        A: [ '',  '',  ''],
        B: [ '',  '',  ''],
        C: [ '',  '',  ''],
    }

    const shipPlacer = () => {
        const alpha = ['A', 'B', 'C']
        const randomNumber = Math.floor(Math.random() * 3)
        const randomLetter = alpha[randomNumber]
        return gameBoard[randomLetter][randomNumber] = 'ship'
    }

    const shipPlacer2 = () => {
        const alpha = ['B', 'C', 'A']
        const randomNumber = Math.floor(Math.random() * 3)
        const randomLetter = alpha[randomNumber]
        return gameBoard[randomLetter][randomNumber] = 'ship'
    }

    const ship1 = shipPlacer()
    const ship2 = shipPlacer2()

    const shipLocations = (location) => {
        return strikeZones.push(location)
    }

    const strikeLog = (ele) => {
        return strikeZones.includes(ele)
    }

    const transFormInput = (ele) => {
        let shipCoor = ele.split('')
        let strike = gameBoard[shipCoor[0].toUpperCase()][parseInt(shipCoor[1] - 1)]
        return strike
    }

    console.log(gameBoard)

    const handleShot = (input) => {
        if(!regex.test(input)){
            handleSyntax(input)
        }
        shipLocations(input)
        let strike = transFormInput(input)
        while(ships > 0){
            if(strike === 'ship'){
                ships -= 1
                console.log(`Hit. You have sunk a battleship. ${ships} ship(s) remaining`)
                if(ships === 0) {
                    replay()
                }
                input = prompt(`Enter a location to strike ie 'A2' `)
                if(!regex.test(input)){
                    handleSyntax(input)
                }
                if(strikeLog(input)){
                    handleStrikes(input)
                }
                strike = transFormInput(input)
                displayInterface()
            } else if(strike === '') {
                input = prompt(`You have missed! Enter a location to strike ie 'A2' `) 
                if(!regex.test(input)){
                    handleSyntax(input)
                }
                if(strikeLog(input)){
                    handleStrikes(input)
                }
                strike = transFormInput(input)
                displayInterface()
            }
        }
    }

    const handleSyntax = (input) => {
        while(!regex.test(input)) {
            input = prompt(`${input} is not valid. Enter a location to strike ie 'A2' `)
        }
    handleShot(input)
    } 

    const handleStrikes = (input) => {
        while(strikeLog(input)) {
            input = prompt(`${input} already picked. Enter a location to strike ie 'A2' `)
        }
        handleShot(input)
    }

    const displayInterface = () => {
        console.log(`         |       |       `)
        console.log(`A    1   |   2   |   3   `)
        console.log(`         |       |       `)
        console.log(`  -----------------------`)
        console.log(`         |       |       `)
        console.log(`B    1   |   2   |   3   `)
        console.log(`         |       |       `)
        console.log(`  -----------------------`)
        console.log(`         |       |       `)
        console.log(`C    1   |   2   |   3   `)
        console.log(`         |       |       `)
    }

    displayInterface()

    let strikeLocation = prompt(`Enter a location to strike ie 'A2' `)

    handleShot(strikeLocation)
}

init()

function replay() {
    const regex = /[yn]/i
    input = prompt(`You have destroyed all battleships. Would you like to play again? Y/N `);
    while(!regex.test(input)){
        input = prompt("Please choose 'y' or 'n' ")
    }
    if(input === 'y' || input === 'Y') {
        init()
    } else {
        console.log(`Thanks for playing!`);
        process.exit(0)
    }  
}








 




