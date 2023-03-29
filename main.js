//make user be able to input the data
const prompt = require('prompt-sync')({ sigint: true });

//create game variable
const myLove = '💕'; // finish
const hole = '⚫';
const glassField = '🟩';
const myBrokenHeart = '💔'; //start
const lovePath = '🌹'; //moving the broken heart and leave rose path behind

class Field {
	constructor(field) {
        this._field = field;
        this._playerPosition = [0,0];
        this._isPlaying = true;
	}
    
    
	static generateField() {
        const field = [];
        //take input from the user
        const height = +prompt('Enter height of the field: ');
        const width = +prompt('Enter width of the field: ');
        const percentage = +prompt('Enter percentage of the holes you prefer: ');
        
        //create number of holes in the field
        const numHoles = Math.floor((height * width) * (percentage / 100));
        
        //create only a field path (empty)
        for (let i = 0; i < height; i++) {
            let arrRow = [];
			for (let j = 0; j < width; j++) {
                arrRow.push(glassField); //make row array ['🟩','🟩','🟩']
			}
			field.push(arrRow); /* make column with row arrays (2D) [
                                                                            ['🟩','🟩','🟩'],
                                                                            ['🟩','🟩','🟩'],
                                                                            ['🟩','🟩','🟩']
                                                                        ] */
                                                                        //for loop help return line by line
		}

        //iterate until all holes is created
        for (let i = 0; i < numHoles; i++) {
            //random the location of each holes
            let holeX = Math.floor(Math.random() * width);
            let holeY = Math.floor(Math.random() * height);

            //if the random location is empty then replace with hole
            //if the random location is not an empty then iterate until empty is found
            while (field[holeY][holeX] !== glassField) {
                holeX = Math.floor(Math.random() * width);
                holeY = Math.floor(Math.random() * height);
            }
            field[holeY][holeX] = hole;
        }

        //random the location of my love
        let myLoveX = Math.floor(Math.random() * width);
        let myLoveY = Math.floor(Math.random() * height);

        //if the random location is empty then replace with myLove
        //if the random location is not an empty then iterate until empty is found
        while (field[myLoveY][myLoveX] !== glassField) {
            myLoveX = Math.floor(Math.random() * width);
            myLoveY = Math.floor(Math.random() * height);
        }
        field[myLoveY][myLoveX] = myLove;

        //never forget to return
        return field;
	}
    
    randomStart(height,width) {
         //random location of starting point (broken heart)
        let startX = Math.floor(Math.random() * width);
        let startY = Math.floor(Math.random() * height);

        //if the random location is empty then replace with starting point
        //if the random location is not an empty then iterate until empty is found
        while (this._field[startY][startX] !== glassField) {
            startX = Math.floor(Math.random() * width);
            startY = Math.floor(Math.random() * height);
        }
        this._field[startY][startX] = myBrokenHeart;
        this._playerPosition = [startY,startX];
    }

    print() {
        
        // convert 2D array to string and print the field
        this._field.forEach((e) => console.log(e.join("")));
                                                             /* '🟩🟩🟩'
                                                                '🟩🟩🟩' 
                                                                '🟩🟩🟩' */
    }

    move(userDirection) {
        
        //move the position of the player
        switch(userDirection) {
            case 'u':            
                this._field[this._playerPosition[0] -= 1][this._playerPosition[1]] = myBrokenHeart;
                break;
                
            case 'd':
                this._field[this._playerPosition[0] += 1][this._playerPosition[1]] = myBrokenHeart;              
                break;
                    
            case 'l':
                this._field[this._playerPosition[0]][this._playerPosition[1] -= 1] = myBrokenHeart;
                break;
                        
            case 'r':
                this._field[this._playerPosition[0]][this._playerPosition[1] += 1] = myBrokenHeart;
                break;
                            
            default:
                console.log('Invalid direction!, Please try again!');
                break;
        }
        
        
    }
    
    checkCondition() {
        const checkCondition = this._field[this._playerPosition[0]] && this._field[this._playerPosition[0]][this._isPlaying[1]];
    
        if (!checkCondition) {
            console.log("You fell out of bounds! Game over loser!");
            return !this._isPlaying;
        } else if (checkCondition === hole) {
            console.log("You fell in a hole! Game over loser!");
            return !this._isPlaying;
        } else if (checkCondition === myLove) {
            console.log("Congratulations, you found your love 💖!!!");
            return !this._isPlaying;
        }
    
        this._field[this._playerPosition[0]][this._playerPosition[1]] = lovePath;

    }
    
    play() {

        const height = this._field.length;
        const width = this._field[0].length;

        console.log(this._playerPosition);
        this.randomStart(height,width);
        //if the user cant find a love yet or the game is not over yet continue the game
        while(true) {

            //print game map everytime when user input the direction
            this.print();

            //take direction from the user
            const userDirection = prompt('Which way (u as Up, d as Down, l as Left, r as Right)!? ').toLowerCase();

            //when user input the direction then call the move method to move the broken heart
            this.move(userDirection);
            this.checkCondition();
        }
    }
}


const gameMap = new Field(Field.generateField());
gameMap.play();

