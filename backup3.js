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

    const regex = /[a-j][1][0]|[a-j][1-9]/i

    let ships = 5

    const carrier = ['c', 'c', 'c', 'c', 'c']
    let carrierHits = 5
    const battleship = ['b', 'b', 'b', 'b']
    let battleshipHits = 4
    const destroyer = ['d', 'd', 'd']
    let destroyerHits = 3
    const sub = ['s', 's', 's']
    let subHits = 3
    const ptboat = ['p', 'p']
    let ptboatHits = 2

    

    let strikeZones = []

    const displayInterface = () => {
        console.log(`     1       2       3       4       5       6       7       8       9       10  `)
        console.log(`         |       |       |       |       |       |       |       |       |       `)
        console.log(`A        |       |       |       |       |       |       |       |       |       `)
        console.log(`         |       |       |       |       |       |       |       |       |       `)
        console.log(`  -------------------------------------------------------------------------------`)
        console.log(`         |       |       |       |       |       |       |       |       |       `)
        console.log(`B        |       |       |       |       |       |       |       |       |       `)
        console.log(`         |       |       |       |       |       |       |       |       |       `)
        console.log(`  -------------------------------------------------------------------------------`)
        console.log(`         |       |       |       |       |       |       |       |       |       `)
        console.log(`C        |       |       |       |       |       |       |       |       |       `)
        console.log(`         |       |       |       |       |       |       |       |       |       `)
        console.log(`  -------------------------------------------------------------------------------`)
        console.log(`         |       |       |       |       |       |       |       |       |       `)
        console.log(`D        |       |       |       |       |       |       |       |       |       `)
        console.log(`         |       |       |       |       |       |       |       |       |       `)
        console.log(`  -------------------------------------------------------------------------------`)
        console.log(`         |       |       |       |       |       |       |       |       |       `)
        console.log(`E        |       |       |       |       |       |       |       |       |       `)
        console.log(`         |       |       |       |       |       |       |       |       |       `)
        console.log(`  -------------------------------------------------------------------------------`)
        console.log(`         |       |       |       |       |       |       |       |       |       `)
        console.log(`F        |       |       |       |       |       |       |       |       |       `)
        console.log(`         |       |       |       |       |       |       |       |       |       `)
        console.log(`  -------------------------------------------------------------------------------`)
        console.log(`         |       |       |       |       |       |       |       |       |       `)
        console.log(`G        |       |       |       |       |       |       |       |       |       `)
        console.log(`         |       |       |       |       |       |       |       |       |       `)
        console.log(`  -------------------------------------------------------------------------------`)
        console.log(`         |       |       |       |       |       |       |       |       |       `)
        console.log(`H        |       |       |       |       |       |       |       |       |       `)
        console.log(`         |       |       |       |       |       |       |       |       |       `)
        console.log(`  -------------------------------------------------------------------------------`)
        console.log(`         |       |       |       |       |       |       |       |       |       `)
        console.log(`I        |       |       |       |       |       |       |       |       |       `)
        console.log(`         |       |       |       |       |       |       |       |       |       `)
        console.log(`  -------------------------------------------------------------------------------`)
        console.log(`         |       |       |       |       |       |       |       |       |       `)
        console.log(`J        |       |       |       |       |       |       |       |       |       `)
        console.log(`         |       |       |       |       |       |       |       |       |       `)
        
    }

    let gameBoard = [
        [ ' ',  ' ',  ' ', ' ', ' ', ' ',  ' ',  ' ', ' ', ' '],
        [ ' ',  ' ',  ' ', ' ', ' ', ' ',  ' ',  ' ', ' ', ' '],
        [ ' ',  ' ',  ' ', ' ', ' ', ' ',  ' ',  ' ', ' ', ' '],
        [ ' ',  ' ',  ' ', ' ', ' ', ' ',  ' ',  ' ', ' ', ' '],
        [ ' ',  ' ',  ' ', ' ', ' ', ' ',  ' ',  ' ', ' ', ' '],
        [ ' ',  ' ',  ' ', ' ', ' ', ' ',  ' ',  ' ', ' ', ' '],
        [ ' ',  ' ',  ' ', ' ', ' ', ' ',  ' ',  ' ', ' ', ' '],
        [ ' ',  ' ',  ' ', ' ', ' ', ' ',  ' ',  ' ', ' ', ' '],
        [ ' ',  ' ',  ' ', ' ', ' ', ' ',  ' ',  ' ', ' ', ' '],
        [ ' ',  ' ',  ' ', ' ', ' ', ' ',  ' ',  ' ', ' ', ' '],
    ]

    // gameBoard[row][column]

    const randomNum = () => {
        return Math.floor(Math.random() * 10)
    }

    function clearIntervalX(ship, num, units, offset){
        console.log('clearIntervalX')
        let i = units
        while(i > 0){
            i -= 1
            gameBoard[num][i + offset] = ' '
        }
        placeShipsHorizontal(ship)
    }

    function clearIntervalY(ship, num, units, offset){
        console.log('clearIntervalY')
        let i = units
        while(i > 0){
            i -= 1
            gameBoard[i + offset][num] = ' '
        }
        placeShipsVertical(ship)
    }

    const placeShipsHorizontal = (ship) => {
        let num = randomNum()
        let units = 0
        let offset = Math.floor(Math.random() * 5)
        for(let i = 0; i < ship.length; i++){
            if(gameBoard[num][i + offset] === ' '){
                gameBoard[num][i + offset] = ship[i]
                units += 1
            } else {
                console.log('error');
                console.log(units, num, offset)
                clearIntervalX(ship, num, units, offset)
                break
            }
        }
    }

    const placeShipsVertical = (ship) => {
        let num = randomNum()
        let units = 0
        let offset = Math.floor(Math.random() * 5)
        for(let i = 0; i < ship.length; i++){
            if(gameBoard[i + offset][num] === ' '){
                gameBoard[i + offset][num] = ship[i]
                units += 1
            } else {
                console.log('error');
                console.log(units, num, offset)
                clearIntervalY(ship, num, units, offset)
                break
            }
        }
    }

    
    
    function placeShips(){
        let ships = [ptboat, carrier, battleship, destroyer, sub]
        ships.sort(() => Math.random() - 0.5)
        ships.map((ship, index) => {
            if(index % 2 === 0){
                placeShipsHorizontal(ship)
            } else {
                placeShipsVertical(ship)
            }
        })
    }

    placeShips()

    console.log(gameBoard)

    const shipLocations = (location) => {
        return strikeZones.push(location)
    }

    const strikeLog = (ele) => {
        return strikeZones.includes(ele)
    }

    function transformInput(input){
        const alpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
        let shipCoor = input.split('')
        if(shipCoor.length === 3){
            shipCoor = [shipCoor[0], shipCoor[1] + shipCoor[2]]
        }
        let strike = gameBoard[alpha.indexOf(shipCoor[0].toUpperCase())][parseInt(shipCoor[1] - 1)]
        console.log(alpha.indexOf(shipCoor[0].toUpperCase()), parseInt(shipCoor[1] - 1));
        return strike
    }
    
    const handleStrikes = (input) => {
        while(strikeLog(input)) {
            input = prompt(`${input} already picked. Enter a location to strike ie 'A2' `)
        }
        handleShot(input)
    }


    const handleSyntax = (input) => {
        while(!regex.test(input)) {
                input = prompt(`${input} is not valid. Enter a location to strike ie 'A2' `)
        }
       handleShot(input)
    }


    function handleShot(input){
        if(!regex.test(input)){
            handleSyntax(input)
        }
        shipLocations(input)
        let strike = transformInput(input)
        while(ships > 0){
            if(strike !== ' '){
                if(strike === 'c') {
                    carrierHits -= 1
                    console.log(`You have hit the Carrier! ${carrierHits} hits remaining`)
                    if(carrierHits === 0){
                        ships -= 1
                        console.log(`You have sunk the Carrier! ${ships} ships remaining`) 
                    }
                }
                if(strike === 'b') {
                    battleshipHits -= 1
                    console.log(`You have hit the Battleship! ${battleshipHits} hits remaining`)
                    if(battleshipHits === 0){
                        ships -= 1
                        console.log(`You have sunk the Battleship! ${ships} ships remaining`) 
                    }
                }
                if(strike === 'd') {
                    destroyerHits -= 1
                    console.log(`You have hit the Destroyer! ${destroyerHits} hits remaining`)
                    if(destroyerHits === 0){
                        ships -= 1
                        console.log(`You have sunk the Destroyer! ${ships} ships remaining`) 
                    }
                }
                if(strike === 's') {
                    subHits -= 1
                    console.log(`You have hit the Submarine! ${subHits} hits remaining`)
                    if(subHits === 0){
                        ships -= 1
                        console.log(`You have sunk the Submarine! ${ships} ships remaining`) 
                    }
                }
                if(strike === 'p') {
                    ptboatHits -= 1
                    console.log(`You have hit the Patrol Boat! ${ptboatHits} hits remaining`)
                    if(ptboatHits === 0){
                        ships -= 1
                        console.log(`You have sunk the Patrol Boat! ${ships} ships remaining`) 
                    }
                }
                input = prompt(`Enter a location to strike ie 'A2' `)
                if(!regex.test(input)){
                    handleSyntax(input)
                }
                
                if(strikeLog(input)){
                    handleStrikes(input)
                }
                if(ships === 0) {
                    replay()
                }
                shipLocations(input)
                strike = transformInput(input)
                displayInterface()
            } else if(strike === ' ') {
                input = prompt(`You have missed! Enter a location to strike ie 'A2' `) 
                if(!regex.test(input)){
                    handleSyntax(input)
                }
                shipLocations(input)
                if(strikeLog(input)){
                    handleStrikes(input)
                }
                strike = transformInput(input)
                shipLocations(strike)
                displayInterface()
            }
        }
    }

    const start = prompt('Press any key to start game: ')

    displayInterface()

    let strikeLocation = prompt(`Enter a location to strike ie 'A2' `)

    handleShot(strikeLocation)

}

init()

function replay() {
    const regex = /[yn]/i
    input = prompt(`You have destroyed all ships. Would you like to play again? Y/N `);
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
