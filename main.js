const prompt = require('prompt-sync')({sigint: true});
const clear = require('clear-screen');
 
const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const row = 10;
const col = 10;

class Field {
    field = [];

    constructor() {
        //this.field = field;
        this.locationX = 0;
        this.locationY = 0;

        for (let a = 0; a < col; a++){
            this.field[a] = [];
        }

        //set the probability of the holes = 0.3
        this.generateField(row, col, 0.3);
    } //end of constructor

    generateField(height, width, percentage = 0.1){
        for (let y = 0 ; y < height; y++){
            for (let x = 0; x < width; x++){

                //generate random holes
                const prob = Math.random();
                
                //add hole in the field, prob > 0.3 generate feld ; else <=0.3 generate hole
                     if(prob > percentage)
                     {
                         this.field[y][x] = fieldCharacter;
                     }else if (prob <= percentage)
                    {
                         this.field[y][x] = hole;
                     }
                  
            }//end of for loop - x- column
        }//end of for loop - y-row

        //Set the "hat" location
        //set the "location" : object
        const hatLocation = {   
            x: Math.floor(Math.random() * col),
            y: Math.floor(Math.random() * row)
        };

        //avoild hat at [0][0], if hat at [0[0] will be overwrite by pathcharacter , that round will having no hat
        while (hatLocation.x == 0 && hatLocation.y == 0) {  
            hatLocation.x = Math.floor(Math.random() * col);
            hatLocation.y = Math.floor(Math.random() * row);
        }

        this.field[hatLocation.y][hatLocation.x] = hat;

        //set character position as  [0] [0]
        this.field[0][0] = pathCharacter;

    } //end of generateField


    runGame(){
        //Implement your codes
        this.print();
        this.askQuestion();
    } //end of runGame

    print(){
        clear();
        const displayString = this.field.map(row => {
            return row.join('');
        }).join('\n');
        console.log(displayString);
    } //end of print

    askQuestion(){
        const answer = prompt("Which way? Enter U:up, D:down, L:left, R:Right").toUpperCase();
        //Implement your codes

        switch(answer){
            case "U":
            this.locationY--; //Y=Y-1 eg [1][0] to [0][0] 
            break;

            case "D":
            this.locationY++; //Y= Y+1 [0] [0] to [1][0]
            break;

            case "L":
            this.locationX--; //x = x-1 [0][1] to [0][0]
            break;

            case "R":
            this.locationX++; //x=x+1 [0][0] to [0][1]
            break;

            //if not UDLR was entered
            default:
            console.log("Please enter Valid Key: U/D/L/R");
            break;
            
        } // end of switch

        this.verification(); //call verification method 

    } // end of askQuestion

    verification(){

        //won, return true to stop the game
        if(this.field[this.locationY][this.locationX] == hat){
            console.log("Congrats, you found your hat!");
            return true;
        
        //hole,return false to stop the game
        }else if (this.field[this.locationY][this.locationX] == hole){
            console.log("Sorry, you fell down a hole!"); 
            return false;

        //out of boundaries,return false to stop the game
        }else if (this.locationY > 9 || this.locationX > 9 || this.locationY < 0 || this.locationX < 0){
            console.log("Out of bounds - Game End!");
            return false;

        //else, replaced the ░ with *, owerwrite it
        }else{
            this.field[this.locationY][this.locationX] = pathCharacter;
        }

        //call print and askquestion, repeat the process
        this.print();
        this.askQuestion();
    
    } //end of verification

} // end of Class

const myfield = new Field();
myfield.runGame();