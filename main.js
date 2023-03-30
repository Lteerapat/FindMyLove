//make user be able to input the data
const prompt = require('prompt-sync')({ sigint: true });

const myLove = '💕'; // finish
const hole = '⚫';
const glassField = '🟩';
const myBrokenHeart = '💔'; //start
const lovePath = '🌹'; //moving the broken heart and leave rose path behind

class Field {
    constructor(field) {
        this._field = field;
        this._playerPositionX = 0;
        this._playerPositionY = 0;
        this._isPlaying = true;
    }

    static generateField() {
        const field = [];

        //take input from user
        const height = +prompt('Enter height of the field: ');
        const width = +prompt('Enter width of the field: ');
        const percentage = +prompt('Enter percentage of the hole you prefer (0-100): ');

        //create number of holes in the field
        const numHoles = Math.floor((height * width) * (percentage / 100));

        //create a field with only field character (empty)
        for (let i = 0; i < height; i++) {
            let arrRow = [];
            for (let j = 0; j < width; j++) {
                arrRow.push(glassField); //return array in 1 row 
            }
            field.push(arrRow); // return array in 2D
        }

        //create holes
        //iterate until all holes is created
        for (let i = 0; i < numHoles; i++) {

            //random the location of each hole
            let holeX = Math.floor(Math.random() * width);
            let holeY = Math.floor(Math.random() * height);

            //if the random hole location is not an empty then iterate until empty is found
            while (field[holeY][holeX] !== glassField) {
                holeX = Math.floor(Math.random() * width);
                holeY = Math.floor(Math.random() * height);
            }
            field[holeY][holeX] = hole; //that location is hole
        }

        //create myLove
        //random the location of the myLove
        let myLoveX = Math.floor(Math.random() * width);
        let myLoveY = Math.floor(Math.random() * height);

        //if the random myLove location is not an empty then iterate until empty is found
        while (field[myLoveY][myLoveX] !== glassField) {
            myLoveX = Math.floor(Math.random() * width);
            myLoveY = Math.floor(Math.random() * height);
        }
        field[myLoveY][myLoveX] = myLove; //that location is myLove

        return field;
    }

    randomStart(height, width) {
        //random the location of the myBrokenHeart character
        let startX = Math.floor(Math.random() * width);
        let startY = Math.floor(Math.random() * height);

        //if the random myBrokenHeart character location is not an empty then iterate until empty is found
        while (this._field[startY][startX] !== glassField) {
            startX = Math.floor(Math.random() * width);
            startY = Math.floor(Math.random() * height);
        }
        this._field[startY][startX] = myBrokenHeart; //that location is myBrokenHeart character

        //set the location from 0 to the new location;
        this._playerPositionX = startX;
        this._playerPositionY = startY;

    }

    printField() {

        //clear terminal every time the user input the data
        console.clear();    
        
        //convert 2D array into string 
        this._field.forEach((e) => console.log(e.join('')));
    }

    move(userDirection) {
        switch (userDirection) {
            case 'u':
                this.checkConditionUp();
                this._field[this._playerPositionY][this._playerPositionX] = lovePath; 
                this._playerPositionY -= 1;
                break;

            case 'd':
                this.checkConditionDown();
                this._field[this._playerPositionY][this._playerPositionX] = lovePath; 
                this._playerPositionY += 1;
                break;

            case 'l':
                this.checkConditionLeft();
                this._field[this._playerPositionY][this._playerPositionX] = lovePath; 
                this._playerPositionX -= 1;
                break;

            case 'r':
                this.checkConditionRight();
                this._field[this._playerPositionY][this._playerPositionX] = lovePath; 
                this._playerPositionX += 1;
                break;

            default:
                console.log('Invalid move! Please try again!');
                break;
        }

        //check if the location is in bound then reassign the location of the player current position
        //if not then do not reassign the location
        if (this._playerPositionX >= 0 && this._playerPositionY >=0 && this._playerPositionY <= this._field.length - 1 && this._playerPositionX <= this._field[0].length - 1) {
            this._field[this._playerPositionY][this._playerPositionX] = myBrokenHeart; 
            
        }
    }


    //check the user move into input direction, if the next location is out of bound or hole then game over, if the next location is myLove then the user win and game end
    checkConditionUp() {
        if (this._playerPositionY - 1 < 0) {
            console.log('You fell out of bounds! Game over!');
            this._isPlaying = false;
            return;
        } else if (this._field[this._playerPositionY - 1][this._playerPositionX] === hole) {
            console.log('You fell in a hole! Game over!');
            this._isPlaying = false;
        } else if (this._field[this._playerPositionY - 1][this._playerPositionX] === myLove) {
            console.log('Congratulations, you found your love 💖!!!');
            this._isPlaying = false;
        } 
    }

    checkConditionDown() {
        if (this._playerPositionY + 1 >= this._field.length) {
            console.log('You fell out of bounds! Game over!');
            this._isPlaying = false;
            return;
        } else if (this._field[this._playerPositionY + 1][this._playerPositionX] === hole) {
            console.log('You fell in a hole! Game over!');
            this._isPlaying = false;
        } else if (this._field[this._playerPositionY + 1][this._playerPositionX] === myLove) {
            console.log('Congratulations, you found your love 💖!!!');
            this._isPlaying = false;
        } 
    }

    checkConditionLeft() {
        if (this._playerPositionX - 1 < 0) {
            console.log('You fell out of bounds! Game over!');
            this._isPlaying = false;
            return;
        } else if (this._field[this._playerPositionY][this._playerPositionX - 1] === hole) {
            console.log('You fell in a hole! Game over!');
            this._isPlaying = false;
        } else if (this._field[this._playerPositionY][this._playerPositionX - 1] === myLove) {
            console.log('Congratulations, you found your love 💖!!!');
            this._isPlaying = false;
        } 
    }

    checkConditionRight() {
        if (this._playerPositionX + 1 >= this._field[0].length) {
            console.log('You fell out of bounds! Game over!');
            this._isPlaying = false;
            return;
        } else if (this._field[this._playerPositionY][this._playerPositionX + 1] === hole) {
            console.log('You fell in a hole! Game over!');
            this._isPlaying = false;
        } else if (this._field[this._playerPositionY][this._playerPositionX + 1] === myLove) {
            console.log('Congratulations, you found your love 💖!!!');
            this._isPlaying = false;
        } 
    }

    play() {

        this.randomStart(this._field.length, this._field[0].length);

        //if the user cant find the love yet or the game is not over yet continue the game
        while (this._isPlaying) {

            this.printField();
            const userDirection = prompt('Which way (u as Up, d as Down, l as Left, r as Right)!? ');
            this.move(userDirection.toLowerCase());
        }
    }



}

const gameMap = new Field(Field.generateField());
gameMap.play();