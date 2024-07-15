import * as domjs from 'domjs';

(function() {
    
    interface Player {
        name: string;
        setTime(bestTime: number, totalTime: number, numberOfRounds: number): void;
      }

      
    function startApp() : void  {

        domjs.document.getElementById("screen1").style.display = "block";
        domjs.document.getElementById("screen2a").style.display = "none";
        domjs.document.getElementById("screen2b").style.display = "none";
        domjs.document.getElementById("screen3").style.display = "none";

        domjs.document.getElementById("howManyPlayers").addEventListener("change", createTextInput);
    }

    startApp();

    function createTextInput(): void {

     var p:number = domjs.document.getElementById("howManyPlayers").selectedIndex;

        var numberOfPlayers: number = domjs.document.getElementById("howManyPlayers").options[p].value;

        domjs.document.getElementById("howManyPlayers").style.display = "none";

        domjs.document.getElementById("question").innerHTML = "Enter Names of Players";

        var docFrag = domjs.document.createDocumentFragment();

        var inputElement, myButton;


        for (let i = 0; i < numberOfPlayers; i = i + 1) {

            inputElement = document.createElement("INPUT");
            inputElement.setAttribute("type", "text");
            inputElement.setAttribute("class", "nameInput");
            inputElement.setAttribute("id", `PlayerName${i}`);
            inputElement.setAttribute("value", "Name of Player " + (i + 1));

            inputElement.onclick = function (){
                this.value = "";
            }

            docFrag.appendChild(inputElement);
            docFrag.appendChild(document.createElement("BR"));
            docFrag.appendChild(document.createElement("BR"));

        }

        myButton = document.createElement("INPUT");
        myButton.setAttribute("type", "button");
        myButton.setAttribute("value", "Submit Names");
        myButton.setAttribute("id", "submitNames");

        myButton.onclick = function() {
            storePlayers(numberOfPlayers);
        }   

        docFrag.appendChild(myButton);

        domjs.document.getElementById("screen1").appendChild(docFrag);

    }

    function storePlayers(numberOfPlayers:number):void {

        function Player(name:string ){
            this.name = name;
        }

        Player.prototype.setTime = function(bestTime:number, totalTime:number, numberOfRounds:number) {
            this.bestTime = bestTime;
            this.averageTime = totalTime / numberOfRounds;
        }

        var i: string | number;
         var players: Player[] = [];

        for (i = 0; i<numberOfPlayers; i++){
            players[i] = new Player(domjs.document.getElementById("playerName" + i).value);
        }

        createGame(players, 10);
    }

    function createGame(players, roundsPerPlayer) {

        domjs.document.getElementById("screen1").style.display = "none";
        
        domjs.document.getElementById("screen2a").style.display = "block";
    
        domjs.document.getElementById("screen2b").style.display = "block";
        
        showAsButton("Start Game");
        
        var timesClicked = 1, oneSet = roundsPerPlayer + 1,
        createdTime:number, reactionTime:number , totalTime = 0, bestTime = 0,
        numberOfPlayers = players.length,
        playerNumber = 0,
        status = "button";
        
        domjs.document.getElementById("answer").onclick = function () {
            switch (status) {
                case "button":
                    if (timesClicked === oneSet*numberOfPlayers + 1) {
                        displayResults(players);
                    } else {
                        totalTime = 0;
                        reactionTime = 0;
                        bestTime = 0;
                        
                        domjs.document.getElementById("besttime").innerHTML = 0;
                        domjs. document.getElementById("reactiontime").innerHTML = 0;
                        domjs.document.getElementById("averagetime").innerHTML = "-";
                        
                        removeAllShapes();
                        createdTime = createAllShapes();
                        
                        domjs.document.getElementById("answer").className = "shape";
                        
                        status = "shape";
                        
                    }
                    
                    break;
    
                case "shape":
                    reactionTime = (Date.now() - createdTime) / 1000;
                    totalTime = totalTime + reactionTime;
                    if (reactionTime < bestTime || bestTime === 0) {
                        bestTime = reactionTime;
                    }
                    
                    domjs.document.getElementById("besttime").innerHTML = bestTime;
                     domjs.document.getElementById("reactiontime").innerHTML = reactionTime;
                    
                    if (timesClicked%oneSet === 0) {
                        players[playerNumber].setTime(bestTime, totalTime, roundsPerPlayer);
                        
                        domjs.document.getElementById("averagetime").innerHTML = players[playerNumber].averageTime;
                        
                        domjs.document.getElementById("instructions").innerHTML = "End of Game";
                        playerNumber++;
                        status = "button";
                        removeAllShapes();
                        showAsButton("Click Here To Continue");
    
                    } else {
                        removeAllShapes();
                        createdTime = createAllShapes();
                    }
                    
                    break;
            }
            
            timesClicked++;        
            
        };
        
    }

    function showAsButton(message: string) {
        domjs.document.getElementById("answer").className = "instructionbutton";
        domjs.document.getElementById("answer").style.display = "block";
        domjs.document.getElementById("answer").innerHTML = message;
    }

    function removeAllShapes() {

        var i: number|string;

        for (i=1; i<=10; i++){
            domjs.document.getElementById("shape" + i).style.display = "none";
        }

        domjs.document.getElementById("answer").style.display = "none";
    }

    function createAllShapes(): number  {

        var i: string | number, createdTime, answerIndex: number, answerColor: string, width: number, height: number, top: any, left: number, shape: string, color: string, idName: string, maxWidth: number, maxHeight: number;

        maxWidth = domjs.document.getElementById("screen2b").clientWidth * 0.2;
        maxHeight = domjs.document.getElementById("screen2b").clientHeight * 0.5;

        answerIndex = Math.floor(Math.random() * 10) + 1;

        answerColor = getColor();

        for (i = 1; i <= 10; i = i + 1) { 
            if (Math.random() > 0.3 || i === (answerIndex)) {
                //draw the shape        
                shape = getShape();
                width = getShapeWidth(maxWidth);
                height = getShapeHeight(maxHeight);

                if (shape === "Circle" || shape === "Square"){
                    height = Math.min(width, height);
                    width = height;
                }

                if (i === answerIndex) {
                   
                    top = getShapeTop(answerIndex, maxHeight, height);
                    left= getShapeLeft(answerIndex, maxWidth, width);
                    drawOneShape("answer", shape, answerColor, height, width, top, left);

                    domjs.document.getElementById("instructions").innerHTML = answerColor + "<BR>" + shape;
                    domjs.document.getElementById("answer").innerHTML = "";

                    createdTime = Date.now();

                } else {
                    left = getShapeLeft(i, maxWidth, width);
                    top = getShapeTop(i, maxHeight, height);

                    do {
                        color = getColor();
                    } while (color === answerColor);

                    idName = "shape"+i;

                    drawOneShape(idName, shape, color, height, width, top,left);

                }
            }
        }

        return createdTime;

    }

    function getShape(){
        var shapes = ["Square", "Circle", "Rect", "Oval"];
        var i = Math.floor(Math.random()*4);
        return shapes[i];
    }

    function getColor(){
        var colors = ["Green", "Blue", "Red", "Orange", "Pink", "Yellow", "Purple", "Black", "Gray", "Cyan"];

        var i = Math.floor(Math.random()*10);

        return colors[i];

    }

    function getShapeWidth(maxWidth: number){

        return Math.max(20, Math.floor(Math.random() * (maxWidth + 1)));
    }

    function getShapeHeight(maxHeight: number) {
        return Math.max(20, Math.floor(Math.random() * (maxHeight + 1)));
    }

    function getShapeLeft(index: number, maxWidth: number, width: number) {
        if (index > 5)
            index = index - 5;

        return Math.floor(Math.random() * (maxWidth - width + 1)) + ((index - 1) * maxWidth);
    }

    function getShapeTop(index: number, maxHeight: number, height: number) {
        if (index <= 5)
            return Math.floor(Math.random() * (maxHeight - height + 1));
        else
            return Math.floor(Math.random() * (maxHeight - height + 1)) + maxHeight;
    }

    function drawOneShape(idName: string, shape: string, color: any, height: number | number, width: number | number, top: string, left: number) {
        if (shape === "Circle") {
            //Border radius = 0.5 * width + "px"
            domjs.document.getElementById(idName).style.borderRadius = 0.5 * width + "px";
        } else if (shape === "Oval") {
            domjs. document.getElementById(idName).style.borderRadius = 0.5 * width + "px / " + 0.5 * height + "px";
            //Border radius = 0.5 * width + "px / " + 0.5 * height + "px"
        } else {
            domjs.document.getElementById(idName).style.borderRadius = 0;
            //Border radius = 0
        }

        domjs.document.getElementById(idName).style.top = top + "px";

        domjs.document.getElementById(idName).style.left = left + "px";

        domjs.document.getElementById(idName).style.width = width + "px";

        domjs.document.getElementById(idName).style.height = height + "px"; 


        domjs.document.getElementById(idName).style.backgroundColor = color;

        domjs.document.getElementById(idName).style.display = "block";

    }

    function displayResults(players: any[]) { 
        var table, i: number, cell, tr, headercell: HTMLTableCellElement;

        domjs.document.getElementById("screen2a").style.display = "none";
        domjs.document.getElementById("screen2b").style.display = "none";

        domjs.document.getElementById("screen3").style.display = "block";

        players.sort(function(a: { averageTime: number; }, b: { averageTime: number; }){return a.averageTime - b.averageTime});

        table = document.getElementById("results");

        tr = document.createElement("TR");


        headercell = document.createElement("th");
        headercell.innerHTML = "Rank"; 
        tr.appendChild(headercell);

        headercell = document.createElement("th");
        headercell.innerHTML = "Name"; 
        tr.appendChild(headercell);

        headercell = document.createElement("th");
        headercell.innerHTML = "Best Time"; 
        tr.appendChild(headercell);

        headercell = document.createElement("th");
        headercell.innerHTML = "Average Time"; 
        tr.appendChild(headercell);

        table.appendChild(tr);

        for (i = 0; i < players.length; i = i + 1) {
            tr = document.createElement("TR");

            cell = document.createElement("td");
            cell.innerHTML = i + 1;
            tr.appendChild(cell);

            cell = document.createElement("td");
            cell.innerHTML = players[i].name;
            tr.appendChild(cell);

            cell = document.createElement("td");
            cell.innerHTML = players[i].bestTime.toFixed(3);
            tr.appendChild(cell);

            cell = document.createElement("td");
            cell.innerHTML = players[i].averageTime.toFixed(3);
            tr.appendChild(cell);

            table.appendChild(tr);
        }
    }
    
})();