function getRandomNumber(min, max){
    return Math.floor(Math.random() * (max - min)) + min;
}

Vue.createApp({
    data(){
        return{
            playerHealth: 100,
            monsterHealth: 100,
            counter: 0,
            winner: null
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
        },
        attackMonster(){
            const attackValue = getRandomNumber(5, 12);
            this.monsterHealth -= attackValue;
            this.attackPlayer();
            this.counter++;
        },
        attackPlayer(){
            const attackValue = getRandomNumber(8, 15);
            this.playerHealth -= attackValue;
        },
        specialAttack(){
            const attackValue = getRandomNumber(10, 25);
            this.monsterHealth -= attackValue;
            this.attackPlayer();
            this.counter++;
        },
        heal(){
            const healValue = getRandomNumber(8,20);
            if(this.playerHealth + healValue > 100){
                this.playerHealth = 100;
            }else{
                this.playerHealth += healValue;
            }
            this.attackPlayer();
            this.counter++;
        },
        surrender(){
            this.winner = 'monster';
        }

    }
}).mount("#game")