let game = new Vue ({
    el: '#gameApp',
    data: {
        picked: '',
        playButton: false,
        firstName: '',
        secondName: '',
        gameStart: true,
        gamePlay: false,
        gameWinner: false,
        gameLose: false,
        gameBoard: [],
        tempElement: 'X',
        tempElementName: '',
        },
        methods: {

          //Скелет игорки
          structureMatrix: function(msg) {
            // Рандомайзер имен
            let whoIs = ['gLeb4iK', 'Мистер Салимов', 'Абизяна', 'Энекен', 'Марио', 'Бычара', 'Моргенштерн???', 'Виктор Цой', 'Graveall', 'etozhescum', 'ПаЗиТиФФ', 'Рыба', 'Лось'];
            let whoIsL = whoIs.length - 1;
            if (this.firstName.length <= 2) {
              this.firstName = whoIs[Math.floor(Math.random() * whoIsL)];
            }
            if (this.secondName.length <= 2) {
              this.secondName = whoIs[Math.floor(Math.random() * whoIsL)];
            }
            if (this.firstName == this.secondName) {
              this.secondName = whoIs[Math.floor(Math.random() * whoIsL)];
            }
            this.tempElementName = this.firstName;
            // -----------------------------------------
            for(let i = 0; i < msg; i++){
              this.gameBoard.push([]);
              for(let j = 0; j < msg; j++){
                this.gameBoard[i].push('-');
              }
            }
          },

          // Меняем значения в матрице
          cellChanger: function(coll_i, cell_i, cell) {
            cell = this.tempElement;
            this.gameBoard[coll_i][cell_i] = this.tempElement;
            if(this.tempElement == 'X'){
              this.tempElement = '0';
              this.tempElementName = this.secondName;
            }else {
              this.tempElement = 'X';
              this.tempElementName = this.firstName;
            }
            this.$forceUpdate()
          },

          // Проверка на выигрыш
          cellChecker: function(coll_i, cell_i, cell) {
            let counterY = 0;
            let counterX = 0;
            let counterXY = 0;
            let counterYX = 0;
            let looseCounter = 0;
            let j = 0;
            //Считаем количество очков слева верха вниз вправо
            for(let i = this.picked-1; i >= 0; i--){
              console.log(this.gameBoard[j][i])
              if(this.gameBoard[coll_i][cell_i] == this.gameBoard[j][i]){
                counterYX++;
              }
              j++
              if(counterYX == this.picked) {
                if(this.gameBoard[i][cell_i] == 'X'){
                  this.tempElementName = this.firstName;
                }else {
                  this.tempElementName = this.secondName;
                }
                this.gamePlay = false;
                this.gameWinner = true;
              }
            }
            //Считаем количество очков слева верха вниз вправо
            for(let i = 0; i < this.picked; i++){
              if(this.gameBoard[coll_i][cell_i] == this.gameBoard[i][i]){
                counterXY++;
              }
              if(counterXY == this.picked) {
                if(this.gameBoard[i][cell_i] == 'X'){
                  this.tempElementName = this.firstName;
                }else {
                  this.tempElementName = this.secondName;
                }
                this.gamePlay = false;
                this.gameWinner = true;
              }
            }
            // Считаем количество очков по вертикали
            for(let i = 0; i < this.picked; i++){
              if(this.gameBoard[coll_i][cell_i] == this.gameBoard[i][cell_i]){
                counterY++;
              }
              if(counterY == this.picked) {
                if(this.gameBoard[i][cell_i] == 'X'){
                  this.tempElementName = this.firstName;
                }else {
                  this.tempElementName = this.secondName;
                }
                this.gamePlay = false;
                this.gameWinner = true;
              }
            }
            // Считаем количество очков по горизонатали
            for(let i = 0; i < this.picked; i++){
              if(this.gameBoard[coll_i][cell_i] == this.gameBoard[coll_i][i]){
                counterX++;
              }
              if(counterX == this.picked) {
                if(this.gameBoard[coll_i][i] == 'X'){
                  this.tempElementName = this.firstName;
                }else {
                  this.tempElementName = this.secondName;
                }
                this.gamePlay = false;
                this.gameWinner = true;
              }
            }
            // Проверяем если все окна уже заполнены, но ничья
            for(let i = 0; i < this.picked; i++){
              for (let j = 0; j < this.picked; j++){
                if(this.gameBoard[i][j] != '-'){
                  looseCounter++;
                }
              }
              if(looseCounter == this.picked**2 && counterX < this.picked && counterY < this.picked  && counterXY < this.picked && counterYX < this.picked) {
                this.gamePlay = false;
                this.gameLose = true;
              }
            }
          },

          // Сбрасывает все настройки по-умолчанию
          deleteMatrix: function() {
            this.gameBoard = [];
            this.firstName = '';
            this.secondName = '';
            this.picked = '';
            this.playButton = false;
            this.tempElementName = '';
            this.tempElement = 'X';
          },
        },
});
