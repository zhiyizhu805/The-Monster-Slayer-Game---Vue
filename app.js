function getRandomNumber(min, max){
    return Math.floor(Math.random() * (max - min)) + min;
}

Vue.createApp({
    data(){
        return{
            playerHealth: 100,
            monsterHealth: 100,
            counter: 0,
            winner: null,
            logMessages: []
        }
    },

    computed:{
      monsterBarStyles(){
        if (this.monsterHealth < 0){
            return {width: '0%'}
        }
            return {width: this.monsterHealth + '%'}
      },
        playerBarStyles(){
            if (this.playerHealth < 0){
                return {width: '0%'}
            }
                return {width: this.playerHealth + '%'}
        },
        mayUseSpecialAttack(){
            return this.counter % 3 !== 0;
        }
    },
    watch:{
        playerHealth(value){
            if(value <= 0 && this.monsterHealth <= 0){
                this.winner = 'draw'
            }else if(value <= 0){
                this.winner = 'monster'
            }
        },
        monsterHealth(value){
            if(value <= 0 && this.playerHealth <= 0){
                this.winner = 'draw'
            }else if(value <= 0){
                this.winner = 'player'
            }
        }
    
    },

    methods: {
        startGame(){
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.winner = null;
            this.counter = 0;
            this.logMessages = [];
        },
        attackMonster(){
            this.counter++;
            const attackValue = getRandomNumber(5, 12);
            this.monsterHealth -= attackValue;
            this.addLogMessage('player', 'attack', attackValue);
            this.attackPlayer();
        },
        attackPlayer(){
            const attackValue = getRandomNumber(8, 15);
            this.playerHealth -= attackValue;
            this.addLogMessage('monster', 'attack', attackValue);
        },
        specialAttack(){
            this.counter++;
            const attackValue = getRandomNumber(10, 25);
            this.monsterHealth -= attackValue;
            this.addLogMessage('player', 'attack', attackValue);
            this.attackPlayer();
        },
        heal(){
            const healValue = getRandomNumber(8,20);
            if(this.playerHealth + healValue > 100){
                this.playerHealth = 100;
            }else{
                this.playerHealth += healValue;
            }
            this.addLogMessage('player', 'heal', healValue);
            this.attackPlayer();
            this.counter++;
        },
        surrender(){
            this.winner = 'monster';
        },
        addLogMessage(who, what, value){
            this.logMessages.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value
            })
        }

    }
}).mount("#game")