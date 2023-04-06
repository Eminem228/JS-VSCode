'use script';
//Первый Этап созданияигры
const ticTakToe = {
    gameTableElement: document.getElementById('game'),
    status: 'playing',
    phase: 'X',
    //поле
    mapValues: [
        ['','',''],
        ['','',''],
        ['','',''],
    ],

    init() {
        this.renderMap();
        this.initEventHenders();
    },

    //колонки и строчки
    renderMap() {
        for(let row = 0; row<3; row++){
            const tr = document.createElement('tr');
            this.gameTableElement.appendChild(tr);


            for(let col = 0; col < 3; col++){
                const td = document.createElement('td');
                td.dataset.row = row.toString();
                td.dataset.col =col.toString();
                tr.appendChild(td);
            }
        }
    },

    // игравой холст    
    initEventHenders(){
        this.gameTableElement.addEventListener('click',(event) => this.cellClickHandler(event)); 
    },

    cellClickHandler(event) {
        if(!this.isCorrectClick(event)) return;

        this.fillCell(event);

        if (this.hasWon()) {
            this.setStatusStopped();
            this.sayWonPhrase();
        }
        this.togglePhase();
    },

    isCorrectClick (event){
        return this.isStatusPlaing() &&
        this.isClickBuCell(event)&&
        this.isCellEmpty(event);
    },

    isStatusPlaing (event){
        return this.status === 'playing';
    },

    isClickBuCell(event) {
        return event.target.tagName === 'TD';
    },
    
    isCellEmpty(event) {
        const row = +event.target.dataset.row;
        const col = +event.target.dataset.col;

        return this.mapValues[row][col] === '';
    },
    

    
    fillCell(event) {
        const row = +event.target.dataset.row;
        const col = +event.target.dataset.col;

        this.mapValues[row][col] = this.phase;
        event.target.textContent = this.phase;

    },

    hasWon() {
        return this.isLineWon({x:0, y:0}, {x:1, y:0}, {x:2, y:0}) || 
        this.isLineWon({x:0, y:1}, {x:1, y:1}, {x:2, y:1}) ||
        this.isLineWon({x:0, y:2}, {x:1, y:2}, {x:2, y:2}) ||


        this.isLineWon({x:0, y:0}, {x:0, y:1}, {x:0, y:2}) ||
        this.isLineWon({x:1, y:0}, {x:1, y:1}, {x:1, y:2}) ||
        this.isLineWon({x:2, y:0}, {x:2, y:1}, {x:2, y:2}) ||


        this.isLineWon({x:0, y:0}, {x:1, y:1}, {x:2, y:2}) ||
        this.isLineWon({x:0, y:2}, {x:1, y:1}, {x:2, y:0})

            
    },

    isLineWon (a, b, c) {
        const value = this.mapValues[a.y][a.x] +
        this.mapValues[b.y][b.x] +
        this.mapValues[c.y][c.x];

        return value === 'XXX' || value === 'OOO';

    },

    setStatusStopped() {
        this.status = 'stopped';
    },


    sayWonPhrase(){
        const figure = this.phase === 'X' ? 'Крестики' : 'Нолик';

        alert(figure + ' won');

    },

    togglePhase () {
        this.phase = this.phase === 'X' ? 'O' : 'X';
    }

    
};


ticTakToe.init();